import React from 'react';
import './home.scss';
import Layout from '../layout/layout'

class Home extends React.Component {
    state = {};

    render() {
        const {collapsed} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>1234567</Layout>
        );
    }
}

export default Home