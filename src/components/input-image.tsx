import React, { ChangeEvent, useRef } from 'react';
import isFunction from 'lodash/isFunction';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from '@material-ui/core/Button';

export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = (): void => resolve(reader.result as string);
    reader.onabort = reject;
    reader.readAsDataURL(file);
  });
}

interface ResizeImageArgs {
  file?: File;
  base64?: string;
  maxSize: number;
}

async function resizeImage({
  file = null,
  base64 = '',
  maxSize = 0,
}: ResizeImageArgs): Promise<string> {
  const img = new Image();
  const fileType = file?.type;
  const src = base64 || (await convertToBase64(file));

  return new Promise<string>((resolve, reject) => {
    img.onload = (): void => {
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
    img.src = src;
  });
}

interface Props {
  quantity: number;
  setImage: (file: string) => void;
  maxSize?: number;
  image?: string;
}

const InputImage: React.FC<Props & React.HTMLProps<HTMLInputElement>> = ({
  image = '',
  setImage,
  maxSize = 320,
  onChange,
}) => {
  // const [image, setImage] = useState({});
  const inputEl = useRef();

  async function getImageBase64(file: File): Promise<string> {
    try {
      const resizedBase64Image = await resizeImage({
        file,
        maxSize,
      });

      return resizedBase64Image;
    } catch {
      return '';
    }
  }

  async function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const { target } = event;
    // const markedPositions = ArrayService.createDynamic({
    //   lengthNumber: quantity,
    // });

    // const filesPromises: Array<Promise<string> | string> = markedPositions.map(
    //   (_reserve, imageIndex: number) => {
    //     const file = target.files[imageIndex];

    //     return file ? getImageBase64(file) : '';
    //   },
    // );

    // const filesSelectedBase64 = await Promise.all(filesPromises);

    const filesSelectedBase64 = await getImageBase64(target.files[0]);

    setImage(filesSelectedBase64);

    if (isFunction(onChange)) onChange(event);
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
      <img src={image} alt="" />
      <Button type="button" component="label" htmlFor="picture">
        <AddPhotoAlternateIcon />
      </Button>
    </>
  );
};

export default InputImage;
