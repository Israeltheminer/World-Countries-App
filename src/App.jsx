import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import leftIcon from "./assets/left-icon.svg";
import rightIcon from "./assets/right-icon.svg";

const client = axios.create({
	baseURL: "https://restcountries.com/v2/all",
});

function App() {
	const [data, setData] = useState([]);
	const [filterInput, setFilterInput] = useState("");
	const [page, setPage] = useState(1);
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		client.get("?_limit=10").then((response) => {
			setData(response.data);
		});
	}, []);
	useEffect(() => {
		const firstDisplay = data.filter((_, index) => index < 12);
		setCountries(firstDisplay);
	}, [data]);
	useEffect(() => {
		const startDisplay = 12 * page - 12;
		const finishDisplay = 12 * page - 1;
		const pageDisplay = data.filter(
			(_, index) => index >= startDisplay && index <= finishDisplay
		);
		setCountries(pageDisplay);
	}, [data, page]);
	const fetchAllCountries = () => {
		axios.get(`https://restcountries.com/v2/all`).then((response) => {
			setData(response.data);
		});
	};
	const fetchFilteredCountries = (name) => {
		axios.get(`https://restcountries.com/v2/name/${name}`).then((response) => {
			setData(response.data);
		});
	};
	const totalPages = Math.ceil(data.length / 12);
	return (
		<div className='App'>
			<Navbar />
			<div className='px-[8%] py-12'>
				<div className='flex justify-between items-start'>
					<form
						className='relative mb-12'
						onSubmit={(e) => {
							e.preventDefault();
							if (filterInput) {
								fetchFilteredCountries(filterInput);
								setFilterInput("");
								setPage(1);
							} else {
								fetchAllCountries();
								setFilterInput("");
								setPage(1);
							}
						}}>
						<input
							className='min-w-[500px] h-[50px] rounded-md shadow-md outline-none pl-16 filter-Input'
							type='text'
							name='filter'
							id='filterInput'
							placeholder='Search for a country...'
							value={filterInput}
							autoComplete='off'
							onChange={(e) => {
								e.preventDefault();
								setFilterInput(e.target.value);
							}}
						/>
					</form>
					<div className='relative'>
						<div className='min-w-[200px] h-[50px] rounded-md items-center px-6 flex item-center justify-between text-[14px] text-[#616161] bg-white mb-1'>
							<span className='font-semibold'>Filter by Region</span>
							<img src={rightIcon} alt={`downdrop`} className='h-[14px] cursor-pointer' />
						</div>
						<div className='w-full absolute bg-white px-6 py-4 grid gap-[10px] z-20 left-0 top-[60px] text-[#616161]'>
							<span className='font-semibold cursor-pointer hover:text-black'>Africa</span>
							<span className='font-semibold cursor-pointer hover:text-black'>America</span>
							<span className='font-semibold cursor-pointer hover:text-black'>Asia</span>
							<span className='font-semibold cursor-pointer hover:text-black'>Europa</span>
							<span className='font-semibold cursor-pointer hover:text-black'>Oceania</span>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-x-8 gap-y-12 text-black'>
					{countries.map((country, index) => {
						return (
							<div
								className='bg-white rounded-md pb-2 shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer'
								key={index}>
								<div className=''>
									<img
										src={country.flag}
										alt={`${country.name} flag`}
										className='rounded-t-md w-full aspect-video'
									/>
								</div>
								<div className='p-6'>
									<h1 className='text-xl font-bold mb-2'>{country.name}</h1>
									<div className='grid gap-1'>
										<p>
											<span className='font-semibold'>Population: </span>
											{country.population.toLocaleString()}
										</p>
										<p>
											<span className='font-semibold'>Region: </span>
											{country.region}
										</p>
										<p>
											<span className='font-semibold'>Capital: </span>
											{country.capital}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{data.length > 12 && (
					<div className='flex justify-center items-center pt-12 pb-4 gap-3 text-[18px] font-semibold'>
						<img
							src={leftIcon}
							alt='left'
							className='h-4 hover:h-5 cursor-pointer'
							onClick={() => {
								if (page > 1) {
									setPage((prev) => (prev -= 1));
								}
							}}
						/>
						<button>{page}</button>
						<img
							src={rightIcon}
							alt='right'
							className='h-4 fill-[#616161] hover:h-5 cursor-pointer'
							onClick={() => {
								if (page < totalPages) {
									setPage((prev) => (prev += 1));
								}
							}}
						/>
					</div>
				)}
			</div>
			<Outlet />
		</div>
	);
}

export default App;
