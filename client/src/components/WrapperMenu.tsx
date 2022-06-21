import React from "react";
import MenuComponent from "./MenuComponent";

function WrapperMenu({ children }) {
    return (
        <div>
            <MenuComponent />
            {children}
        </div>
    );
}

export default WrapperMenu;
