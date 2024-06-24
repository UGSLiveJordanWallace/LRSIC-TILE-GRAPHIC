import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineArrowUp,
} from "react-icons/ai";

const Tile = ({ name, direction, color, ...rest }) => {
    return (
		<div
			{...rest}
			className={"inline-block overflow-hidden size-16 border border-black text-center font-bold text-xs mobile:text-base mobile:size-24"}
			style={{backgroundColor: color}}
		>
			<h3>{name}</h3>
			{direction === "left" && <AiOutlineArrowLeft className="m-auto size-8"/>}
			{direction === "right" && <AiOutlineArrowRight className="m-auto size-8"/>}
			{direction === "up" && <AiOutlineArrowUp className="m-auto size-8"/>}
		</div>
    );
};

export const EmptyTile = ({ color, ...rest }) => {
    return (
		<div
			{...rest}
			className={`inline-block size-16 border border-black mobile:size-24`}
			style={{backgroundColor: color}}
		></div>
    );
};

export default Tile;
