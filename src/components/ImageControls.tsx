import React, { useState } from 'react';
import { BackgroundSettings } from '../types';
import ImageSubTabNavigation from './ImageSubTabNavigation';
import BackgroundControls from './BackgroundControls';
import SubjectControls from './SubjectControls';

interface ImageControlsProps {
  backgroundSettings: BackgroundSettings;
  onUpdate: (updates: Partial<BackgroundSettings>) => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({ backgroundSettings, onUpdate }) => {
  const [imageSubTab, setImageSubTab] = useState<'background' | 'subject'>('background');

  return (
    <div className="space-y-4">
      <ImageSubTabNavigation imageSubTab={imageSubTab} setImageSubTab={setImageSubTab} />

      {imageSubTab === 'background' && (
        <BackgroundControls backgroundSettings={backgroundSettings} onUpdate={onUpdate} />
      )}

      {imageSubTab === 'subject' && (
        <SubjectControls backgroundSettings={backgroundSettings} onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default ImageControls;