import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import leftIcon from "./assets/left-icon.svg";
import rightIcon from "./assets/right-icon.svg";
import { useSelector } from "react-redux";

const client = axios.create({
	baseURL: "https://restcountries.com/v2/all",
});

function App() {
	const [data, setData] = useState([]);
	const [filterInput, setFilterInput] = useState("");
	const [page, setPage] = useState(1);
	const [countries, setCountries] = useState([]);
	const [regionFilterDiplay, setRegionFilterDiplay] = useState(false);
	const { display } = useSelector((state) => state.display);
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
	const fetchFilteredCountriesByRegion = (region) => {
		axios.get(`https://restcountries.com/v2/region/${region}`).then((response) => {
			setData(response.data);
			setRegionFilterDiplay(false);
		});
	};
	const totalPages = Math.ceil(data.length / 12);
	return (
		<div className={`App ${display ? "dark-mode-bg" : "light-mode-bg"} min-h-screen`}>
			<Navbar />
			<div className='px-[8%] py-12 xs:px-[5%]'>
				<div className='flex justify-between items-start flex-wrap mb-6'>
					<form
						className='relative mb-12 md:w-full md:mb-4'
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
							className={`min-w-[500px] h-[50px] rounded-md shadow-md outline-none pl-16 filter-Input md:w-full md:min-w-[100%] ${
								display
									? "dark-mode-element dark-mode-placeholder"
									: "light-mode-placeholder"
							}`}
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
					<div
						className={`relative  transition ease-in-out md:w-full`}>
						<div
							className={`min-w-[200px] h-[50px] transition ease-in-out rounded-md items-center px-6 flex item-center justify-between text-[14px] text-[#616161] bg-white mb-1 shadow-sm cursor-default ${
								display && "dark-mode-element"
							}`}>
							<span className='font-semibold'>Filter by Region</span>
							<img
								loading='lazy'
								src={rightIcon}
								alt={`downdrop`}
								className={`h-[14px] cursor-pointer hover:scale-150 ${
									regionFilterDiplay && "rotate-90"
								} transition-transform ease-in-out ${display && "fill-white"}`}
								onClick={() => setRegionFilterDiplay((prev) => !prev)}
							/>
						</div>
						<div
							className={`w-full absolute bg-white grid z-20 transition ease-in-out left-0 top-[60px] text-[#676768] drop-shadow-md rounded-md p-1 ${
								display && "dark-mode-element"
							} ${!regionFilterDiplay && "hide-filter"}`}>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("africa")}>
								Africa
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("americas")}>
								America
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("asia")}>
								Asia
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("europe")}>
								Europe
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("oceania")}>
								Oceania
							</span>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-x-8 gap-y-12 text-black lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
					{countries.map((country, index) => {
						return (
							<div
								className={`bg-white rounded-md pb-2 shadow-sm hover:shadow-lg hover:scale-110 cursor-pointer transition-transform ease-in-out delay-100 ${
									display && "dark-mode-element"
								}`}
								key={index}>
								<Link to={country.alpha3Code}>
									<div className=''>
										<img
											loading='lazy'
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
								</Link>
							</div>
						);
					})}
				</div>
				{data.length > 12 && (
					<div className='flex justify-center items-center pt-16 pb-4 gap-3 text-[19px] font-bold'>
						{page > 1 && (
							<img
								loading='lazy'
								src={leftIcon}
								alt='left'
								className='h-5 hover:h-6 cursor-pointer animate-bounce'
								onClick={() => {
									if (page > 1) {
										setPage((prev) => (prev -= 1));
									}
								}}
							/>
						)}
						<button>{page}</button>
						{page < totalPages && (
							<img
								loading='lazy'
								src={rightIcon}
								alt='right'
								className='h-5 hover:h-6 cursor-pointer animate-bounce'
								onClick={() => {
									if (page < totalPages) {
										setPage((prev) => (prev += 1));
									}
								}}
							/>
						)}
					</div>
				)}
			</div>
			<Outlet />
		</div>
	);
}

export default App;
