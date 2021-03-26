import React, {useState, useEffect, useCallback} from 'react';
import './about.scss';
import Layout from '../layout/layout';
import axios from "axios";
import {Table, Tag, Space, Input, Modal, Button} from 'antd';
import _ from "lodash"

const {Search} = Input;

const About = props => {
    let [id, changeId] = useState(props.id || 1)
    let [data, updateData] = useState([])
    let [cacheData, updateCacheData] = useState([])

    let columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a onClick={() => {
                console.log(text)
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

    const getList = useCallback(_.debounce(didCancel => {
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

    useEffect(() => {
        let didCancel = false
        getList(didCancel)
        return () => {
            didCancel = true
        }
    }, [getList])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <div className="spacing"></div>
            <Space>
                <Button type="primary" onClick={() => {
                    changeId(2)
                }}>获取数据</Button>
                <Search placeholder="input search name" onSearch={onSearch} enterButton/>
            </Space>
            <div className="spacing"></div>
            <Table columns={columns} dataSource={data}/>
        </Layout>
    );
}

export default About