import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TasksActionCreators from '../../actions/tasksActionCreators';
import OneTimeTaskDialog from '../partial-views/tasks/OneTimeTaskDialog';

const OneTimeTaskController = (props) => {

    function onNameChange(value) {
        props.actions.setOneTimeTaskName(value);
    }

    function onDateTimeChange(dateTime) {
        props.actions.setOneTimeTaskDateTime(dateTime);
    }

    function onDetailsChange(value) {
        props.actions.setOneTimeTaskDetails(value);
    }

    function onCommentsChange(value) {
        props.actions.setOneTimeTaskComments(value);
    }
    
    function onSubmit() {
        props.actions.submitOneTimeTask();
    }

    function onClose() {
        props.actions.openOneTimeTaskDialog(false);
    }


    return (
        <OneTimeTaskDialog 
            open={props.tasks.oneTimeTask.isOpen}
            title="יצירת סעיף מזדמן"
            task={props.tasks.oneTimeTask}
            onNameChange={onNameChange}
            onDateTimeChange={onDateTimeChange}
            onDetailsChange={onDetailsChange}
            onCommentsChange={onCommentsChange}
            onSubmit={onSubmit}
            onClose={onClose} />
    )
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(TasksActionCreators, dispatch),
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneTimeTaskController);
