import React from "react";

const MenuSelect = React.forwardRef(({ children, ...rest }, ref) => {
    return (
        <select {...rest} ref={ref}>
            {children}
        </select>
    );
});

MenuSelect.displayName = "MenuSelect";

export const MenuOption = ({ value, children, ...rest }) => {
    return (
        <option value={value} {...rest}>
            {children}
        </option>
    );
};

export default MenuSelect;
