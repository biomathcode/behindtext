import { useState, useCallback } from 'react';
import { createSticker } from '@devadri/create-sticker';
import * as Sentry from '@sentry/react';

interface UseStickerEffectProps {
  onStickerCreated?: (stickerImage: HTMLImageElement) => void;
  onError?: (error: string) => void;
}

export const useStickerEffect = ({ onStickerCreated, onError }: UseStickerEffectProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const createStickerFromImage = useCallback(async (
    sourceImage: HTMLImageElement,
    options: {
      borderWidth: number;
      borderColor: string;
      shadowBlur: number;
      shadowColor: string;
      shadowOffsetX: number;
      shadowOffsetY: number;
      shadowOpacity: number;
    }
  ) => {
    return Sentry.startSpan(
      {
        op: "sticker.creation",
        name: "Create Sticker Effect",
      },
      async (span) => {
        setIsProcessing(true);
        
        try {
          span.setAttribute("sticker.borderWidth", options.borderWidth);
          span.setAttribute("sticker.shadowBlur", options.shadowBlur);
          span.setAttribute("image.width", sourceImage.width);
          span.setAttribute("image.height", sourceImage.height);

          // Create a canvas to convert the image to the format expected by create-sticker
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Failed to get canvas context');
          }

          canvas.width = sourceImage.width;
          canvas.height = sourceImage.height;
          ctx.drawImage(sourceImage, 0, 0);

          // Convert canvas to blob
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert canvas to blob'));
              }
            }, 'image/png');
          });

          // Create sticker using the package
          const stickerBlob = await createSticker(blob, {
            borderWidth: options.borderWidth,
            borderColor: options.borderColor,
            shadowBlur: options.shadowBlur,
            shadowColor: options.shadowColor,
            shadowOffsetX: options.shadowOffsetX,
            shadowOffsetY: options.shadowOffsetY,
            shadowOpacity: options.shadowOpacity / 100, // Convert percentage to decimal
          });

          // Convert blob back to HTMLImageElement
          const stickerImage = new Image();
          stickerImage.onload = () => {
            span.setAttribute("sticker.success", true);
            span.setAttribute("sticker.outputWidth", stickerImage.width);
            span.setAttribute("sticker.outputHeight", stickerImage.height);
            
            setIsProcessing(false);
            if (onStickerCreated) {
              onStickerCreated(stickerImage);
            }
          };

          stickerImage.onerror = () => {
            span.setAttribute("sticker.success", false);
            throw new Error('Failed to load sticker image');
          };

          stickerImage.src = URL.createObjectURL(stickerBlob);

        } catch (error) {
          console.error('Error creating sticker:', error);
          Sentry.captureException(error);
          span.setAttribute("sticker.success", false);
          span.setAttribute("error.message", error instanceof Error ? error.message : 'Unknown error');
          
          setIsProcessing(false);
          if (onError) {
            onError(error instanceof Error ? error.message : 'Failed to create sticker effect');
          }
        }
      }
    );
  }, [onStickerCreated, onError]);

  return {
    isProcessing,
    createStickerFromImage
  };
};