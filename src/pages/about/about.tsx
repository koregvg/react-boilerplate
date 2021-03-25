import React, {useState, useEffect, useCallback} from 'react';
import './about.scss';
import Layout from '../layout/layout';
import axios from "axios";

const About = props => {
    let [state, updateState] = useState({
        id: 0,
        data: {
            a: 0
        }
    });

    const getList = useCallback(() => {
        axios.get(`/v2/getList/id=${state.id}`, {
            params: {
                a: 1
            }
        }).then(res => {
            updateState(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [state.id])

    useEffect(async () => {
        await getList()
        await console.log(state)
    }, [getList])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <div className="about">

            </div>
        </Layout>
    );
}

export default About