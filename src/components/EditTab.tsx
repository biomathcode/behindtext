import React from 'react';
import { TextSettings, BackgroundSettings, VideoSettings } from '../types';
import EditSubTabNavigation from './EditSubTabNavigation';
import TextControls from './TextControls';
import ImageControls from './ImageControls';
import VideoControls from './VideoControls';

interface EditTabProps {
  editSubTab: 'text' | 'image' | 'video';
  setEditSubTab: (tab: 'text' | 'image' | 'video') => void;
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  videoSettings: VideoSettings;
  onUpdateText: (updates: Partial<TextSettings>) => void;
  onUpdateBackground: (updates: Partial<BackgroundSettings>) => void;
  onUpdateVideo: (updates: Partial<VideoSettings>) => void;
  isAnimationPlaying: boolean;
  playAnimation: () => void;
  pauseAnimation: () => void;
}

const EditTab: React.FC<EditTabProps> = ({
  editSubTab,
  setEditSubTab,
  textSettings,
  backgroundSettings,
  videoSettings,
  onUpdateText,
  onUpdateBackground,
  onUpdateVideo,
  isAnimationPlaying,
  playAnimation,
  pauseAnimation
}) => {
  return (
    <div className="space-y-4">
      <EditSubTabNavigation editSubTab={editSubTab} setEditSubTab={setEditSubTab} />

      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
        {editSubTab === 'text' && (
          <TextControls textSettings={textSettings} onUpdate={onUpdateText} />
        )}

        {editSubTab === 'image' && (
          <ImageControls backgroundSettings={backgroundSettings} onUpdate={onUpdateBackground} />
        )}

        {editSubTab === 'video' && (
          <VideoControls 
            videoSettings={videoSettings} 
            onUpdate={onUpdateVideo} 
            isAnimationPlaying={isAnimationPlaying}
            playAnimation={playAnimation}
            pauseAnimation={pauseAnimation}
          />
        )}
      </div>
    </div>
  );
};

export default EditTab;