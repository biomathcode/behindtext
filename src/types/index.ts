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
  brightness: number;
  contrast: number;
  blur: number;
  saturation: number;
  dropShadowEnabled: boolean;
  dropShadowBlur: number;
  dropShadowColor: string;
  dropShadowOffsetX: number;
  dropShadowOffsetY: number;
  dropShadowOpacity: number;
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
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  videoSettings: VideoSettings;
}

export type TabType = 'upload' | 'edit' | 'export';
export type EditSubTabType = 'text' | 'image' | 'video';