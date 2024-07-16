import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const MenuSelect = React.forwardRef(({ children, ...rest }, ref) => {
    return (
		<div className="relative w-1/2 m-auto">
			<select className="appearance-none p-2 border border-black rounded text-2xl w-full" {...rest} ref={ref}>
				{children}
			</select>
			<IoIosArrowDropdownCircle className="absolute top-0 right-0 size-12 pointer-events-none"/>
		</div>
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
