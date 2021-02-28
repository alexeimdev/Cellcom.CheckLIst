import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


export default function FixedContainer(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box pt={5} pb={10}>
                    {props.children}
                </Box>
            </Container>
        </React.Fragment>
    );
}
