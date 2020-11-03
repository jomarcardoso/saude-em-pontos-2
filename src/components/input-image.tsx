import React, { useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from '@material-ui/core/Button';

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onabort = reject;
    reader.readAsDataURL(file);
  });
}

export function resizeImage({ file = '', base64 = '', maxSize = 320 } = {}) {
  const img = new Image();
  const fileType = file.type;

  return new Promise(async (resolve, reject) => {
    img.onload = () => {
      const maxWidth = maxSize;
      const maxHeight = maxSize;
      let { height, width } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height));
        height = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const quality = 0.9;
      const format = fileType || 'image/jpeg';
      const dataUrl = canvas.toDataURL(format, quality);

      resolve(dataUrl);
    };

    img.onerror = reject;

    const src = base64 || (await convertToBase64(file));
    img.src = src;
  });
}

const InputImage: React.FC = ({ image = {}, setImage, maxSize = 320 }) => {
  // const [image, setImage] = useState({});
  const inputEl = useRef();

  async function _getImageBase64(target) {
    try {
      const file = target.files[0];
      if (!file) return null;
      const base64 = maxSize
        ? await resizeImage({ file, maxSize })
        : await convertToBase64(file);
      const image = {
        base64,
        size: file.size / 1024 / 1024, // in MB
      };
      return image;
    } catch {
      return '';
    }
  }

  async function handleChange(event) {
    const image = await _getImageBase64(event.target);

    setImage(image.base64);
  }

  return (
    <>
      <input
        type="file"
        name="picture"
        accept="image/*"
        className="d-none"
        onChange={handleChange}
        ref={inputEl}
        id="picture"
      />
      <img src={image} />
      <Button type="button" component="label" htmlFor="picture">
        <AddPhotoAlternateIcon />
      </Button>
    </>
  );
};

export default InputImage;
