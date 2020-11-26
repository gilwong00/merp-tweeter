// theme.js
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

// const breakpoints = {
//   sm: '30em',
//   md: '48em',
//   lg: '62em',
//   xl: '80em'
// };

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px'
});

const theme = extendTheme({
  breakpoints
  // components: {
  //   Button: {
  //     // 1. We can update the base styles
  //     baseStyle: {
  //       fontWeight: 'bold'
  //     },
  //     // 2. We can add a new button size or extend existing
  //     sizes: {
  //       xl: {
  //         h: '56px',
  //         fontSize: 'lg',
  //         px: '32px'
  //       }
  //     },
  //     // 3. We can add a new visual variant
  //     variants: {
  //       'with-shadow': {
  //         bg: 'red.400',
  //         boxShadow: '0 0 2px 2px #efdfde'
  //       },
  //       // 4. We can override existing variants
  //       solid: props => ({
  //         bg: props.colorMode === 'dark' ? 'teal.300' : 'teal.500'
  //       })
  //     }
  //   }
  // }
});

export default theme;
