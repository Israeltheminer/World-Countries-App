import React, { useCallback, useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import Navbar from "./components/Navbar"
import axios from "axios"
import leftIcon from "./assets/left-icon.svg"
import rightIcon from "./assets/right-icon.svg"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { setCategory, setSearchValue } from "./redux/previousDataSlice"
import { setRefetch } from "./redux/refetchSlice"
import { setPage } from "./redux/pageSlice"

const client = axios.create({
	baseURL: "https://restcountries.com/v2/all",
})

function App() {
	const [data, setData] = useState([])
	const [filterInput, setFilterInput] = useState("")
	const [countries, setCountries] = useState([])
	const [regionFilterDiplay, setRegionFilterDiplay] = useState(false)

	const { refetch } = useSelector((state) => state.refetch)
	const { display } = useSelector((state) => state.display)
	const { previousData } = useSelector((state) => state.previousData)
	const { page } = useSelector((state) => state.page)

	const dispatch = useDispatch()

	const { category, searchValue } = previousData

	const allCountries = {
		hidden: {
			y: 1500,
		},
		visible: {
			y: 0,
			transition: {
				type: "spring",
				delay: 0.5,
				duration: 2,
				when: "beforeChildren",
			},
		},
	}
	const singleCountry = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			staggerChildren: 0.5,
		},
	}

	const fetchAllCountries = useCallback(() => {
		axios.get(`https://restcountries.com/v2/all`).then((response) => {
			setData(response.data)
		})
		dispatch(setCategory("ALL"))
		if (refetch) {
			dispatch(setPage(1))
		}
	}, [refetch, dispatch])
	const fetchFilteredCountries = useCallback(
		(name) => {
			axios.get(`https://restcountries.com/v2/name/${name}`).then((response) => {
				setData(response.data)
			})
			dispatch(setCategory("NAME"))
			dispatch(setSearchValue(name))
			if (refetch) {
				dispatch(setPage(1))
			}
		},
		[refetch, dispatch]
	)
	const fetchFilteredCountriesByRegion = useCallback(
		(region, reset) => {
			axios.get(`https://restcountries.com/v2/region/${region}`).then((response) => {
				setData(response.data)
			})
			dispatch(setCategory("REGION"))
			dispatch(setSearchValue(region))
			setRegionFilterDiplay(false)
			if (refetch) {
				dispatch(setPage(1))
			} else if (reset) {
				dispatch(setRefetch(true))
				dispatch(setPage(1))
			}
		},
		[refetch, dispatch]
	)
	const totalPages = Math.ceil(data.length / 12)

	useEffect(() => {
		if (refetch && category === "ALL") {
			client.get("?_limit=10").then((response) => {
				setData(response.data)
			})
			dispatch(setPage(1))
		} else {
			if (category === "NAME") {
				fetchFilteredCountries(searchValue)
			} else if (category === "REGION") {
				fetchFilteredCountriesByRegion(searchValue)
			} else {
				fetchAllCountries()
			}
		}
	}, [
		fetchAllCountries,
		fetchFilteredCountries,
		fetchFilteredCountriesByRegion,
		refetch,
		searchValue,
		category,
		dispatch,
	])
	useEffect(() => {
		const firstDisplay = data.filter((_, index) => index < 12)
		setCountries(firstDisplay)
	}, [data])
	useEffect(() => {
		const startDisplay = 12 * page - 12
		const finishDisplay = 12 * page - 1
		const pageDisplay = data.filter((_, index) => index >= startDisplay && index <= finishDisplay)
		setCountries(pageDisplay)
	}, [data, page])
	return (
		<div className={`App ${display ? "dark-mode-bg" : "light-mode-bg"} min-h-screen`}>
			<Navbar />
			<div className='px-[8%] py-12 xs:px-[5%]'>
				<div className='flex justify-between items-start flex-wrap mb-6'>
					<form
						className='relative mb-12 md:w-full md:mb-4'
						onSubmit={(e) => {
							e.preventDefault()
							if (filterInput) {
								fetchFilteredCountries(filterInput)
								setFilterInput("")
								dispatch(setPage(1))
							} else {
								fetchAllCountries()
								setFilterInput("")
								dispatch(setPage(1))
								dispatch(setCategory("ALL"))
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
								e.preventDefault()
								setFilterInput(e.target.value)
							}}
						/>
					</form>
					<div className={`relative  transition ease-in-out md:w-full select-none`}>
						<div
							className={`min-w-[200px] h-[50px] rounded-md items-center px-6 flex item-center justify-between text-[14px] text-[#616161] bg-white mb-1 shadow-sm cursor-default ${
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
							className={`w-full absolute bg-white grid z-20 left-0 top-[60px] text-[#676768] drop-shadow-md rounded-md p-1 ${
								display && "dark-mode-element"
							} ${!regionFilterDiplay && "hide-filter"}`}>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("africa", true)}>
								Africa
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("americas", true)}>
								America
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("asia", true)}>
								Asia
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("europe", true)}>
								Europe
							</span>
							<span
								className='font-semibold cursor-pointer transition-colors ease-in-out hover:text-black py-[10px] px-6 hover:bg-[#d7d7d8] rounded-sm'
								onClick={() => fetchFilteredCountriesByRegion("oceania", true)}>
								Oceania
							</span>
						</div>
					</div>
				</div>
				<motion.div
					className='grid grid-cols-4 gap-x-8 gap-y-12 text-black lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
					variants={allCountries}
					animate='visible'
					initial='hidden'>
					{countries.map((country, index) => {
						return (
							<motion.div
								className={`bg-white rounded-md pb-2 shadow-sm hover:shadow-lg hover:scale-110 cursor-pointer transition-transform ease-in-out delay-100 ${
									display && "dark-mode-element"
								}`}
								variants={singleCountry}
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
							</motion.div>
						)
					})}
				</motion.div>
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
										dispatch(setPage(page - 1))
										document.cookie = `page=${page - 1}`
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
										dispatch(setPage(page + 1))
										document.cookie = `page=${page + 1}`
									}
								}}
							/>
						)}
					</div>
				)}
			</div>
			<Outlet />
		</div>
	)
}

export default App
