import { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import * as Sentry from '@sentry/react';
import { LayerData } from '../types';

interface UseImageProcessingProps {
  setLayerData: React.Dispatch<React.SetStateAction<LayerData>>;
  setCanvasDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>;
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'edit' | 'export'>>;
}

export const useImageProcessing = ({ setLayerData, setCanvasDimensions, setActiveTab }: UseImageProcessingProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    return Sentry.startSpan(
      {
        op: "image.processing",
        name: "Background Removal Process",
      },
      async (span) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Add file metadata to span
        span.setAttribute("file.size", file.size);
        span.setAttribute("file.type", file.type);
        span.setAttribute("file.name", file.name);

        setIsProcessing(true);

        try {
          const originalImage = new Image();
          
          await new Promise<void>((resolve, reject) => {
            originalImage.onload = async () => {
              try {
                // Add image dimensions to span
                span.setAttribute("image.width", originalImage.width);
                span.setAttribute("image.height", originalImage.height);
                span.setAttribute("image.aspectRatio", (originalImage.width / originalImage.height).toFixed(2));

                // Use the exact image dimensions for the canvas
                const dimensions = {
                  width: originalImage.width,
                  height: originalImage.height
                };
                setCanvasDimensions(dimensions);

                // Add canvas dimensions to span
                span.setAttribute("canvas.width", dimensions.width);
                span.setAttribute("canvas.height", dimensions.height);

                // Start background removal with nested span
                await Sentry.startSpan(
                  {
                    op: "ai.background_removal",
                    name: "AI Background Removal",
                  },
                  async (bgRemovalSpan) => {
                    const startTime = performance.now();
                    
                    try {
                      const blob = await removeBackground(file);
                      
                      const endTime = performance.now();
                      const processingTime = endTime - startTime;
                      
                      // Add performance metrics
                      bgRemovalSpan.setAttribute("processing.duration_ms", Math.round(processingTime));
                      bgRemovalSpan.setAttribute("processing.success", true);
                      bgRemovalSpan.setAttribute("output.blob_size", blob.size);
                      bgRemovalSpan.setAttribute("compression.ratio", (blob.size / file.size).toFixed(2));

                      const backgroundRemovedImage = new Image();
                      backgroundRemovedImage.onload = () => {
                        setLayerData(prev => ({
                          ...prev,
                          originalImage,
                          backgroundRemovedImage
                        }));
                        setIsProcessing(false);
                        setActiveTab('edit');
                        
                        span.setAttribute("processing.success", true);
                        span.setAttribute("processing.total_duration_ms", Math.round(performance.now() - startTime));
                        resolve();
                      };
                      
                      backgroundRemovedImage.onerror = () => {
                        bgRemovalSpan.setAttribute("processing.success", false);
                        span.setAttribute("processing.success", false);
                        reject(new Error('Failed to load background-removed image'));
                      };
                      
                      backgroundRemovedImage.src = URL.createObjectURL(blob);
                    } catch (error) {
                      bgRemovalSpan.setAttribute("processing.success", false);
                      bgRemovalSpan.setAttribute("error.message", error instanceof Error ? error.message : 'Unknown error');
                      throw error;
                    }
                  }
                );
              } catch (error) {
                reject(error);
              }
            };
            
            originalImage.onerror = () => {
              span.setAttribute("processing.success", false);
              reject(new Error('Failed to load original image'));
            };
            
            originalImage.src = URL.createObjectURL(file);
          });

        } catch (error) {
          console.error('Error processing image:', error);
          Sentry.captureException(error);
          span.setAttribute("processing.success", false);
          span.setAttribute("error.message", error instanceof Error ? error.message : 'Unknown error');
          setIsProcessing(false);
        }
      }
    );
  };

  return { isProcessing, handleImageUpload };
};