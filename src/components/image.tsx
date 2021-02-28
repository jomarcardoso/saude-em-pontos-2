import React, { FC, HTMLAttributes, HTMLProps, ReactElement } from 'react';

const Image: FC<HTMLProps<HTMLImageElement>> = (props): ReactElement => {
  return <img {...(props as HTMLAttributes<HTMLImageElement>)} alt="" />;
};

export default Image;
