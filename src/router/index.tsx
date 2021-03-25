import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import AsyncRouter, {RouterHooks} from '../common/js/asyncRouter'

const Home = AsyncRouter(() => import('../pages/home'))
const About = AsyncRouter(() => import('../pages/about'))

const {beforeRouterComponentLoad} = RouterHooks

const routerConfig = () => {
    useEffect(() => {
        /* 增加监听函数 */
        beforeRouterComponentLoad((history) => {
            console.log('当前激活的路由是', history.location.pathname)
        })
    },        [])
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/*" component={Home}></Route>
            </Switch>
        </Router>
    )
}

export default routerConfig