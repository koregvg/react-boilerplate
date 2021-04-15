import React from 'react';
import './layout.scss';

import {Layout} from 'antd';
import Menus from './components/menus'

const {Header, Content, Sider} = Layout;

class Layouts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }

    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        const {collapsed} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header>
                    <div className="header">
                        react 练手系统
                    </div>
                </Header>
                <Layout className="site-layout">
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menus collapsed={collapsed}/>
                    </Sider>
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export {Layouts}