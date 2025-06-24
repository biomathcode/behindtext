import React from 'react';
import { EditSubTabType, TextSettings, BackgroundSettings, VideoSettings } from '../types';
import EditSubTabNavigation from './EditSubTabNavigation';
import TextControls from './TextControls';
import BackgroundControls from './BackgroundControls';
import VideoControls from './VideoControls';

interface EditTabProps {
  editSubTab: EditSubTabType;
  setEditSubTab: (tab: EditSubTabType) => void;
  textSettings: TextSettings;
  backgroundSettings: BackgroundSettings;
  videoSettings: VideoSettings;
  onUpdateText: (updates: Partial<TextSettings>) => void;
  onUpdateBackground: (updates: Partial<BackgroundSettings>) => void;
  onUpdateVideo: (updates: Partial<VideoSettings>) => void;
}

const EditTab: React.FC<EditTabProps> = ({
  editSubTab,
  setEditSubTab,
  textSettings,
  backgroundSettings,
  videoSettings,
  onUpdateText,
  onUpdateBackground,
  onUpdateVideo
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
        <VideoControls videoSettings={videoSettings} onUpdate={onUpdateVideo} />
      )}
    </div>
  );
};

export default EditTab;