import React from "react";
import moon from "../assets/moon-icon.svg";
import sun from "../assets/sun-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeDisplay } from "../redux/displaySlice";

const Navbar = () => {
	const { display } = useSelector((state) => state.display);
	const dispatch = useDispatch();
	return (
		<div
			className={`px-[8%] py-6 flex justify-between items-center shadow-md flex-wrap xs:px-[5%] ${
				display ? "dark-mode-element" : "bg-white"
			}`}>
			<h1 className='text-[24px] font-bold sm:text-[20px] xs:text-[18px]'>
				Where in the world?
			</h1>
			<div
				className='flex gap-2 items-center cursor-pointer hover:text-[#858585] hover:animate-pulse xs:text-[14px] ml-auto'
				onClick={() => dispatch(changeDisplay())}>
				<img
					loading='lazy'
					src={display ? sun : moon}
					alt='mode'
					className={display ? "w-[20px]" : "w-[20px]"}
				/>
				<p className='font-semibold'>{display ? "Light Mode" : "Dark Mode"}</p>
			</div>
		</div>
	);
};

export default Navbar;
