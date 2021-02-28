import React from 'react';
import { connect } from 'react-redux';

import NavMenu from '../../partial-views/general/NavMenu';

const NavMenuController = props => {

    const { userName } = props.user;

    return (
        <NavMenu userName={userName} />
    );
}



const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(NavMenuController);
