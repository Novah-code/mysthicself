'use client';

import { useState, useEffect } from 'react';

interface DreamBackgroundGalleryProps {
  images?: string[];
  opacity?: number;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  noiseIntensity?: number;
}

export default function DreamBackgroundGallery({
  images = [],
  opacity = 0.15,
  animationSpeed = 'slow',
  noiseIntensity = 0.3
}: DreamBackgroundGalleryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || images.length === 0) {
    return null;
  }

  // Animation duration based on speed
  const animationDuration = {
    slow: '30s',
    medium: '20s',
    fast: '10s'
  }[animationSpeed];

  // Create a grid pattern from images
  const gridImages = [...images, ...images, ...images].slice(0, 12);

  return (
    <>
      <style jsx>{`
        @keyframes dreamFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: ${opacity};
          }
          25% {
            transform: translate(-10px, -10px) scale(1.05);
            opacity: ${opacity * 1.2};
          }
          50% {
            transform: translate(10px, 5px) scale(0.98);
            opacity: ${opacity * 0.8};
          }
          75% {
            transform: translate(-5px, 10px) scale(1.02);
            opacity: ${opacity * 1.1};
          }
        }

        @keyframes dreamFade {
          0%, 100% {
            opacity: ${opacity};
          }
          50% {
            opacity: ${opacity * 1.5};
          }
        }

        @keyframes noiseAnimation {
          0%, 100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          20% {
            transform: translate(-10%, 5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          40% {
            transform: translate(-5%, 15%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          60% {
            transform: translate(15%, 0%);
          }
          70% {
            transform: translate(0%, 10%);
          }
          80% {
            transform: translate(-15%, 0%);
          }
          90% {
            transform: translate(10%, 5%);
          }
        }

        .dream-background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .dream-background-grid {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 20px;
          opacity: ${opacity};
          filter: blur(2px);
        }

        .dream-background-item {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;
        }

        .dream-background-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: dreamFloat ${animationDuration} ease-in-out infinite;
        }

        .dream-background-item:nth-child(1) { animation-delay: 0s; }
        .dream-background-item:nth-child(2) { animation-delay: -2s; }
        .dream-background-item:nth-child(3) { animation-delay: -4s; }
        .dream-background-item:nth-child(4) { animation-delay: -6s; }
        .dream-background-item:nth-child(5) { animation-delay: -8s; }
        .dream-background-item:nth-child(6) { animation-delay: -10s; }
        .dream-background-item:nth-child(7) { animation-delay: -12s; }
        .dream-background-item:nth-child(8) { animation-delay: -14s; }
        .dream-background-item:nth-child(9) { animation-delay: -16s; }
        .dream-background-item:nth-child(10) { animation-delay: -18s; }
        .dream-background-item:nth-child(11) { animation-delay: -20s; }
        .dream-background-item:nth-child(12) { animation-delay: -22s; }

        .noise-overlay {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, ${noiseIntensity * 0.05}) 2px,
              rgba(255, 255, 255, ${noiseIntensity * 0.05}) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, ${noiseIntensity * 0.05}) 2px,
              rgba(0, 0, 0, ${noiseIntensity * 0.05}) 4px
            );
          opacity: ${noiseIntensity};
          animation: noiseAnimation 8s steps(10) infinite;
          pointer-events: none;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .dream-background-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 10px;
          }

          .dream-background-item {
            border-radius: 10px;
          }
        }
      `}</style>

      <div className="dream-background-container">
        <div className="dream-background-grid">
          {gridImages.map((image, index) => (
            <div key={`${image}-${index}`} className="dream-background-item">
              <img
                src={image}
                alt=""
                loading="lazy"
                style={{
                  animationDelay: `${-index * 2}s`,
                  animationDuration: animationDuration
                }}
              />
            </div>
          ))}
        </div>

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Gradient vignette */}
        <div className="gradient-overlay" />
      </div>
    </>
  );
}
