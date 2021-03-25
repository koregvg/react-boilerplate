import React from "react";

export default (Consumer) => {
    return WrappedComponent => {
        const Component = props => (<Consumer>
            {
                value => {
                    return <WrappedComponent {...props} contextValue={value}/>
                }
            }
        </Consumer>);
        Component.displayName = `connect(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
        return Component;
    }
};