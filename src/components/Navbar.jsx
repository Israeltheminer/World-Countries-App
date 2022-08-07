import React from "react";
import moon from "../assets/moon-icon.svg";

const Navbar = () => {
	return (
		<div className='px-[8%] py-6 flex justify-between items-center shadow-md bg-white'>
			<h1 className='text-[24px] font-bold'>Where in the world?</h1>
			<div className='flex gap-2 items-center cursor-pointer hover:text-[#858585]'>
				<img src={moon} alt='mode' />
				<p className='font-semibold'>Dark Mode</p>
			</div>
		</div>
	);
};

export default Navbar;
