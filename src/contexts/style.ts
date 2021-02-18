import { createContext } from 'react';

export interface Style {
  bgBody?: string;
}

const StyleContext = createContext<{
  style: Style;
  setStyle?(style: Style): void;
}>({
  style: { bgBody: '' },
});

export default StyleContext;
