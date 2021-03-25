import {createContext} from "react";

const AppContext = createContext({
    selectedKey: ['1'],
    changeSelect: (key) => {}
});

export default AppContext