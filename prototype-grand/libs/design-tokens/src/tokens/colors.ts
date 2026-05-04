/**
 * 🎨 Maha Color Tokens
 * JS-side color values for use in components (React, Angular, etc.)
 */

export const mahaColors = {
  /** Gold → Orange → Ember brand palette */
  maha: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFD700',
    600: '#FFB300',
    700: '#FF8C00',
    800: '#FF6D00',
    900: '#E65100',
  },
  surface: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    950: '#121212',
  },
} as const;

export type MahaColorKey = keyof typeof mahaColors.maha;
export type SurfaceColorKey = keyof typeof mahaColors.surface;
