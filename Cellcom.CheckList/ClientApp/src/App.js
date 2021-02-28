import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import Layout from './components/controller-views/general/Layout';
import AppHeader from './components/partial-views/general/AppHeader';
import AppDrawer from './components/partial-views/general/AppDrawer';
import AppSnackbar from './components/partial-views/general/AppSnackbar';
import Loader from './components/partial-views/general/Loader';
import OneTimeTaskController from './components/controller-views/OneTimeTaskController';
import TasksController from './components/controller-views/TasksController';
import UserTasksController from './components/controller-views/UserTasksController';
import TasksLogController from './components/controller-views/TasksLogController';
import withTheme from './withTheme';
import * as AppActionCreators from './actions/appActionCreators';
import * as TasksActionCreators from './actions/tasksActionCreators';
import { tr } from 'date-fns/esm/locale';

const App = (props) => {

    useEffect(() => {
        props.actions.fetchAppData();
    }, []);


    function openDrawer() {
        props.actions.openAppDrawer();
    }

    function closeDrawer() {
        props.actions.closeAppDrawer();
    }

    function hideSnackbar() {
        props.actions.showAppSnackbar(false);
    } 

    function openOneTimeTaskDialog() {
        props.actions.resetOneTimeTask();
        props.actions.openOneTimeTaskDialog(true);
    }


    const links = props.app.appData && props.app.appData.externalLinks || [];
    const isAdmin = props.app.appData && props.app.appData.isAdmin || false;

    const adminRoutes = (
        <>
            <Route exact path='/' component={TasksController} />
            <Route exact path='/usertasks' component={UserTasksController} />
            <Route exact path='/tasks' component={TasksController} />
            <Route exact path='/tasksLog' component={TasksLogController} />
            <OneTimeTaskController />
        </>
    );

    const userRoutes = (
        <>
            <Route exact path='/' component={UserTasksController} />
            <Route exact path='/usertasks' component={UserTasksController} />
            <OneTimeTaskController />
        </>
    );


    return (
        <>
            <AppHeader
                showAppMenu={isAdmin}
                links={links} 
                openDrawer={openDrawer}
                openOneTimeTaskDialog={openOneTimeTaskDialog} />
            <AppDrawer open={props.app.openAppDrawer} onOpen={openDrawer} onClose={closeDrawer}  />
            <Layout>
                {isAdmin ? adminRoutes : userRoutes}
            </Layout>
            <AppSnackbar
                show={props.app.snackbar.show}
                message={props.app.snackbar.message}
                alertType={props.app.snackbar.alertType}
                onClose={hideSnackbar} />
            <Loader show={props.app.showLoader} />
        </>
    )
};


const mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(AppActionCreators, dispatch),
            bindActionCreators(TasksActionCreators, dispatch)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(App));