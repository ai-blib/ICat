import styled, {
    createGlobalStyle,
    css,
    DefaultTheme,
    ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import {defaultThem,SIZE} from './Color';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <StyledComponentsThemeProvider theme={{...defaultThem,...SIZE}}>{children}</StyledComponentsThemeProvider>
};

