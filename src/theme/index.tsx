import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import {LightTheme,SIZE} from './Color';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <StyledComponentsThemeProvider theme={(LightTheme)}>{children}</StyledComponentsThemeProvider>
};

