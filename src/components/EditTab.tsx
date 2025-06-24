import React from 'react';
import { TextSettings, BackgroundSettings, VideoSettings } from '../types';
import EditSubTabNavigation from './EditSubTabNavigation';
import TextControls from './TextControls';
import BackgroundControls from './BackgroundControls';
import VideoControls from './VideoControls';

interface EditTabProps {
  editSubTab: 'text' | 'background' | 'video';
  setEditSubTab: (tab: 'text' | 'background' | 'video') => void;
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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Edit Your Composition</h3>
      
      <EditSubTabNavigation editSubTab={editSubTab} setEditSubTab={setEditSubTab} />

      {editSubTab === 'text' && (
        <TextControls textSettings={textSettings} onUpdate={onUpdateText} />
      )}

      {editSubTab === 'background' && (
        <BackgroundControls backgroundSettings={backgroundSettings} onUpdate={onUpdateBackground} />
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
  );
};

export default EditTab;