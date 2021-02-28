import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import UsefulLinks from './UsefulLinks';
import OneTimeTaskButton from '../tasks/OneTimeTaskButton';

import cellcomLogo from '../../../images/logo.png';

export default function (props) {

    return (
        <AppBar position="static">
            <Toolbar color="inherit">

                {props.showAppMenu && 
                    <IconButton color="inherit" onClick={props.openDrawer}>
                        <MenuIcon />
                    </IconButton>
                }

                <Box style={{ flexGrow: 1 }} />

                <OneTimeTaskButton onClick={props.openOneTimeTaskDialog} />
                <Divider light variant="middle" orientation="vertical" />
                <UsefulLinks links={props.links} />
                <Divider light variant="middle" orientation="vertical" />
                <img src={cellcomLogo} alt="cellcom logo" height={40} style={{alignSelf: 'flex-start'}} />
                <Divider light variant="middle" orientation="vertical" />
            </Toolbar>
        </AppBar>
    )
}