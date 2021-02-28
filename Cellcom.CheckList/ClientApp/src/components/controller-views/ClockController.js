import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ClockActionCreators from '../../actions/clockActionCreators';


const ClockController = (props) => {

    useEffect(() => {
        const time = getCurrentTime();
        props.actions.setTime(time);

        setInterval(() => {
            const time = getCurrentTime();
            props.actions.setTime(time);
        }, 1000 * 1)

    }, []);


    function getCurrentTime() {
        const now = new Date();
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        }
    }

    return (
        null
    )

}


const mapStateToProps = (state) => {
    return {
        clock: state.clock,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(ClockActionCreators, dispatch),
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClockController);
