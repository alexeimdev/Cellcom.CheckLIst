import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    direction: "rtl",
     palette: {
         primary: {
             light: '#701c68',
             main: '#701c68',
             dark: '#701c68'
         },
         secondary: {
             light: pink[300],
             main: pink[500],
             dark: pink[700]
         }
     }
});

function withTheme(Component) {
    function WithTheme(props) {
        return (
            <ThemeProvider theme={theme}>
                <StylesProvider jss={jss}>
                    <Component {...props} />
                </StylesProvider>
            </ThemeProvider>
        )
    }
    return WithTheme;
}

export default withTheme;