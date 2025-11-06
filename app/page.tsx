"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Ballpit from "@/components/Ballpit";
import ScrollVelocity from "@/components/ScrollVelocity";
import Beams from "@/components/Beams";
import CircularText from "@/components/CircularText";
import MetaBalls from "@/components/MetaBalls";
import MagnetLines from "@/components/MagnetLines";
import Dither from "@/components/Dither";
import Silk from "@/components/Silk";
import Noise from "@/components/Noise";
import Threads from "@/components/Threads";
import DecryptedText from "@/components/DecryptedText";
import TextPressure from "@/components/TextPressure";
import Snake from "@/components/Snake";
import Globe from "@/components/Globe";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import ASCIIText from "@/components/ASCIIText";
import Cubes from "@/components/Cubes";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textFontSize, setTextFontSize] = useState(400);
  const [asciiFontSize, setAsciiFontSize] = useState(8);

  useEffect(() => {
    const updateFontSizes = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setTextFontSize(200);
        setAsciiFontSize(6);
      } else if (width < 1024) {
        // Tablet
        setTextFontSize(300);
        setAsciiFontSize(7);
      } else if (width < 1280) {
        // Desktop
        setTextFontSize(400);
        setAsciiFontSize(8);
      } else {
        // Large desktop
        setTextFontSize(500);
        setAsciiFontSize(10);
      }
    };

    updateFontSizes();
    window.addEventListener('resize', updateFontSizes);
    return () => window.removeEventListener('resize', updateFontSizes);
  }, []);
  const featureItems: { title: string; desc: string; image?: string; component?: React.ReactNode }[] = [
    {
      title: "Design",
      desc: "Columns expand 1 → 2 → 3 with Fibonacci gaps.",
      component: <MetaBalls enableTransparency color="#0D0D0E" cursorBallColor="#0D0D0E" />
    },
    {
      title: "Technology",
      desc: "Vertical rhythm uses 3/5/8/13 spacing steps.",
      component: <MagnetLines containerSize="120%" rows={18} columns={18} lineColor="#0D0D0E" lineWidth="0.2vmin" lineHeight="2vmin" />
    },
    { title: "Advertisement", desc: "Container and spacing CSS variables.", component: <Dither /> }
  ];

  return (
    <div className="min-h-screen font-sans">
      <section className="relative isolate min-h-[70svh] py-[var(--fib-21)] before:content-[''] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-5 before:z-[5] before:bg-[linear-gradient(to_top,rgba(0,0,0,0.35),rgba(0,0,0,0))] before:opacity-80 ">
         <div className="container-fib relative z-10 flex items-center justify-between py-[var(--fib-3)]">
           <div className="pointer-events-auto">
             <Link href="#" className="flex items-center gap-[var(--fib-2)]">
               <span className="relative block w-[128px] h-16 mb-[0.7rem]">
                 <span
                   aria-hidden
                   className="absolute inset-0 backdrop-invert [mask-image:url('/next1.svg')] [-webkit-mask-image:url('/next1.svg')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-position:left_center] [-webkit-mask-position:left_center]"
                 />
                 <span className="sr-only">Logo</span>
               </span>
             </Link>
           </div>
           
           <div className="pointer-events-auto">
             <Button variant="secondary" asChild className="font-mono font-light rounded-none text-xl">
               <Link href="#contact">Contact</Link>
             </Button>
           </div>
         </div>
        <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden>
          <Ballpit
            className="w-full h-full"
            followCursor={false}
            count={18}
            gravity={0.01}
            friction={0.9974}
            colors={[0, 0, 0]}
            
            wallbounce={2}
          />
        </div>
        {/* Center masked ballpit logo with backdrop inversion */}
        <div className="pointer-events-none absolute inset-0 z-[6] grid place-items-center">
          <span className="relative block w-[360px] h-[100px] sm:w-[480px] sm:h-[134px] md:w-[640px] md:h-[180px]">
            <span
              aria-hidden
              className="absolute inset-0 backdrop-invert [mask-image:url('/ballpit.svg')] [-webkit-mask-image:url('/ballpit.svg')] [mask-size:contain] [-webkit-mask-size:contain] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-position:center]"
            />
            <span className="sr-only">Ballpit</span>
          </span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-5 bg-[linear-gradient(to_right,rgba(0,0,0,0.28),rgba(0,0,0,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-5 bg-[linear-gradient(to_left,rgba(0,0,0,0.28),rgba(0,0,0,0))]" />
      </section>

      <div className="py-[var(--fib-3)] bg-amber-50">
        <ScrollVelocity
          texts={["BALLPIT IS A CREATIVE DIGITAL AGENCY · BASED IN LOS ANGELES · DOING WORK GLOBALLY ·"]}
          velocity={25}
          className="md:text-5xl text-3xl"
          scrollerClassName="text-stone-950 dark:text-white/60 font-black"
        />
        <ScrollVelocity
          texts={["we design, implement, integrate, and provide technological solutions for · businesses · non-profits · government agencies ·"]}
          velocity={-20}
          className="md:text-3xl text-2xl"
          scrollerClassName="text-stone-950 dark:text-white/60 font-medium"
          
        />
      </div>

      {/* Features 3x2 using 3-5-8 rhythm */}
      <section id="learn-more" className="w-full px-0 md:px-0 py-0">
        {/* <div className="max-w-[60ch]">
          <h2 className="text-3xl font-semibold">Built-in sections</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Compose with cards sized and spaced on a Fibonacci scale for consistent rhythm.
          </p>
        </div> */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
          {featureItems.map((item) => (
            <Card key={item.title} className="h-full rounded-none bg-amber-50">
              <CardHeader>
                <CardTitle className="text-zinc-900 xl:text-[6.3rem] lg:text-[2.5rem] text-[3rem] md:text-[8rem]">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-square rounded-none bg-amber-50 grid place-items-center overflow-hidden">
                  {item.component ? (
                    <div className="w-full h-full">{item.component}</div>
                  ) : item.image ? (
                    <Image src={item.image} alt={item.title} width={128} height={128} className="object-contain" />
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
     
      </section>

      {/* Noise texture section */}
      <section className="relative w-full overflow-hidden min-h-[50svh] bg-amber-50">
        <div className="absolute inset-0 z-0">
          <Noise patternAlpha={10} patternRefreshInterval={4} />
        </div>
        <div className="relative z-10 container-fib px-[var(--fib-3)] md:px-[var(--fib-5)] py-[var(--fib-13)] md:py-[var(--fib-21)]">
          <div className="max-w-5xl mx-auto grid place-items-center min-h-[50svh]">
            <div className="text-center">
              <DecryptedText
                text="BALLPIT IS A CREATIVE DIGITAL AGENCY"
                speed={100}
                maxIterations={15}
                sequential={true}
                revealDirection="center"
                animateOn="view"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-mono text-green-600"
                encryptedClassName="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light font-mono text-green-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Snake game section */}
    

      {/* Globe section */}
      
      {/* Stats section - Ballpit Agency */}
     

      {/* Three Rows Section */}
      <section className="w-full bg-amber-400">
        <div className="w-full">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-none">
            <div className="relative aspect-square md:aspect-auto md:col-span-1 border-b md:border-b-0 md:border-r bg-black py-8 px-8 md:py-12 md:px-12 lg:py-16 lg:px-16 flex flex-col justify-center">
              <div className="pointer-events-none absolute top-3 left-3 md:top-4 md:left-4">
                <Image src="/ballpi_logo_black.svg" alt="Ballpit mark" width={28} height={28} className="w-6 md:w-7 lg:w-8 h-auto opacity-70" />
              </div>
              <p className="text-xs md:text-sm lg:text-base text-amber-50/60 font-light tracking-wider uppercase mb-8 md:mb-10">
                Powered by Ballpit
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-amber-50 tracking-tight leading-[0.9] mb-4 md:mb-6">
                We build apps.
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-amber-50/70 font-light tracking-tight leading-relaxed mb-2 md:mb-3">
                Web apps. Mobile apps.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-amber-50/70 font-light tracking-tight leading-relaxed mb-2 md:mb-3">
                We do branding.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-amber-50/70 font-light tracking-tight leading-relaxed">
                We do design.
              </p>
            </div>
            <div className="bg-black py-0 px-0 md:col-span-2">
              <div className=" aspect-square w-full h-full relative overflow-hidden">
                <Image
                  src="/iPhone_15_Pro.png"
                  alt="iPhone 17 Pro"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-zinc-950">
           <div className="aspect-square bg-amber-50 py-0 px-0 border-b md:border-b-0 md:border-r border-zinc-950">
           <div className="w-full h-full relative overflow-hidden">
             <Image
                  src="/MacBook_Pro_16.png"
                  alt="MacBook Pro 16"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="aspect-square border-b md:border-b-0 md:border-r bg-amber-50 border-zinc-950 py-1 px-1 flex items-center justify-center">
              <Image
                src="/ballpi_logo_black.svg"
                alt="Ballpit"
                width={92}
                height={103}
                className="w-15"
              />
            </div>
            <div className="aspect-square bg-amber-50 py-0 px-0 flex items-center justify-center overflow-hidden object-cover">
            <Cubes 
    gridSize={8}
    maxAngle={60}
    radius={4}
    borderStyle="2px dashed #30AC5F"
    faceColor="#ffffff"
    rippleColor="#ff6b6b"
    rippleSpeed={1.5}
    autoAnimate={true}
    rippleOnClick={true}
  />
            </div>
          </div>

          {/* Row 3 */}
          
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="w-full bg-amber-400 z-10">
        <div className="w-full max-w-full">
        <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] xl:h-[900px] border-b bg-black border-zinc-950 relative">
            <ASCIIText
              text="Contact"
              asciiFontSize={asciiFontSize}
              textFontSize={textFontSize}
              planeBaseHeight={7}
              enableWaves={false}
            />
          </div>
          
          <form 
            className="w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const firstName = formData.get("firstName")?.toString().trim() || "";
              const lastName = formData.get("lastName")?.toString().trim() || "";
              const company = formData.get("company")?.toString().trim() || "";
              const email = formData.get("email")?.toString().trim() || "";
              const message = formData.get("message")?.toString().trim() || "";

              // Validation
              if (!firstName) {
                toast.error("First Name is required");
                return;
              }
              if (!lastName) {
                toast.error("Last Name is required");
                return;
              }
              if (!email) {
                toast.error("Email is required");
                return;
              }
              if (!email.includes("@") || !email.includes(".")) {
                toast.error("Please enter a valid email address");
                return;
              }
              if (!message) {
                toast.error("Message is required");
                return;
              }

              setIsSubmitting(true);
              try {
                // Here you would typically send to an API endpoint
                // For now, just show success
                await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
                toast.success("Inquiry sent successfully!");
                e.currentTarget.reset();
              } catch (error) {
                toast.error("Failed to send inquiry. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-2 border-b border-zinc-950">
              <div className="border-r border-zinc-950">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="h-auto py-8 px-8 text-2xl md:text-4xl lg:text-5xl font-mono text-zinc-950 bg-transparent border-0 rounded-none placeholder:text-zinc-950  focus:placeholder:text-zinc-950 focus:placeholder:opacity-100 focus-visible:ring-0 focus-visible:outline-none transition-colors"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="h-auto py-8 px-8 text-2xl md:text-4xl lg:text-5xl font-mono text-zinc-950 bg-transparent border-0 rounded-none placeholder:text-zinc-950 focus:placeholder:text-zinc-900 focus:placeholder:opacity-100 focus-visible:ring-0 focus-visible:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Company */}
            <div className="border-b border-zinc-950">
              <Input
                type="text"
                name="company"
                placeholder="Company"
                className="h-auto py-8 px-8 text-2xl md:text-4xl lg:text-5xl font-mono text-zinc-950 bg-transparent border-0 rounded-none w-full placeholder:text-zinc-950 focus:placeholder:text-zinc-900 focus:placeholder:opacity-100 focus-visible:ring-0 focus-visible:outline-none transition-colors"
              />
            </div>

            {/* Row 3: Email */}
            <div className="border-b border-zinc-950">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="h-auto py-8 px-8 text-2xl md:text-4xl lg:text-5xl font-mono text-zinc-900 bg-transparent border-0 rounded-none w-full placeholder:text-zinc-950 focus:placeholder:text-zinc-900 focus:placeholder:opacity-100 focus-visible:ring-0 focus-visible:outline-none transition-colors"
              />
            </div>

            {/* Row 4: Message */}
            <div className="border-b border-amber-500">
              <Textarea
                name="message"
                placeholder="Anything we MUST know"
                required
                className="h-auto min-h-[200px] py-8 px-8 text-3xl md:text-4xl lg:text-5xl font-mono text-zinc-900 bg-transparent border-0 rounded-none w-full resize-none placeholder:text-zinc-950 focus:placeholder:text-zinc-900 focus:placeholder:opacity-100 focus-visible:ring-0 focus-visible:outline-none transition-colors"
              />
            </div>

            {/* Row 5: Submit Button */}
            <div className="border border-zinc-950">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-auto py-8 px-8 text-3xl md:text-4xl lg:text-5xl font-mono text-zinc-950 bg-transparent hover:bg-black hover:text-amber-50 active:bg-amber-50 active:text-zinc-950 focus:bg-amber-500 focus:text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed border-0 rounded-none focus-visible:ring-0 focus-visible:outline-none shadow-none transition-all duration-200"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-zinc-950">
        <div className="w-full px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <Image 
                src="/ballpit_logo_white.svg" 
                alt="Ballpit" 
                width={92} 
                height={103} 
                className="w-16 h-auto mb-2"
              />
              <p className="text-sm md:text-base text-amber-50/60 font-mono tracking-wide">
                Creative digital agency
              </p>
              <p className="text-sm md:text-base text-amber-50/60 font-mono tracking-wide">
                Los Angeles, CA
              </p>
            </div>

            {/* Services Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base md:text-lg font-mono text-amber-50 uppercase tracking-wider mb-2">
                Services
              </h3>
              <Link href="#services" className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors">
                Web Apps
              </Link>
              <Link href="#services" className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors">
                Mobile Apps
              </Link>
              <Link href="#services" className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors">
                Branding
              </Link>
              <Link href="#services" className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors">
                Design
              </Link>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base md:text-lg font-mono text-amber-50 uppercase tracking-wider mb-2">
                Contact
              </h3>
              <a 
                href="mailto:hello@ballpit.agency" 
                className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors"
              >
                hello@ballpit.agency
              </a>
              <Link 
                href="#contact" 
                className="text-sm md:text-base text-amber-50/70 font-mono hover:text-amber-50 transition-colors"
              >
                Request a Call
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-950 pt-8 md:pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs md:text-sm text-amber-50/50 font-mono">
                © {new Date().getFullYear()} Ballpit. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-xs md:text-sm font-mono">
                <Link href="#" className="text-amber-50/50 hover:text-amber-50 transition-colors">
                  Privacy
                </Link>
                <span className="text-amber-50/30">•</span>
                <Link href="#" className="text-amber-50/50 hover:text-amber-50 transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
