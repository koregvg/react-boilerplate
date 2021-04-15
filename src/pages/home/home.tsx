import React from 'react';
import './home.scss';
import {Layouts} from '../layout/layout'

class Home extends React.Component {
    state = {};

    render() {
        const {collapsed} = this.state;
        return (
            <Layouts style={{minHeight: '100vh'}}>1234567</Layouts>
        );
    }
}

export {Home}