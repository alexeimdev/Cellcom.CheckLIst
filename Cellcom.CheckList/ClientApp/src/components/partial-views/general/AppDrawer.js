import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});


export default function AppDrawer(props) {
    const classes = useStyles();

    const toggleDrawer = event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        props.onClose();
    };

    const sideList = (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                <ListItem button key="tasks" component={Link} to="/tasks">
                    <ListItemIcon><PlaylistAdd /></ListItemIcon>
                    <ListItemText primary="כל הסעיפים" />
                </ListItem>
                <ListItem button key="userTasks" component={Link} to="/userTasks">
                    <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
                    <ListItemText primary="סעיפים לביצוע" />
                </ListItem>
                <ListItem button key="tasksLog" component={Link} to="/tasksLog">
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary="לוגים" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            <Drawer open={props.open} onClose={toggleDrawer}>
                {sideList}
            </Drawer>
        </div>
    );
}