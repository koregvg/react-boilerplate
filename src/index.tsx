import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'normalize.css';
import Route from "./router";
import App from './app';

import mock from '@src/common/js/mock';
mock()

const render = Component => {
    ReactDOM.render(
        <App>
            <Component />
        </App>,
        document.getElementById("root")
    )
}

render(Route)