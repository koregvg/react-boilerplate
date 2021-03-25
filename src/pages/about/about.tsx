import React, {useState, useEffect, useCallback} from 'react';
import './about.scss';
import Layout from '../layout/layout';
import axios from "axios";
import {Table, Tag, Space, Input} from 'antd';

const { Search } = Input;

const About = props => {
    let [id, changeId] = useState(props.id || 1)
    let [data, updateData] = useState([]);

    let columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
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

    const getList = useCallback(() => {
        axios.get(`/v2/getList/id=${id}`, {
        }).then(res => {
            updateData(res.data.data)
            console.log('api fetched')
        }).catch(err => {
            console.log(err)
        })
    }, [id])

    const onSearch = (id)=> {
        changeId(id)
    }

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Space direction="vertical">
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </Space>

            <Table columns={columns} dataSource={data} />
        </Layout>
    );
}

export default About