import { MantineProvider, DEFAULT_THEME  , MantineThemeOverride} from '@mantine/core';

const lightTheme: MantineThemeOverride = {
    colorScheme: 'light',
    dir: 'ltr',
    focusRing: 'auto',
    defaultRadius: 'md',
    // Add any other custom light theme overrides here if needed
  };

interface LightThemeWrapperProps {
    children: React.ReactNode;
    }


const LightThemeWrapper = ({ children } : LightThemeWrapperProps) => {

  return <MantineProvider theme={{ ...DEFAULT_THEME, ...lightTheme }}>{children}</MantineProvider>;
};

export default LightThemeWrapper;
