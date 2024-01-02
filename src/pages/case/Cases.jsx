import React from 'react'
import { connect } from 'react-redux';
import Header from '../layouts/header';

function Cases() {
    return (
        <div>
            <Header />
            <h1>Davalarım</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Cases);