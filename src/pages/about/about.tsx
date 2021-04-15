import React, {useState, useEffect, useCallback} from 'react';
import './about.scss';
import {Layouts} from '../layout/layout';
import axios from "axios";
import {Table, Tag, Space, Input, Modal, Button} from 'antd';
import {debounce} from "lodash-es"

const {Search} = Input;

const About = props => {
    let [id, changeId] = useState(props.id || 1)
    let [data, updateData] = useState([])
    let [cacheData, updateCacheData] = useState([])
    let [isModalVisible, setIsModalVisible] = useState(false);
    let name = ''
    const [, updateState] = useState();
    const forceUpdate = () => updateState({});

    let columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a onClick={() => {
                showModal(text)
            }}>{text}</a>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const getList = useCallback(debounce(didCancel => {
        axios.get(`/v2/getList/id=${id}`, {}).then(res => {
            if (!didCancel) {
                updateData(res.data.data)
                updateCacheData(res.data.data)
                console.log('Api Fetched')
            }
        }).catch(err => {
            console.log(err)
        })
    }, 1000), [id])

    const onSearch = name => {
        console.log(cacheData)
        const searchData = cacheData.filter(item => {
            return item.name.indexOf(name) >= 0
        })
        updateData(searchData)
    }

    const showModal = (text) => {
        setIsModalVisible(true);
        name = text
        forceUpdate()
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        let didCancel = false
        getList(didCancel)
        return () => {
            didCancel = true
        }
    }, [getList])

    return (
        <Layouts style={{minHeight: '100vh'}}>
            <div className="spacing"></div>
            <Space>
                React.memo(<Button type="primary" onClick={() => {
                changeId(2)
            }}>获取数据</Button>)
                <Search placeholder="input search name" onSearch={onSearch} enterButton/>
            </Space>
            <div className="spacing"></div>
            React.memo(<Table columns={columns} dataSource={data}/>)
            React.memo(<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>姓名为：{data}</p>
                <p>{name}</p>
            </Modal>)
        </Layouts>
    );
}

export {About}