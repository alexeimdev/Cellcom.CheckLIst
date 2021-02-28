import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

export default function UsefulLinks(props) {

    const [open, setOpen] = React.useState(false);

    function handleToggle() {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleClose() {
        setOpen(false);
    };

    
    return (
        <>
            <Tooltip title="קישורים שימושיים">
                <IconButton edge="start"
                    color="inherit"
                    onClick={handleToggle}>
                    <BookmarksIcon />
                </IconButton>
            </Tooltip>
            <Popper open={open}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                            {props.links.map(item => (
                                <Link href={item.url} target="_blank">
                                    <MenuItem key={item.id} style={{ minWidth: 200 }} onClick={handleClose}>
                                        {item.name}
                                    </MenuItem>
                                </Link>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
}