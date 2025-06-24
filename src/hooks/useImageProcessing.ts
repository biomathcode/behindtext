import { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';
import { LayerData } from '../types';

interface UseImageProcessingProps {
  setLayerData: React.Dispatch<React.SetStateAction<LayerData>>;
  setCanvasDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>;
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'edit' | 'export'>>;
}

export const useImageProcessing = ({ setLayerData, setCanvasDimensions, setActiveTab }: UseImageProcessingProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateCanvasDimensions = (image: HTMLImageElement) => {
    const maxWidth = 800;
    const maxHeight = 600;
    
    let { width, height } = image;
    
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
    const scale = Math.min(widthRatio, heightRatio);
    
    if (scale < 1) {
      width *= scale;
      height *= scale;
    }
    
    return { width: Math.round(width), height: Math.round(height) };
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      const originalImage = new Image();
      originalImage.onload = async () => {
        const dimensions = calculateCanvasDimensions(originalImage);
        setCanvasDimensions(dimensions);

        const blob = await removeBackground(file);
        const backgroundRemovedImage = new Image();
        backgroundRemovedImage.onload = () => {
          setLayerData(prev => ({
            ...prev,
            originalImage,
            backgroundRemovedImage
          }));
          setIsProcessing(false);
          setActiveTab('edit');
        };
        backgroundRemovedImage.src = URL.createObjectURL(blob);
      };
      originalImage.src = URL.createObjectURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  return { isProcessing, handleImageUpload };
};