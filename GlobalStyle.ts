import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  borderRadius: '5px',
  palette: {
    background: '#F0F3FB',
    backgroundHover: '#DDDFF4',
    foreground: '#353638',
    darkGray: '#292929',
    semiGray: '#29292980',
    lightGray: '#FCFCFC',
    whiteSemiTransparent: '#D3D3D3',
    lightSplitter: '#D3D3D3',
    error: 'rgb(248 113 113)',
    primary: '#40A9FF',
  },
  shadow: {
    focus: '0px 0px 20px rgba(0, 0, 0, 0.1)',
  },
};

export const GlobalStyle = createGlobalStyle`

  * {
  	box-sizing: border-box;
  }

  html,
  body,
	#__next {
	  height: 100%;
	  width: 100%;
	}

  html,
  body {
	  overflow-x: hidden;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

	img,
	svg {
    display: inline;
	}

	a {
	  text-decoration: none;
	  color: inherit;
	}
`;
