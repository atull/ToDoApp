import { PixelRatio } from 'react-native';

export const fontSizer = (size: number) => {
  return size * PixelRatio.getFontScale();
};

export const boxSizer = (size: number) => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
};
