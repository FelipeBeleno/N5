import { createTheme } from "@mui/material";

export const themeGeneral = createTheme(
    {
        palette: {
            mode: 'light',
            primary: {
                main: '#40a956',
                contrastText: 'white'
            },
            secondary: {
                main : '#d5f1db',
                contrastText:'black'
            }
        }
    }
)

export const themeGeneralDark = createTheme(
    {
        palette: {
            mode: 'dark',
            primary: {
                main: '#ffff',
                contrastText: '#000000'
            }
        }
    }
)