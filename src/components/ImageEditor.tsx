import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Type, Settings, Image as ImageIcon, Video, Play, Pause } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useImageProcessing } from '../hooks/useImageProcessing';
import { useVideoExport } from '../hooks/useVideoExport';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useStickerEffect } from '../hooks/useStickerEffect';
import { LayerData } from '../types';
import CanvasPreview from './CanvasPreview';
import TabNavigation from './TabNavigation';
import UploadTab from './UploadTab';
import EditTab from './EditTab';
import ExportTab from './ExportTab';
import DragDropOverlay from './DragDropOverlay';

const ImageEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'edit' | 'export'>('upload');
  const [editSubTab, setEditSubTab] = useState<'text' | 'image' | 'video'>('text');
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [animatedTextProps, setAnimatedTextProps] = useState({
    opacity: 1,
    scale: 1,
  });
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const [layerData, setLayerData] = useState<LayerData>({
    originalImage: null,
    backgroundRemovedImage: null,
    stickerImage: null,
    textSettings: {
      text: 'Add your text here',
      fontSize: 48,
      fontWeight: 700,
      fontFamily: 'Arial',
      color: '#ffffff',
      opacity: 100,
      rotation: 0,
      x: 50,
      y: 50,
      strokeWidth: 2,
      strokeColor: '#000000',
      shadowBlur: 4,
      shadowColor: '#000000',
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      textAlign: 'center',
      letterSpacing: 0,
      wordSpacing: 0,
    },
    backgroundSettings: {
      opacity: 100,
      brightness: 100,
      contrast: 100,
      blur: 0,
      saturation: 100,
      shadowEnabled: false,
      shadowBlur: 10,
      shadowColor: '#000000',
      shadowOffsetX: 15,
      shadowOffsetY: 15,
      shadowOpacity: 100,
      rotation: 0,
      scale: 1,
      dropShadowEnabled: false,
      dropShadowBlur: 10,
      dropShadowColor: '#000000',
      dropShadowOffsetX: 5,
      dropShadowOffsetY: 5,
      dropShadowOpacity: 50,
    },
    subjectSettings: {
      opacity: 100,
      brightness: 100,
      contrast: 100,
      blur: 0,
      saturation: 100,
      shadowEnabled: false,
      shadowBlur: 10,
      shadowColor: '#000000',
      shadowOffsetX: 15,
      shadowOffsetY: 15,
      shadowOpacity: 100,
      rotation: 0,
      scale: 1,
      stickerEnabled: false,
      stickerBorderWidth: 5,
      stickerBorderColor: '#ffffff',
      stickerShadowBlur: 10,
      stickerShadowColor: '#000000',
      stickerShadowOffsetX: 5,
      stickerShadowOffsetY: 5,
      stickerShadowOpacity: 50,
    },
    videoSettings: {
      animationType: 'fade-in',
      animationDuration: 2,
      easing: 'ease-out',
      videoDuration: 10,
    }
  });

  // Validate file format
  const validateFileFormat = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type.toLowerCase());
  };

  // Handle file upload from drag and drop or file input
  const handleFileUpload = (file: File) => {
    if (!validateFileFormat(file)) {
      toast.error('Invalid file format', {
        description: 'Please upload only JPEG or PNG images.',
        duration: 4000,
      });
      return;
    }

    // Show upload started toast
    toast.loading('Uploading image...', {
      id: 'upload-progress',
      description: 'Processing your image with AI background removal',
    });

    // Create a fake event object to match the expected interface
    const fakeEvent = {
      target: {
        files: [file]
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleImageUpload(fakeEvent);
  };

  // Handle file input change
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFileFormat(file)) {
      toast.error('Invalid file format', {
        description: 'Please upload only JPEG or PNG images.',
        duration: 4000,
      });
      // Clear the input
      event.target.value = '';
      return;
    }

    // Show upload started toast
    toast.loading('Uploading image...', {
      id: 'upload-progress',
      description: 'Processing your image with AI background removal',
    });

    handleImageUpload(event);
  };

  // Use custom hooks
  const { isProcessing, handleImageUpload } = useImageProcessing({
    setLayerData,
    setCanvasDimensions,
    setActiveTab,
    onSuccess: () => {
      toast.success('Image uploaded successfully!', {
        id: 'upload-progress',
        description: 'Background removed with AI. Ready to add text effects.',
        duration: 3000,
      });
    },
    onError: (error: string) => {
      toast.error('Upload failed', {
        id: 'upload-progress',
        description: error || 'Please try again with a different image.',
        duration: 4000,
      });
    },
  });

  const { isExporting, downloadVideo } = useVideoExport({
    layerData,
    canvasDimensions,
    onExportStart: () => {
      toast.loading('Generating video...', {
        id: 'export-progress',
        description: 'Creating your animated text behind image effect',
      });
    },
    onExportSuccess: () => {
      toast.success('Video exported successfully!', {
        id: 'export-progress',
        description: 'Your animated video has been downloaded.',
        duration: 3000,
      });
    },
    onExportError: (error: string) => {
      toast.error('Export failed', {
        id: 'export-progress',
        description: error || 'Please try again.',
        duration: 4000,
      });
    },
  });

  // Setup sticker effect hook
  const { isProcessing: isStickerProcessing, createStickerFromImage } = useStickerEffect({
    onStickerCreated: (stickerImage) => {
      setLayerData(prev => ({
        ...prev,
        stickerImage
      }));
      toast.success('Sticker effect applied!', {
        description: 'Your subject now has a beautiful sticker effect.',
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error('Sticker creation failed', {
        description: error || 'Please try again.',
        duration: 4000,
      });
    },
  });

  // Setup drag and drop
  const { isDragging, setupDragAndDrop } = useDragAndDrop({
    onImageUpload: handleFileUpload
  });

  useEffect(() => {
    const cleanup = setupDragAndDrop();
    return cleanup;
  }, [setupDragAndDrop]);

  const applyImageFilters = (
    ctx: CanvasRenderingContext2D, 
    image: HTMLImageElement, 
    settings: { brightness: number; contrast: number; blur: number; saturation: number; opacity: number; rotation: number; scale: number; shadowEnabled?: boolean; shadowBlur?: number; shadowColor?: string; shadowOffsetX?: number; shadowOffsetY?: number; shadowOpacity?: number }
  ) => {
    const { brightness, contrast, blur, saturation, opacity, rotation, scale, shadowEnabled, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity } = settings;
    
    ctx.save();
    
    // Apply transformations
    const centerX = canvasDimensions.width / 2;
    const centerY = canvasDimensions.height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    
    // Apply shadow if enabled
    if (shadowEnabled && shadowBlur && shadowColor && shadowOffsetX !== undefined && shadowOffsetY !== undefined && shadowOpacity !== undefined) {
      const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      
      ctx.shadowColor = hexToRgba(shadowColor, shadowOpacity / 100);
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;
    }
    
    // Apply filters and opacity
    const filters = [
      `brightness(${brightness}%)`,
      `contrast(${contrast}%)`,
      `saturate(${saturation}%)`,
      blur > 0 ? `blur(${blur}px)` : ''
    ].filter(Boolean).join(' ');
    
    ctx.filter = filters;
    ctx.globalAlpha = opacity / 100;
    ctx.drawImage(image, 0, 0, canvasDimensions.width, canvasDimensions.height);
    
    ctx.restore();
  };

  const drawMultiLineText = (
    ctx: CanvasRenderingContext2D, 
    text: string, 
    x: number, 
    y: number, 
    lineHeight: number,
    textAlign: 'left' | 'center' | 'right'
  ) => {
    // Split text by commas and clean up whitespace
    const lines = text.split(',').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) return;

    // Calculate total text height for vertical centering
    const totalHeight = (lines.length - 1) * lineHeight;
    const startY = y - totalHeight / 2;

    lines.forEach((line, index) => {
      const currentY = startY + (index * lineHeight);
      
      // Set text alignment
      let alignedX = x;
      if (textAlign === 'left') {
        ctx.textAlign = 'left';
        alignedX = x - canvasDimensions.width * 0.4; // Offset for left alignment
      } else if (textAlign === 'right') {
        ctx.textAlign = 'right';
        alignedX = x + canvasDimensions.width * 0.4; // Offset for right alignment
      } else {
        ctx.textAlign = 'center';
      }

      // Draw stroke if enabled
      if (layerData.textSettings.strokeWidth > 0) {
        ctx.strokeText(line, alignedX, currentY);
      }
      
      // Draw fill text
      ctx.fillText(line, alignedX, currentY);
    });
  };

  const drawCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Layer 1: Original image (background) with filters and transformations
    if (layerData.originalImage) {
      applyImageFilters(ctx, layerData.originalImage, layerData.backgroundSettings);
    }

    // Layer 2: Text with animation (only if video tab is active and animation is playing)
    if (layerData.textSettings.text) {
      ctx.save();
      
      let textOpacity = layerData.textSettings.opacity / 100;
      let textScale = 1;
      
      if (editSubTab === 'video' && isAnimationPlaying) {
        textOpacity *= animatedTextProps.opacity;
        textScale = animatedTextProps.scale;
      }
      
      const fontSize = layerData.textSettings.fontSize * textScale;
      
      // Apply letter and word spacing
      const letterSpacing = layerData.textSettings.letterSpacing;
      const wordSpacing = layerData.textSettings.wordSpacing;
      
      ctx.font = `${layerData.textSettings.fontWeight} ${fontSize}px ${layerData.textSettings.fontFamily}`;
      ctx.fillStyle = layerData.textSettings.color;
      ctx.globalAlpha = textOpacity;
      ctx.textBaseline = 'middle';
      
      // Apply letter spacing if supported
      if (letterSpacing !== 0) {
        ctx.letterSpacing = `${letterSpacing}px`;
      }
      
      // Apply word spacing if supported
      if (wordSpacing !== 0) {
        ctx.wordSpacing = `${wordSpacing}px`;
      }

      const x = (layerData.textSettings.x / 100) * canvas.width;
      const y = (layerData.textSettings.y / 100) * canvas.height;

      ctx.translate(x, y);
      ctx.rotate((layerData.textSettings.rotation * Math.PI) / 180);
      
      if (layerData.textSettings.shadowBlur > 0) {
        ctx.shadowColor = layerData.textSettings.shadowColor;
        ctx.shadowBlur = layerData.textSettings.shadowBlur;
        ctx.shadowOffsetX = layerData.textSettings.shadowOffsetX;
        ctx.shadowOffsetY = layerData.textSettings.shadowOffsetY;
      }
      
      if (layerData.textSettings.strokeWidth > 0) {
        ctx.strokeStyle = layerData.textSettings.strokeColor;
        ctx.lineWidth = layerData.textSettings.strokeWidth;
      }
      
      // Calculate line height based on font size
      const lineHeight = fontSize * 1.2;
      
      // Draw multi-line text
      drawMultiLineText(
        ctx, 
        layerData.textSettings.text, 
        0, 
        0, 
        lineHeight,
        layerData.textSettings.textAlign
      );
      
      ctx.restore();
    }

    // Layer 3: Background-removed image (foreground) with filters and transformations
    // Use sticker image if sticker effect is enabled and available, otherwise use background-removed image
    const subjectImage = layerData.subjectSettings.stickerEnabled && layerData.stickerImage 
      ? layerData.stickerImage 
      : layerData.backgroundRemovedImage;
      
    if (subjectImage) {
      applyImageFilters(ctx, subjectImage, layerData.subjectSettings);
    }
  }, [layerData, canvasDimensions, animatedTextProps, editSubTab, isAnimationPlaying]);

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

  useEffect(() => {
    if (editSubTab !== 'video' && isAnimationPlaying) {
      stopAnimation();
    }
  }, [editSubTab]);

  // Update text settings
  const updateTextSettings = (updates: Partial<typeof layerData.textSettings>) => {
    setLayerData(prev => ({
      ...prev,
      textSettings: { ...prev.textSettings, ...updates }
    }));
  };

  // Update background settings
  const updateBackgroundSettings = (updates: Partial<typeof layerData.backgroundSettings>) => {
    setLayerData(prev => ({
      ...prev,
      backgroundSettings: { ...prev.backgroundSettings, ...updates }
    }));
  };

  // Update subject settings
  const updateSubjectSettings = (updates: Partial<typeof layerData.subjectSettings>) => {
    setLayerData(prev => ({
      ...prev,
      subjectSettings: { ...prev.subjectSettings, ...updates }
    }));
  };

  // Update video settings
  const updateVideoSettings = (updates: Partial<typeof layerData.videoSettings>) => {
    setLayerData(prev => ({
      ...prev,
      videoSettings: { ...prev.videoSettings, ...updates }
    }));
  };

  // Handle sticker creation
  const handleCreateSticker = async () => {
    if (!layerData.backgroundRemovedImage) {
      toast.error('No subject image available', {
        description: 'Please upload an image first.',
        duration: 3000,
      });
      return;
    }

    toast.loading('Creating sticker effect...', {
      id: 'sticker-progress',
      description: 'Applying border and shadow effects to your subject',
    });

    try {
      await createStickerFromImage(layerData.backgroundRemovedImage, {
        borderWidth: layerData.subjectSettings.stickerBorderWidth,
        borderColor: layerData.subjectSettings.stickerBorderColor,
        shadowBlur: layerData.subjectSettings.stickerShadowBlur,
        shadowColor: layerData.subjectSettings.stickerShadowColor,
        shadowOffsetX: layerData.subjectSettings.stickerShadowOffsetX,
        shadowOffsetY: layerData.subjectSettings.stickerShadowOffsetY,
        shadowOpacity: layerData.subjectSettings.stickerShadowOpacity,
      });
      
      toast.dismiss('sticker-progress');
    } catch (error) {
      toast.dismiss('sticker-progress');
    }
  };

  const createAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: layerData.videoSettings.animationType.includes('fade'),
      onUpdate: () => {
        setAnimatedTextProps({
          opacity: tl.getById('textOpacity')?.progress() !== undefined ? 
            gsap.getProperty(tl.getById('textOpacity'), 'opacity') as number : 1,
          scale: tl.getById('textScale')?.progress() !== undefined ? 
            gsap.getProperty(tl.getById('textScale'), 'scale') as number : 1,
        });
      }
    });

    const duration = layerData.videoSettings.animationDuration;
    const easing = layerData.videoSettings.easing;

    switch (layerData.videoSettings.animationType) {
      case 'fade-in':
        tl.fromTo({}, { duration }, { opacity: 1, ease: easing, id: 'textOpacity' });
        setAnimatedTextProps({ opacity: 0, scale: 1 });
        break;
      case 'fade-out':
        tl.fromTo({}, { duration }, { opacity: 0, ease: easing, id: 'textOpacity' });
        setAnimatedTextProps({ opacity: 1, scale: 1 });
        break;
      case 'zoom-in':
        tl.fromTo({}, { duration }, { scale: 1, ease: easing, id: 'textScale' });
        setAnimatedTextProps({ opacity: 1, scale: 0.1 });
        break;
      case 'zoom-out':
        tl.fromTo({}, { duration }, { scale: 0.1, ease: easing, id: 'textScale' });
        setAnimatedTextProps({ opacity: 1, scale: 1 });
        break;
    }

    animationRef.current = tl;
    return tl;
  };

  const playAnimation = () => {
    if (editSubTab !== 'video') return;
    
    const tl = createAnimation();
    tl.play();
    setIsAnimationPlaying(true);
    
    toast.success('Animation preview started', {
      description: 'Preview your text animation effects',
      duration: 2000,
    });
  };

  const pauseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    setIsAnimationPlaying(false);
    
    toast.info('Animation paused', {
      duration: 1500,
    });
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
    setIsAnimationPlaying(false);
    setAnimatedTextProps({ opacity: 1, scale: 1 });
  };

  const downloadImage = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = `behindtext-effect.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : undefined);
      link.click();
      
      toast.success(`${format.toUpperCase()} downloaded!`, {
        description: 'Your text behind image effect has been saved.',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Download failed', {
        description: 'Please try again.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Toast Container */}
      <Toaster 
        position="top-right" 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: 'white',
          },
        }}
      />
      
      {/* Drag and Drop Overlay */}
      <DragDropOverlay isDragging={isDragging} />

      {/* SEO Content Header */}
      <header className="relative z-10 text-center py-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          BehindText Effect
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto">
          Create stunning <strong>text behind image effects</strong> with our free AI-powered editor. 
          Perfect for social media, marketing, and creative projects.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-8">
          <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
            ✨ AI Background Removal
          </span>
          <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
            🎨 Text Between Image Layers
          </span>
          <span className="px-3 py-1 bg-pink-500/20 rounded-full border border-pink-400/30">
            🎬 Animated Video Export
          </span>
          <span className="px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30">
            📱 Drag & Drop Upload
          </span>
          <span className="px-3 py-1 bg-orange-500/20 rounded-full border border-orange-400/30">
            🏷️ Sticker Effects
          </span>
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Powered by Bolt Logo */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100"
        >
          <img 
            src="/white_circle_360x360.png" 
            alt="Powered by Bolt" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </a>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1">
            <CanvasPreview 
              canvasRef={canvasRef}
              canvasDimensions={canvasDimensions}
              isProcessing={isProcessing}
              hasImage={!!layerData.originalImage}
            />
          </div>

          <div className="w-full xl:w-96">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <TabNavigation 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                hasImage={!!layerData.originalImage}
              />

              <div className="p-6">
                {activeTab === 'upload' && (
                  <UploadTab onImageUpload={handleFileInputChange} />
                )}

                {activeTab === 'edit' && (
                  <EditTab 
                    editSubTab={editSubTab}
                    setEditSubTab={setEditSubTab}
                    textSettings={layerData.textSettings}
                    backgroundSettings={layerData.backgroundSettings}
                    subjectSettings={layerData.subjectSettings}
                    videoSettings={layerData.videoSettings}
                    onUpdateText={updateTextSettings}
                    onUpdateBackground={updateBackgroundSettings}
                    onUpdateSubject={updateSubjectSettings}
                    onUpdateVideo={updateVideoSettings}
                    isAnimationPlaying={isAnimationPlaying}
                    playAnimation={playAnimation}
                    pauseAnimation={pauseAnimation}
                    onCreateSticker={handleCreateSticker}
                    isStickerProcessing={isStickerProcessing}
                  />
                )}

                {activeTab === 'export' && (
                  <ExportTab 
                    canvasDimensions={canvasDimensions}
                    isExporting={isExporting}
                    onDownloadImage={downloadImage}
                    onDownloadVideo={downloadVideo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SEO Content */}
      <footer className="relative z-10 mt-16 py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6 text-white">Why Choose BehindText for Your Text Behind Image Effects?</h3>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-blue-400">AI-Powered Background Removal</h4>
              <p className="text-gray-300 text-sm">
                Our advanced AI automatically removes backgrounds with precision, making it easy to create professional text behind image effects without manual editing.
              </p>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-purple-400">Perfect Text Positioning</h4>
              <p className="text-gray-300 text-sm">
                Position your text exactly where you want it - behind the subject but in front of the background. Create stunning text in between image effects effortlessly.
              </p>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-pink-400">Sticker Effects</h4>
              <p className="text-gray-300 text-sm">
                Add beautiful sticker effects to your subjects with customizable borders, shadows, and colors to make them pop off the background.
              </p>
            </div>
            <div className="p-6 bg-black/20 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold mb-3 text-green-400">Export Options</h4>
              <p className="text-gray-300 text-sm">
                Download your creations as high-quality images or animated videos. Perfect for social media, marketing, and creative projects.
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            BehindText is the ultimate free tool for creating text behind image effects. Whether you're a content creator, marketer, or designer, 
            our AI-powered editor makes it simple to create professional text in between image effects that stand out on social media and beyond.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ImageEditor;