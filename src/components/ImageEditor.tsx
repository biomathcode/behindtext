import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Type, Settings, Image as ImageIcon, Video, Play, Pause } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import { gsap } from 'gsap';
import { useVideoExport } from '../hooks/useVideoExport';

interface TextSettings {
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  color: string;
  opacity: number;
  rotation: number;
  x: number;
  y: number;
  strokeWidth: number;
  strokeColor: string;
  shadowBlur: number;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

interface BackgroundSettings {
  brightness: number;
  contrast: number;
  blur: number;
  saturation: number;
}

interface VideoSettings {
  animationType: 'fade-in' | 'fade-out' | 'zoom-in' | 'zoom-out';
  animationDuration: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  videoDuration: number;
}

interface LayerData {
  originalImage: HTMLImageElement | null;
  backgroundRemovedImage: HTMLImageElement | null;
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  videoSettings: VideoSettings;
}

const ImageEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  
  const [layerData, setLayerData] = useState<LayerData>({
    originalImage: null,
    backgroundRemovedImage: null,
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
    },
    backgroundSettings: {
      brightness: 100,
      contrast: 100,
      blur: 0,
      saturation: 100,
    },
    videoSettings: {
      animationType: 'fade-in',
      animationDuration: 2,
      easing: 'ease-out',
      videoDuration: 10,
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'edit' | 'export'>('upload');
  const [editSubTab, setEditSubTab] = useState<'text' | 'background' | 'video'>('text');
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [animatedTextProps, setAnimatedTextProps] = useState({
    opacity: 1,
    scale: 1,
  });

  // Use the video export hook
  const { isExporting, downloadVideo } = useVideoExport({ layerData, canvasDimensions });

  const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact', 'Trebuchet MS'];

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
      ctx.font = `${layerData.textSettings.fontWeight} ${fontSize}px ${layerData.textSettings.fontFamily}`;
      ctx.fillStyle = layerData.textSettings.color;
      ctx.globalAlpha = textOpacity;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

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
        ctx.strokeText(layerData.textSettings.text, 0, 0);
      }
      
      ctx.fillText(layerData.textSettings.text, 0, 0);
      
      ctx.restore();
    }

    // Layer 3: Background-removed image (foreground)
    if (layerData.backgroundRemovedImage) {
      ctx.drawImage(layerData.backgroundRemovedImage, 0, 0, canvas.width, canvas.height);
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

  // Update animation when settings change
  useEffect(() => {
    if (isAnimationPlaying && editSubTab === 'video') {
      createAnimation();
    }
  }, [layerData.videoSettings.animationType, layerData.videoSettings.animationDuration, layerData.videoSettings.easing]);

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
  };

  const pauseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
    setIsAnimationPlaying(false);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
    setIsAnimationPlaying(false);
    setAnimatedTextProps({ opacity: 1, scale: 1 });
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

  const updateTextSettings = (updates: Partial<TextSettings>) => {
    setLayerData(prev => ({
      ...prev,
      textSettings: { ...prev.textSettings, ...updates }
    }));
  };

  const updateBackgroundSettings = (updates: Partial<BackgroundSettings>) => {
    setLayerData(prev => ({
      ...prev,
      backgroundSettings: { ...prev.backgroundSettings, ...updates }
    }));
  };

  const updateVideoSettings = (updates: Partial<VideoSettings>) => {
    setLayerData(prev => ({
      ...prev,
      videoSettings: { ...prev.videoSettings, ...updates }
    }));
  };

