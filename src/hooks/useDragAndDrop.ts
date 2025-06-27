import { useState, useCallback, useRef } from 'react';

interface UseDragAndDropProps {
  onImageUpload: (file: File) => void;
}

export const useDragAndDrop = ({ onImageUpload }: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const validateFileFormat = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type.toLowerCase());
  };

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounter.current++;
    
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      // Check if any of the dragged items is a valid image file
      const hasValidImage = Array.from(e.dataTransfer.items).some(item => {
        return item.kind === 'file' && (
          item.type === 'image/jpeg' || 
          item.type === 'image/jpg' || 
          item.type === 'image/png'
        );
      });
      
      if (hasValidImage) {
        setIsDragging(true);
      }
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounter.current--;
    
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    dragCounter.current = 0;
    
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Validate file format
      if (validateFileFormat(file)) {
        onImageUpload(file);
      }
      
      e.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const setupDragAndDrop = useCallback(() => {
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return {
    isDragging,
    setupDragAndDrop
  };
};