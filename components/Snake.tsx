"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface SnakeProps {
  pixelSize?: number;
  snakeColor?: string;
  foodColor?: string;
  className?: string;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const Snake: React.FC<SnakeProps> = ({
  pixelSize: initialPixelSize = 20,
  snakeColor = '#00ff41',
  foodColor = '#00ff41',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const renderLoopRef = useRef<number | undefined>(undefined);
  const lastMoveTimeRef = useRef<number>(0);
  const pixelSizeRef = useRef<number>(initialPixelSize);
  
  // Refs for game state (to avoid re-renders causing jitter)
  const snakeRef = useRef<Position[]>([]);
  const foodRef = useRef<Position | null>(null);
  const directionRef = useRef<Direction>('RIGHT');
  const nextDirectionRef = useRef<Direction>('RIGHT');
  const gameSpeedRef = useRef<number>(150);
  const gameStateRef = useRef<'playing' | 'gameOver' | 'paused'>('playing');
  const scoreRef = useRef<number>(0);
  const nextRoundPreloadedRef = useRef<boolean>(false);
  
  // State for UI updates (only when needed)
  const [gameState, setGameState] = useState<'playing' | 'gameOver' | 'paused'>('playing');
  const [score, setScore] = useState(0);
  const [, setSnake] = useState<Position[]>([]);
  const [, setFood] = useState<Position | null>(null);

  // Generate food at random position
  const generateFood = useCallback((cols: number, rows: number, snakeBody: Position[] = []): Position => {
    let newFood: Position;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
      attempts++;
      // Prevent infinite loop
      if (attempts > 1000) break;
    } while (
      snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    foodRef.current = newFood;
    return newFood;
  }, []);

  // Check collision
  const checkCollision = useCallback((head: Position, cols: number, rows: number, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      return true;
    }
    
    // Self collision
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Move snake (using refs for performance)
  const moveSnake = useCallback(() => {
    if (gameStateRef.current !== 'playing' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const currentPixelSize = pixelSizeRef.current;
    const cols = Math.floor(canvas.width / currentPixelSize);
    const rows = Math.floor(canvas.height / currentPixelSize);
    
    const currentSnake = snakeRef.current;
    const newSnake = [...currentSnake];
    const head = { ...newSnake[0] };
    
    // Update direction from ref
    const currentDir = nextDirectionRef.current;
    directionRef.current = currentDir;
    
    // Move head based on direction
    switch (currentDir) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }
    
    // Check collision
    if (checkCollision(head, cols, rows, newSnake)) {
      gameStateRef.current = 'gameOver';
      setGameState('gameOver');
      
      // Preload next round immediately
      if (!nextRoundPreloadedRef.current) {
        nextRoundPreloadedRef.current = true;
        // Inline preload logic to avoid dependency issues
        if (canvasRef.current) {
          const preloadCanvas = canvasRef.current;
          const preloadPixelSize = pixelSizeRef.current;
          const preloadCols = Math.floor(preloadCanvas.width / preloadPixelSize);
          const preloadRows = Math.floor(preloadCanvas.height / preloadPixelSize);
          
          const preloadStartX = Math.floor(preloadCols / 2);
          const preloadStartY = Math.floor(preloadRows / 2);
          
          const preloadSnake = [
            { x: preloadStartX, y: preloadStartY },
            { x: preloadStartX - 1, y: preloadStartY },
            { x: preloadStartX - 2, y: preloadStartY },
          ];
          
          snakeRef.current = preloadSnake;
          directionRef.current = 'RIGHT';
          nextDirectionRef.current = 'RIGHT';
          scoreRef.current = 0;
          gameSpeedRef.current = 150;
          gameStateRef.current = 'playing';
          lastMoveTimeRef.current = 0;
          
          generateFood(preloadCols, preloadRows, preloadSnake);
        }
      }
      return;
    }
    
    newSnake.unshift(head);
    
    // Check if food eaten
    const currentFood = foodRef.current;
    if (currentFood && head.x === currentFood.x && head.y === currentFood.y) {
      const newScore = scoreRef.current + 10;
      scoreRef.current = newScore;
      setScore(newScore);
      
      // Increase speed as score increases
      const newSpeed = Math.max(50, gameSpeedRef.current - 2);
      gameSpeedRef.current = newSpeed;
      
      generateFood(cols, rows, newSnake);
      setFood(foodRef.current);
    } else {
      // Remove tail if no food eaten
      newSnake.pop();
    }
    
    // Update refs
    snakeRef.current = newSnake;
    setSnake(newSnake);
  }, [checkCollision, generateFood]);

  // Unified game and render loop (prevents jitter)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Wait for canvas to have dimensions
    const checkAndStart = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        setTimeout(checkAndStart, 50);
        return;
      }
      
      // Cache context
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;
      ctxRef.current = ctx;
      ctx.imageSmoothingEnabled = false;
      
      const draw = () => {
        if (!ctxRef.current || canvas.width === 0 || canvas.height === 0) return;
        const ctx = ctxRef.current;
        
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const currentPixelSize = pixelSizeRef.current;
        const currentSnake = snakeRef.current;
        const currentFood = foodRef.current;
        const currentGameState = gameStateRef.current;
        const currentScore = scoreRef.current;
        
        // Draw snake
        if (currentSnake.length > 0) {
          currentSnake.forEach((segment, index) => {
            const x = segment.x * currentPixelSize;
            const y = segment.y * currentPixelSize;
            
            if (index === 0) {
              // Head with glow
              ctx.globalAlpha = 1;
              ctx.fillStyle = snakeColor;
              ctx.shadowBlur = 15;
              ctx.shadowColor = snakeColor;
              ctx.fillRect(x, y, currentPixelSize, currentPixelSize);
              ctx.shadowBlur = 0;
            } else {
              // Body with fade
              const progress = index / currentSnake.length;
              const alpha = 0.4 + (progress * 0.6);
              ctx.globalAlpha = alpha;
              ctx.fillStyle = snakeColor;
              ctx.fillRect(x, y, currentPixelSize, currentPixelSize);
            }
          });
        }
        
        // Draw food
        if (currentFood) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = foodColor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = foodColor;
          ctx.fillRect(currentFood.x * currentPixelSize, currentFood.y * currentPixelSize, currentPixelSize, currentPixelSize);
          ctx.shadowBlur = 0;
        }
        
        // Draw game over overlay
        if (currentGameState === 'gameOver') {
          ctx.globalAlpha = 0.8;
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.globalAlpha = 1;
          ctx.fillStyle = snakeColor;
          ctx.font = 'bold 48px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
          ctx.font = '24px monospace';
          ctx.fillText(`Score: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 20);
          ctx.font = '18px monospace';
          ctx.fillText('Tap/Click to restart', canvas.width / 2, canvas.height / 2 + 60);
        }
      };
      
      // Game logic loop
      const gameLoop = (currentTime: number) => {
        // Initialize lastMoveTime if not set
        if (lastMoveTimeRef.current === 0) {
          lastMoveTimeRef.current = currentTime;
        }
        
        if (gameStateRef.current === 'playing' && snakeRef.current.length > 0) {
          if (currentTime - lastMoveTimeRef.current >= gameSpeedRef.current) {
            moveSnake();
            lastMoveTimeRef.current = currentTime;
          }
        }
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      };
      
      // Render loop (always runs for smooth animation)
      const renderLoop = () => {
        draw();
        renderLoopRef.current = requestAnimationFrame(renderLoop);
      };
      
      // Start loops
      const startGameLoop = (time: number) => {
        gameLoop(time);
      };
      const startRenderLoop = () => {
        renderLoop();
      };
      gameLoopRef.current = requestAnimationFrame(startGameLoop);
      renderLoopRef.current = requestAnimationFrame(startRenderLoop);
    };
    
    checkAndStart();
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      if (renderLoopRef.current) {
        cancelAnimationFrame(renderLoopRef.current);
      }
    };
  }, [moveSnake, snakeColor, foodColor]);

  // Handle mouse/touch clicks to change direction (on entire container)
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Handle game over restart (use preloaded state)
      if (gameStateRef.current === 'gameOver') {
        // Next round is already preloaded, just activate it
        const preloadedSnake = snakeRef.current;
        const preloadedFood = foodRef.current;
        setSnake(preloadedSnake);
        setFood(preloadedFood);
        setScore(0);
        setGameState('playing');
        gameStateRef.current = 'playing';
        nextRoundPreloadedRef.current = false;
        return;
      }
      
      const currentSnake = snakeRef.current;
      if (gameStateRef.current !== 'playing' || currentSnake.length === 0) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get click/touch position
      let clientX: number;
      let clientY: number;
      
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return;
        clientX = touch.clientX;
        clientY = touch.clientY;
      }
      
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;
      
      // Get snake head position in pixels
      const head = currentSnake[0];
      const currentPixelSize = pixelSizeRef.current;
      const headPixelX = head.x * currentPixelSize + currentPixelSize / 2;
      const headPixelY = head.y * currentPixelSize + currentPixelSize / 2;
      
      // Calculate direction based on click position relative to snake head
      // Use the entire component area - any click determines direction
      const dx = clickX - headPixelX;
      const dy = clickY - headPixelY;
      
      // Determine which direction has the larger component (regardless of distance)
      let newDirection: Direction | null = null;
      const currentDirection = directionRef.current;
      
      // Use absolute comparison to determine primary direction
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal movement (left or right)
        if (dx > 0 && currentDirection !== 'LEFT') {
          newDirection = 'RIGHT';
        } else if (dx < 0 && currentDirection !== 'RIGHT') {
          newDirection = 'LEFT';
        }
      } else if (Math.abs(dy) > Math.abs(dx)) {
        // Vertical movement (up or down)
        if (dy > 0 && currentDirection !== 'UP') {
          newDirection = 'DOWN';
        } else if (dy < 0 && currentDirection !== 'DOWN') {
          newDirection = 'UP';
        }
      } else {
        // If dx and dy are equal, prioritize based on click position
        // This handles diagonal clicks
        if (dx > 0 && currentDirection !== 'LEFT') {
          newDirection = 'RIGHT';
        } else if (dx < 0 && currentDirection !== 'RIGHT') {
          newDirection = 'LEFT';
        } else if (dy > 0 && currentDirection !== 'UP') {
          newDirection = 'DOWN';
        } else if (dy < 0 && currentDirection !== 'DOWN') {
          newDirection = 'UP';
        }
      }
      
      if (newDirection) {
        nextDirectionRef.current = newDirection;
      }
    };
    
    // Mouse click on container
    container.addEventListener('click', handleClick);
    
    // Touch tap on container
    container.addEventListener('touchstart', handleClick, { passive: true });
    
    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchstart', handleClick);
    };
  }, []);

  // Initialize canvas and game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    const resize = () => {
      const rect = container.getBoundingClientRect();
      
      // Ensure we have valid dimensions
      if (rect.width === 0 || rect.height === 0) {
        // Retry after a short delay if container hasn't sized yet
        setTimeout(resize, 100);
        return;
      }
      
      // Set canvas size to match container exactly
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Set CSS size to match container
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Calculate responsive pixel size based on container
      const minDimension = Math.min(rect.width, rect.height);
      const responsivePixelSize = Math.max(15, Math.min(initialPixelSize, Math.floor(minDimension / 25)));
      pixelSizeRef.current = responsivePixelSize;
      
      // Initialize game if snake is empty
      if (snakeRef.current.length === 0) {
        // Small delay to ensure canvas is ready
        setTimeout(() => {
          if (!canvasRef.current) return;
          const canvas = canvasRef.current;
          const currentPixelSize = pixelSizeRef.current;
          const cols = Math.floor(canvas.width / currentPixelSize);
          const rows = Math.floor(canvas.height / currentPixelSize);
          
          const startX = Math.floor(cols / 2);
          const startY = Math.floor(rows / 2);
          
          const initialSnake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY },
          ];
          
          snakeRef.current = initialSnake;
          directionRef.current = 'RIGHT';
          nextDirectionRef.current = 'RIGHT';
          scoreRef.current = 0;
          gameSpeedRef.current = 150;
          gameStateRef.current = 'playing';
          lastMoveTimeRef.current = 0;
          nextRoundPreloadedRef.current = false;
          
          setSnake(initialSnake);
          setScore(0);
          setGameState('playing');
          
          const newFood = generateFood(cols, rows, initialSnake);
          setFood(newFood);
        }, 50);
      }
    };
    
    // Initial resize
    resize();
    
    // Use ResizeObserver for better container size tracking
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    resizeObserver.observe(container);
    window.addEventListener('resize', resize);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [initialPixelSize, generateFood]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${className}`} 
      style={{ minHeight: '100%', cursor: 'pointer' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ imageRendering: 'pixelated', display: 'block', touchAction: 'none', pointerEvents: 'none' }}
      />
      {gameState === 'playing' && (
        <div className="absolute top-4 left-4 text-green-500 font-mono text-lg font-bold z-10 pointer-events-none">
          Score: {score}
        </div>
      )}
    </div>
  );
};

export default Snake;
