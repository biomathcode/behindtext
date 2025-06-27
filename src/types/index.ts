export interface TextSettings {
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
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number;
  wordSpacing: number;
}

export interface BackgroundSettings {
  // Image Opacity
  opacity: number;
  
  // Image Filters
  brightness: number;
  contrast: number;
  blur: number;
  saturation: number;
  
  // Shadow
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowOpacity: number;
  
  // Transformations
  rotation: number;
  scale: number;
  
  // Subject-specific settings (for foreground image)
  dropShadowEnabled: boolean;
  dropShadowBlur: number;
  dropShadowColor: string;
  dropShadowOffsetX: number;
  dropShadowOffsetY: number;
  dropShadowOpacity: number;
}

export interface SubjectSettings {
  // Image Opacity
  opacity: number;
  
  // Image Filters
  brightness: number;
  contrast: number;
  blur: number;
  saturation: number;
  
  // Shadow
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowOpacity: number;
  
  // Transformations
  rotation: number;
  scale: number;
  
  // Sticker Effect
  stickerEnabled: boolean;
  stickerBorderWidth: number;
  stickerBorderColor: string;
  stickerShadowBlur: number;
  stickerShadowColor: string;
  stickerShadowOffsetX: number;
  stickerShadowOffsetY: number;
  stickerShadowOpacity: number;
}

export interface VideoSettings {
  animationType: 'fade-in' | 'fade-out' | 'zoom-in' | 'zoom-out';
  animationDuration: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  videoDuration: number;
}

export interface LayerData {
  originalImage: HTMLImageElement | null;
  backgroundRemovedImage: HTMLImageElement | null;
  stickerImage: HTMLImageElement | null;
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  subjectSettings: SubjectSettings;
  videoSettings: VideoSettings;
}

export type TabType = 'upload' | 'edit' | 'export';
export type EditSubTabType = 'text' | 'image' | 'video';