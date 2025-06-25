import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Recorder, RecorderStatus } from 'canvas-record';
import * as Sentry from '@sentry/react';
import { LayerData } from '../types';

interface UseVideoExportProps {
  layerData: LayerData;
  canvasDimensions: { width: number; height: number };
}

export const useVideoExport = ({ layerData, canvasDimensions }: UseVideoExportProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const recordingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const recorderRef = useRef<Recorder | null>(null);

  const applyImageFilters = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const { brightness, contrast, blur, saturation } = layerData.backgroundSettings;
    
    const filters = [
      `brightness(${brightness}%)`,
      `contrast(${contrast}%)`,
      `saturate(${saturation}%)`,
      blur > 0 ? `blur(${blur}px)` : ''
    ].filter(Boolean).join(' ');
    
    ctx.filter = filters;
    ctx.drawImage(image, 0, 0, canvasDimensions.width, canvasDimensions.height);
    ctx.filter = 'none';
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, textOpacity: number, textScale: number) => {
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    // Layer 1: Original image (background) with filters
    if (layerData.originalImage) {
      applyImageFilters(ctx, layerData.originalImage);
    }

    // Layer 2: Text with animation
    if (layerData.textSettings.text) {
      ctx.save();
      
      const fontSize = layerData.textSettings.fontSize * textScale;
      ctx.font = `${layerData.textSettings.fontWeight} ${fontSize}px ${layerData.textSettings.fontFamily}`;
      ctx.fillStyle = layerData.textSettings.color;
      ctx.globalAlpha = (layerData.textSettings.opacity / 100) * textOpacity;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const x = (layerData.textSettings.x / 100) * canvasDimensions.width;
      const y = (layerData.textSettings.y / 100) * canvasDimensions.height;

      ctx.translate(x, y);
      ctx.rotate((layerData.textSettings.rotation * Math.PI) / 180);
      
      // Add text shadow
      if (layerData.textSettings.shadowBlur > 0) {
        ctx.shadowColor = layerData.textSettings.shadowColor;
        ctx.shadowBlur = layerData.textSettings.shadowBlur;
        ctx.shadowOffsetX = layerData.textSettings.shadowOffsetX;
        ctx.shadowOffsetY = layerData.textSettings.shadowOffsetY;
      }
      
      // Add text stroke
      if (layerData.textSettings.strokeWidth > 0) {
        ctx.strokeStyle = layerData.textSettings.strokeColor;
        ctx.lineWidth = layerData.textSettings.strokeWidth;
        ctx.strokeText(layerData.textSettings.text, 0, 0);
      }
      
      // Fill text
      ctx.fillText(layerData.textSettings.text, 0, 0);
      
      ctx.restore();
    }

    // Layer 3: Background-removed image (foreground) with optional drop shadow
    if (layerData.backgroundRemovedImage) {
      ctx.save();
      
      // Apply drop shadow if enabled
      if (layerData.backgroundSettings.dropShadowEnabled) {
        const shadowOpacity = layerData.backgroundSettings.dropShadowOpacity / 100;
        const shadowColor = layerData.backgroundSettings.dropShadowColor;
        
        // Convert hex color to rgba with opacity
        const hexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        ctx.shadowColor = hexToRgba(shadowColor, shadowOpacity);
        ctx.shadowBlur = layerData.backgroundSettings.dropShadowBlur;
        ctx.shadowOffsetX = layerData.backgroundSettings.dropShadowOffsetX;
        ctx.shadowOffsetY = layerData.backgroundSettings.dropShadowOffsetY;
      }
      
      ctx.drawImage(layerData.backgroundRemovedImage, 0, 0, canvasDimensions.width, canvasDimensions.height);
      ctx.restore();
    }
  };

  const downloadVideo = async () => {
    return Sentry.startSpan(
      {
        op: "export.video",
        name: "Download Animated Video",
      },
      async (span) => {
        if (!layerData.originalImage) return;

        span.setAttribute("video.duration", layerData.videoSettings.videoDuration);
        span.setAttribute("video.animation", layerData.videoSettings.animationType);
        span.setAttribute("canvas.width", canvasDimensions.width);
        span.setAttribute("canvas.height", canvasDimensions.height);

        setIsExporting(true);

        try {
          // Create a new canvas for recording
          if (!recordingCanvasRef.current) {
            recordingCanvasRef.current = document.createElement('canvas');
          }

          const recordingCanvas = recordingCanvasRef.current;
          recordingCanvas.width = canvasDimensions.width;
          recordingCanvas.height = canvasDimensions.height;
          
          const ctx = recordingCanvas.getContext('2d');
          if (!ctx) return;

          // Initialize canvas-record with proper options
          const recorder = new Recorder(ctx, {
            name: 'animated-text-video',
            encoderOptions: {
              codec: 'avc1.42E01E', // H.264 baseline profile
            },
          });

          recorderRef.current = recorder;

          const animationObj = { opacity: 1, scale: 1 };
          const { animationType, animationDuration, easing, videoDuration } = layerData.videoSettings;

          // Set initial values based on animation type
          switch (animationType) {
            case 'fade-in':
              animationObj.opacity = 0;
              break;
            case 'fade-out':
              animationObj.opacity = 1;
              break;
            case 'zoom-in':
              animationObj.scale = 0.1;
              break;
            case 'zoom-out':
              animationObj.scale = 1;
              break;
          }

          // Start recording
          await recorder.start();
          span.setAttribute("recording.started", true);

          // Animation tick function
          const tick = async () => {
            drawFrame(ctx, animationObj.opacity, animationObj.scale);

            if (recorder.status !== RecorderStatus.Recording) return;
            
            await recorder.step();

            if (recorder.status !== RecorderStatus.Stopped) {
              requestAnimationFrame(tick);
            }
          };

          // Create GSAP timeline
          const timeline = gsap.timeline({
            onUpdate: () => {
              // The actual drawing happens in the tick function
            },
            onComplete: async () => {
              // Stop recording after animation completes
              setTimeout(async () => {
                if (recorderRef.current && recorderRef.current.status === RecorderStatus.Recording) {
                  await recorderRef.current.stop();
                  span.setAttribute("recording.completed", true);
                }
                setIsExporting(false);
              }, 100);
            }
          });

          // Add animation
          const targetValues: any = {};
          switch (animationType) {
            case 'fade-in':
              targetValues.opacity = 1;
              break;
            case 'fade-out':
              targetValues.opacity = 0;
              break;
            case 'zoom-in':
              targetValues.scale = 1;
              break;
            case 'zoom-out':
              targetValues.scale = 0.1;
              break;
          }

          timeline.to(animationObj, {
            duration: animationDuration,
            ease: easing,
            ...targetValues
          });

          // Hold the final state for the remaining duration
          const remainingDuration = videoDuration - animationDuration;
          if (remainingDuration > 0) {
            timeline.to(animationObj, {
              duration: remainingDuration,
              ease: 'none'
            });
          }

          // Start the animation and recording loop
          tick();
          span.setAttribute("export.success", true);

        } catch (error) {
          Sentry.captureException(error);
          setIsExporting(false);
          span.setAttribute("export.success", false);
        }
      }
    );
  };

  return { isExporting, downloadVideo };
};