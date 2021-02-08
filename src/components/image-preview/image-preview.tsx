import React from 'react';

export const ImagePreview = ({ dataUri, isFullscreen }) => {
  const classNameFullscreen = isFullscreen
    ? 'demo-image-preview-fullscreen'
    : '';

  return (
    <div className={`demo-image-preview ${classNameFullscreen}`}>
      <img src={dataUri} alt="" />
    </div>
  );
};

export default ImagePreview;
