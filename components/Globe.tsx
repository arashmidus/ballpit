"use client";

import React, { useRef, useEffect } from 'react';
import { createEarthGlobe, EarthGlobeOptions } from './globe';

interface GlobeProps {
  className?: string;
  options?: Partial<EarthGlobeOptions>;
}

const Globe: React.FC<GlobeProps> = ({ className = '', options }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeHandleRef = useRef<ReturnType<typeof createEarthGlobe> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    globeHandleRef.current = createEarthGlobe(container, options);

    return () => {
      if (globeHandleRef.current) {
        globeHandleRef.current.dispose();
      }
    };
  }, [options]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default Globe;

