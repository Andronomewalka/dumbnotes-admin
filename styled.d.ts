import 'styled-components';

interface IPalette {
  main: string;
  contrastText: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      background: string;
      backgroundHover: string;
      foreground: string;
      darkGray: string;
      semiGray: string;
      lightGray: string;
      whiteSemiTransparent: string;
      lightSplitter: string;
      error: string;
      primary: string;
    };
    shadow: {
      focus: string;
    };
  }
}
