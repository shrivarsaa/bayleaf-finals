import React, { useEffect, useRef } from 'react';
import { useLoading } from '../context/LoadingContext';
import gsap from 'gsap';
import { Utensils } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.set(logoRef.current, { scale: 0, opacity: 0 })
      .set(textRef.current, { y: 20, opacity: 0 })
      .to(logoRef.current, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        ease: "elastic.out(1, 0.3)" 
      })
      .to(textRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      }, "-=0.2");
    
    // Reduced loading time to 1.5 seconds
    const timer = setTimeout(() => {
      const openCurtain = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 500);
        }
      });
      
      openCurtain
        .to(logoRef.current, { 
          scale: 1.2, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in" 
        })
        .to(textRef.current, { 
          y: -20, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in" 
        }, "-=0.2")
        .to(curtainLeftRef.current, { 
          scaleX: 0, 
          duration: 0.8, 
          ease: "power3.inOut" 
        }, "-=0.1")
        .to(curtainRightRef.current, { 
          scaleX: 0, 
          duration: 0.8, 
          ease: "power3.inOut" 
        }, "-=0.8");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <>
      <div ref={curtainLeftRef} className="curtain curtain-left"></div>
      <div ref={curtainRightRef} className="curtain curtain-right"></div>
      <div className="curtain-content">
        <div className="text-center">
          <div 
            ref={logoRef} 
            className="loading-logo mx-auto mb-4 bg-white w-24 h-24 rounded-full flex items-center justify-center"
          >
            <Utensils size={40} className="text-spice-500" />
          </div>
          <div ref={textRef}>
            <h1 className="text-white font-display text-3xl md:text-4xl">
              Singen
            </h1>
            <p className="text-white/80 mt-2">
              A taste of South India in Germany
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;