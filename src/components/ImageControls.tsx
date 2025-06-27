import React, { useState } from 'react';
import { BackgroundSettings, SubjectSettings } from '../types';
import ImageSubTabNavigation from './ImageSubTabNavigation';
import BackgroundControls from './BackgroundControls';
import SubjectControls from './SubjectControls';

interface ImageControlsProps {
  backgroundSettings: BackgroundSettings;
  subjectSettings: SubjectSettings;
  onUpdateBackground: (updates: Partial<BackgroundSettings>) => void;
  onUpdateSubject: (updates: Partial<SubjectSettings>) => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({ 
  backgroundSettings, 
  subjectSettings,
  onUpdateBackground,
  onUpdateSubject 
}) => {
  const [imageSubTab, setImageSubTab] = useState<'background' | 'subject'>('background');

  return (
    <div className="space-y-4">
      <ImageSubTabNavigation imageSubTab={imageSubTab} setImageSubTab={setImageSubTab} />

      {imageSubTab === 'background' && (
        <BackgroundControls 
          backgroundSettings={backgroundSettings} 
          onUpdate={onUpdateBackground} 
        />
      )}

      {imageSubTab === 'subject' && (
        <SubjectControls 
          subjectSettings={subjectSettings} 
          onUpdate={onUpdateSubject} 
        />
      )}
    </div>
  );
};

export default ImageControls;