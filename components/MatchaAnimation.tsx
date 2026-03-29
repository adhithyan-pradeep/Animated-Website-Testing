"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 120;

type FrameCache = { [index: number]: HTMLImageElement };

export default function MatchaAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<FrameCache>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const cache: FrameCache = {};

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      cache[i] = img;
    }
    imagesRef.current = cache;

    return () => {
      imagesRef.current = {};
    };
  }, []);

  // Frame drawing math
  const drawImage = (frameIndex: number) => {
    if (!canvasRef.current || !imagesRef.current[frameIndex]) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img.complete) return;

    const canvas = canvasRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover/Contain logic based on prompt: "contain fit logic for mobile+desktop"
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Set canvas size and draw first frame when ready
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        const currentFrame = Math.floor(smoothProgress.get() * (TOTAL_FRAMES - 1));
        drawImage(currentFrame);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  // Hook into scroll to redraw
  useEffect(() => {
    if (!isReady) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(latest * (TOTAL_FRAMES - 1)));
      drawImage(frameIndex);
    });

    return () => unsubscribe();
  }, [isReady, smoothProgress]);

  // Helper for text beats overlays mapping
  const overlayOpacity = (start: number, end: number) => {
    const range = end - start;
    const fade = range * 0.1;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(
      smoothProgress,
      [start, start + fade, end - fade, end],
      [0, 1, 1, 0]
    );
  };

  const overlayY = (start: number, end: number) => {
    const range = end - start;
    const fade = range * 0.1;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(
      smoothProgress,
      [start, start + fade, end - fade, end],
      [20, 0, 0, -20]
    );
  };

  const loadPercent = Math.round((imagesLoaded / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Loading state */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white/90">
          <div className="text-sm font-medium tracking-widest mb-4">FORGING PERFECTION</div>
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Sticky Canvas Area */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-xs tracking-widest"
        >
          SCROLL TO EXPLORE
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-white/50 mt-4"
          />
        </motion.div>

        {/* Text Overlays */}
        {/* Beat A: 0-20% */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
          style={{
            opacity: overlayOpacity(0, 0.2),
            y: overlayY(0, 0.2)
          }}
        >
          <h2 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-2xl">PURE CRAFT</h2>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-lg">The perfect iced matcha, deconstructed.</p>
        </motion.div>

        {/* Beat B: 25-45% */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24"
          style={{
            opacity: overlayOpacity(0.25, 0.45),
            y: overlayY(0.25, 0.45)
          }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-lg max-w-2xl">CEREMONIAL GRADE</h2>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl">Vibrant, concentrated matcha meets creamy oat milk.</p>
        </motion.div>

        {/* Beat C: 50-70% */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-end justify-center text-right p-8 md:p-24"
          style={{
            opacity: overlayOpacity(0.5, 0.7),
            y: overlayY(0.5, 0.7)
          }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-lg max-w-2xl">DYNAMIC REFRESHMENT</h2>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl">Crisp geometric ice and micro-droplets suspended in time.</p>
        </motion.div>

        {/* Beat D: 75-95% */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-auto"
          style={{
            opacity: overlayOpacity(0.75, 0.95),
            y: overlayY(0.75, 0.95)
          }}
        >
          <h2 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-8 drop-shadow-2xl">TASTE THE FLOW</h2>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-lg mb-12">Experience the ultimate cold brew.</p>
          <button className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase font-medium rounded-full cursor-pointer pointer-events-auto">
            Order Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