  const downloadImage = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `behindtext-effect.${format}`;
    link.href = canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : undefined);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
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
            📱 Mobile Friendly
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
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">Canvas Preview</h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-3">
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Background Layer
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Text Layer
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Subject Layer
                  </span>
                </div>
                {layerData.originalImage && (
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                    <div className="px-3 py-1 rounded-full bg-gray-500/20 border border-gray-400/30">
                      {canvasDimensions.width} × {canvasDimensions.height}px
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-500/20 border border-gray-400/30">
                      Aspect Ratio: {(canvasDimensions.width / canvasDimensions.height).toFixed(2)}:1
                    </div>
                  </div>
                )}
              </div>
              
              <div className="backdrop-blur-lg bg-black/20 rounded-2xl p-6 flex items-center justify-center min-h-96 border border-white/10">
                {isProcessing ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-400 mx-auto mb-4"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/20 rounded-full animate-ping mx-auto"></div>
                    </div>
                    <p className="text-gray-300 font-medium">Processing your image...</p>
                    <p className="text-sm text-gray-400 mt-1">Removing background with AI</p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    width={canvasDimensions.width}
                    height={canvasDimensions.height}
                    className="max-w-full max-h-full rounded-xl shadow-2xl border border-white/20"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '70vh',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full xl:w-96">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="flex border-b border-white/20">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'upload'
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-b-2 border-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Upload className="w-4 h-4 mx-auto mb-1" />
                  Upload
                </button>
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'edit'
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white border-b-2 border-purple-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  disabled={!layerData.originalImage}
                >
                  <Settings className="w-4 h-4 mx-auto mb-1" />
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === 'export'
                      ? 'bg-gradient-to-r from-pink-500/30 to-blue-500/30 text-white border-b-2 border-pink-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  disabled={!layerData.originalImage}
                >
                  <Download className="w-4 h-4 mx-auto mb-1" />
                  Export
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'upload' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-6 text-white">Upload Your Image</h3>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400/50 transition-all duration-300 hover:bg-white/5 group"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-gray-200 mb-2 font-medium">Click to upload an image</p>
                      <p className="text-sm text-gray-400">Supports JPG, PNG formats</p>
                      <p className="text-xs text-gray-500 mt-2">Create your text behind image effect</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {/* SEO Content Section */}
                    <div className="mt-8 p-6 bg-black/20 rounded-xl border border-white/10">
                      <h4 className="text-lg font-semibold mb-4 text-white">How to Create Text Behind Image Effects</h4>
                      <ol className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">1</span>
                          <span><strong>Upload your image</strong> - Choose any photo where you want to create a text behind effect</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-400">2</span>
                          <span><strong>AI removes background</strong> - Our AI automatically separates the subject from the background</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-pink-500/20 rounded-full flex items-center justify-center text-xs font-bold text-pink-400">3</span>
                          <span><strong>Add text between layers</strong> - Position your text behind the subject but in front of the background</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold text-green-400">4</span>
                          <span><strong>Export your creation</strong> - Download as image or animated video for social media</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                )}

                {activeTab === 'edit' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-6 text-white">Edit Your BehindText Effect</h3>
                    
                    <div className="flex rounded-xl bg-black/20 p-1 border border-white/10">
                      <button
                        onClick={() => setEditSubTab('text')}
                        className={`flex-1 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          editSubTab === 'text'
                            ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Type className="w-4 h-4" />
                        Text
                      </button>
                      <button
                        onClick={() => setEditSubTab('background')}
                        className={`flex-1 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          editSubTab === 'background'
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4" />
                        Background
                      </button>
                      <button
                        onClick={() => setEditSubTab('video')}
                        className={`flex-1 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                          editSubTab === 'video'
                            ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        Video
                      </button>
                    </div>

                    {editSubTab === 'text' && (
                      <div className="space-y-6">
                        {/* Position */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-200">
                              Horizontal: <span className="text-blue-400">{layerData.textSettings.x}%</span>
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={layerData.textSettings.x}
                              onChange={(e) => updateTextSettings({ x: parseInt(e.target.value) })}
                              className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-200">
                              Vertical: <span className="text-blue-400">{layerData.textSettings.y}%</span>
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={layerData.textSettings.y}
                              onChange={(e) => updateTextSettings({ y: parseInt(e.target.value) })}
                              className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Opacity: <span className="text-blue-400">{layerData.textSettings.opacity}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={layerData.textSettings.opacity}
                            onChange={(e) => updateTextSettings({ opacity: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        {/* Text Content */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">Text Content</label>
                          <input
                            type="text"
                            value={layerData.textSettings.text}
                            onChange={(e) => updateTextSettings({ text: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
                            placeholder="Enter your text here..."
                          />
                        </div>

                        {/* Font Family */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">Font Family</label>
                          <select
                            value={layerData.textSettings.fontFamily}
                            onChange={(e) => updateTextSettings({ fontFamily: e.target.value })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
                          >
                            {fontFamilies.map(font => (
                              <option key={font} value={font} className="bg-gray-800">{font}</option>
                            ))}
                          </select>
                        </div>

                        {/* Font Size */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Font Size: <span className="text-blue-400">{layerData.textSettings.fontSize}px</span>
                          </label>
                          <input
                            type="range"
                            min="12"
                            max="120"
                            value={layerData.textSettings.fontSize}
                            onChange={(e) => updateTextSettings({ fontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        {/* Font Weight */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Font Weight: <span className="text-blue-400">{layerData.textSettings.fontWeight}</span>
                          </label>
                          <input
                            type="range"
                            min="100"
                            max="900"
                            step="100"
                            value={layerData.textSettings.fontWeight}
                            onChange={(e) => updateTextSettings({ fontWeight: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        {/* Color */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">Text Color</label>
                          <div className="flex gap-3">
                            <input
                              type="color"
                              value={layerData.textSettings.color}
                              onChange={(e) => updateTextSettings({ color: e.target.value })}
                              className="w-12 h-12 rounded-lg border border-white/20 bg-black/20 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={layerData.textSettings.color}
                              onChange={(e) => updateTextSettings({ color: e.target.value })}
                              className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
                              placeholder="#ffffff"
                            />
                          </div>
                        </div>

                        {/* Rotation */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Rotation: <span className="text-blue-400">{layerData.textSettings.rotation}°</span>
                          </label>
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            value={layerData.textSettings.rotation}
                            onChange={(e) => updateTextSettings({ rotation: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    )}

                    {editSubTab === 'background' && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Brightness: <span className="text-blue-400">{layerData.backgroundSettings.brightness}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={layerData.backgroundSettings.brightness}
                            onChange={(e) => updateBackgroundSettings({ brightness: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Contrast: <span className="text-blue-400">{layerData.backgroundSettings.contrast}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={layerData.backgroundSettings.contrast}
                            onChange={(e) => updateBackgroundSettings({ contrast: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Saturation: <span className="text-blue-400">{layerData.backgroundSettings.saturation}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={layerData.backgroundSettings.saturation}
                            onChange={(e) => updateBackgroundSettings({ saturation: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Blur: <span className="text-blue-400">{layerData.backgroundSettings.blur}px</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={layerData.backgroundSettings.blur}
                            onChange={(e) => updateBackgroundSettings({ blur: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    )}

                    {editSubTab === 'video' && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">Animation Type</label>
                          <select
                            value={layerData.videoSettings.animationType}
                            onChange={(e) => updateVideoSettings({ animationType: e.target.value as VideoSettings['animationType'] })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
                          >
                            <option value="fade-in" className="bg-gray-800">Fade In</option>
                            <option value="fade-out" className="bg-gray-800">Fade Out</option>
                            <option value="zoom-in" className="bg-gray-800">Zoom In</option>
                            <option value="zoom-out" className="bg-gray-800">Zoom Out</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Animation Duration: <span className="text-blue-400">{layerData.videoSettings.animationDuration}s</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={layerData.videoSettings.animationDuration}
                            onChange={(e) => updateVideoSettings({ animationDuration: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">Easing</label>
                          <select
                            value={layerData.videoSettings.easing}
                            onChange={(e) => updateVideoSettings({ easing: e.target.value as VideoSettings['easing'] })}
                            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-blue-400/50 focus:outline-none transition-colors"
                          >
                            <option value="ease-in" className="bg-gray-800">Ease In</option>
                            <option value="ease-out" className="bg-gray-800">Ease Out</option>
                            <option value="ease-in-out" className="bg-gray-800">Ease In Out</option>
                            <option value="linear" className="bg-gray-800">Linear</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-200">
                            Video Duration: <span className="text-blue-400">{layerData.videoSettings.videoDuration}s</span>
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="30"
                            value={layerData.videoSettings.videoDuration}
                            onChange={(e) => updateVideoSettings({ videoDuration: parseInt(e.target.value) })}
                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white">Animation Preview</h4>
                          <div className="flex gap-3">
                            <button
                              onClick={playAnimation}
                              disabled={isAnimationPlaying}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl text-white font-medium hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <Play className="w-4 h-4" />
                              Play
                            </button>
                            <button
                              onClick={pauseAnimation}
                              disabled={!isAnimationPlaying}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl text-white font-medium hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <Pause className="w-4 h-4" />
                              Pause
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'export' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-6 text-white">Export Your BehindText Creation</h3>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white">Export as Image</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => downloadImage('png')}
                          className="px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl text-white font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          PNG
                        </button>
                        <button
                          onClick={() => downloadImage('jpeg')}
                          className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl text-white font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          JPEG
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-white">Export as Video</h4>
                      <button
                        onClick={downloadVideo}
                        disabled={isExporting}
                        className="w-full px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl text-white font-medium hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isExporting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Exporting Video...
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4" />
                            Download Animated Video
                          </>
                        )}
                      </button>
                      <p className="text-sm text-gray-400 text-center">
                        Video will be recorded for {layerData.videoSettings.videoDuration} seconds
                      </p>
                    </div>

                    {/* SEO Benefits Section */}
                    <div className="mt-8 p-6 bg-black/20 rounded-xl border border-white/10">
                      <h4 className="text-lg font-semibold mb-4 text-white">Perfect for Social Media</h4>
                      <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span><strong>Instagram Stories & Posts</strong> - Eye-catching text behind image effects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          <span><strong>TikTok & Reels</strong> - Animated text effects for viral content</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                          <span><strong>Marketing Materials</strong> - Professional text in between image effects</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <span><strong>YouTube Thumbnails</strong> - Stand out with unique text placement</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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
              <h4 className="text-lg font-semibold mb-3 text-pink-400">Export Options</h4>
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