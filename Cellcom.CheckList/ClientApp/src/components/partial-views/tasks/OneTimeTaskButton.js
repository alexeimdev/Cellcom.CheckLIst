import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EventIcon from '@material-ui/icons/Event';

export default function OneTimeTaskButton(props) {

    function handleClick() {
        props.onClick();
    }

    return (
        <Tooltip title="צור סעיף מזדמן">
            <IconButton color="inherit" onClick={handleClick}>
                <EventIcon />
            </IconButton>
        </Tooltip>
    )
}