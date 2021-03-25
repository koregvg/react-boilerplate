import {Menu} from 'antd';
import React, {useContext} from 'react';
import {withRouter} from "react-router-dom";
import './menus.scss'
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import AppContext from '../../../appContext'

const {SubMenu} = Menu;

const Menus = (props) => {

    const {selectedKey, changeSelect} = useContext(AppContext)

    const go = (key) => {
        changeSelect([key])
        props.history.push({pathname: '/about', state: {key: '2'}})
    }
    return (
        <div style={{width: '100%'}} className='menus'>
            <Menu
                theme="dark"
                defaultSelectedKeys={selectedKey}
                mode="inline"
            >
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    主页
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={() => {
                    go('2')
                }}>
                    关于我们
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="用户">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="团队">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    文件
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default withRouter(Menus)