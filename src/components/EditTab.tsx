import React from 'react';
import { TextSettings, BackgroundSettings, SubjectSettings, VideoSettings } from '../types';
import EditSubTabNavigation from './EditSubTabNavigation';
import TextControls from './TextControls';
import ImageControls from './ImageControls';
import VideoControls from './VideoControls';

interface EditTabProps {
  editSubTab: 'text' | 'image' | 'video';
  setEditSubTab: (tab: 'text' | 'image' | 'video') => void;
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  subjectSettings: SubjectSettings;
  videoSettings: VideoSettings;
  onUpdateText: (updates: Partial<TextSettings>) => void;
  onUpdateBackground: (updates: Partial<BackgroundSettings>) => void;
  onUpdateSubject: (updates: Partial<SubjectSettings>) => void;
  onUpdateVideo: (updates: Partial<VideoSettings>) => void;
  isAnimationPlaying: boolean;
  playAnimation: () => void;
  pauseAnimation: () => void;
  onCreateSticker?: () => void;
  isStickerProcessing?: boolean;
}

const EditTab: React.FC<EditTabProps> = ({
  editSubTab,
  setEditSubTab,
  textSettings,
  backgroundSettings,
  subjectSettings,
  videoSettings,
  onUpdateText,
  onUpdateBackground,
  onUpdateSubject,
  onUpdateVideo,
  isAnimationPlaying,
  playAnimation,
  pauseAnimation,
  onCreateSticker,
  isStickerProcessing = false
}) => {
  return (
    <div className="space-y-4">
      <EditSubTabNavigation editSubTab={editSubTab} setEditSubTab={setEditSubTab} />

      <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
        {editSubTab === 'text' && (
          <TextControls textSettings={textSettings} onUpdate={onUpdateText} />
        )}

        {editSubTab === 'image' && (
          <ImageControls 
            backgroundSettings={backgroundSettings} 
            subjectSettings={subjectSettings}
            onUpdateBackground={onUpdateBackground}
            onUpdateSubject={onUpdateSubject}
            onCreateSticker={onCreateSticker}
            isStickerProcessing={isStickerProcessing}
          />
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