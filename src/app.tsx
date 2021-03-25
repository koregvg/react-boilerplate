import React from "react";
import AppContext from './appContext'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKey: ['1'],
            changeSelect: this.changeSelect
        }
    }

    changeSelect = key => {
        this.setState(state => ({
            selectedKey: key
        }))
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default App