import { useRef, useEffect, useCallback } from 'react';
import { LayerData } from '../types';

interface UseCanvasProps {
  layerData: LayerData;
  canvasDimensions: { width: number; height: number };
}

export const useCanvas = ({ layerData, canvasDimensions }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyImageFilters = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const { brightness, contrast, blur } = layerData.backgroundSettings;
    
    const filters = [
      `brightness(${brightness}%)`,
      `contrast(${contrast}%)`,
      blur > 0 ? `blur(${blur}px)` : ''
    ].filter(Boolean).join(' ');
    
    ctx.filter = filters;
    ctx.drawImage(image, 0, 0, canvasDimensions.width, canvasDimensions.height);
    ctx.filter = 'none';
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Layer 1: Original image (background) with filters
    if (layerData.originalImage) {
      applyImageFilters(ctx, layerData.originalImage);
    }

    // Layer 2: Text
    if (layerData.textSettings.text) {
      ctx.save();
      
      ctx.font = `${layerData.textSettings.fontWeight} ${layerData.textSettings.fontSize}px ${layerData.textSettings.fontFamily}`;
      ctx.fillStyle = layerData.textSettings.color;
      ctx.globalAlpha = layerData.textSettings.opacity / 100;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const x = (layerData.textSettings.x / 100) * canvas.width;
      const y = (layerData.textSettings.y / 100) * canvas.height;

      ctx.translate(x, y);
      ctx.rotate((layerData.textSettings.rotation * Math.PI) / 180);
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeText(layerData.textSettings.text, 0, 0);
      ctx.fillText(layerData.textSettings.text, 0, 0);
      
      ctx.restore();
    }

    // Layer 3: Background-removed image (foreground)
    if (layerData.backgroundRemovedImage) {
      ctx.drawImage(layerData.backgroundRemovedImage, 0, 0, canvas.width, canvas.height);
    }
  }, [layerData, canvasDimensions]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasDimensions.width;
      canvas.height = canvasDimensions.height;
      drawCanvas();
    }
  }, [canvasDimensions, drawCanvas]);

  return { canvasRef, drawCanvas };
};