import AppRouter from './AppRouter';
import { ColorSchemeProvider , MantineProvider , ColorScheme } from '@mantine/core'
import { useHotkeys, useLocalStorage  } from '@mantine/hooks';
function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
      key: 'mantine-color-scheme',
      defaultValue: 'light',
      getInitialValueInEffect: true,
    });
  
    const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
    useHotkeys([['mod+J', () => toggleColorScheme()]]);
  
  
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
      <AppRouter/>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
