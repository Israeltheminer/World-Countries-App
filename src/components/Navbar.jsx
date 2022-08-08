import React, { useEffect } from "react";
import moon from "../assets/moon-icon.svg";
import sun from "../assets/sun-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeDisplay, setDisplay } from "../redux/displaySlice";

const Navbar = () => {
	const { display } = useSelector((state) => state.display);
	const dispatch = useDispatch();
	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	useEffect(() => {
		let displayCookie = getCookie("display");
		if (displayCookie === "dark") {
			dispatch(setDisplay(true));
		} else {
			dispatch(setDisplay(false));
		}
		console.log(displayCookie);
	}, [dispatch]);
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
