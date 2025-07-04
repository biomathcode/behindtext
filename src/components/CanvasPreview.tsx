import React from 'react';
import { Loader2 } from 'lucide-react';

interface CanvasPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasDimensions: { width: number; height: number };
  isProcessing: boolean;
  hasImage: boolean;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  canvasRef,
  canvasDimensions,
  isProcessing,
  hasImage
}) => {
  return (
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
        {hasImage && (
          <div className="text-sm text-gray-400 px-3 py-1 rounded-full bg-gray-500/20 border border-gray-400/30 inline-block">
            {canvasDimensions.width} × {canvasDimensions.height}px (Original Size)
          </div>
        )}
      </div>
      
      <div className="backdrop-blur-lg bg-black/20 rounded-2xl p-6 flex items-center justify-center min-h-96 border border-white/10 overflow-hidden">
        {isProcessing ? (
          <div className="text-center">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
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
  );
};

export default CanvasPreview;