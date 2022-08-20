import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import List from "../components/List";
import LocaleString from "../components/LocaleString";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setRefetch } from "../redux/refetchSlice";

const CountryPage = () => {
	const [country, setCountry] = useState({});
	const { countryId } = useParams();
	const { display } = useSelector((state) => state.display);
	useEffect(() => {
		axios.get(`https://restcountries.com/v2/alpha/${countryId}`).then((response) => {
			setCountry(response.data);
		});
	}, [countryId]);
	const [imageLoading, setImageLoading] = useState(true);
	const [pulsing, setPulsing] = useState(true);
	const dispatch = useDispatch()
	const imageLoaded = () => {
		setImageLoading(false);
		setTimeout(() => setPulsing(false), 600);
	};
	return (
		<div className={`Country-Page min-h-[100vh] ${display && "dark-mode-bg"} overflow-x-clip`}>
			<Navbar />
			<div className={`px-[8%] py-12 sm:pt-8`}>
				<div className='mt-6 mb-20 sm:mt-0 sm:mb-10'>
					<Link to='/'>
						<button
							className={`py-2 pl-[70px] pr-10 font-semibold rounded-md hover:shadow-md back-button ${
								display ? "dark-mode-element dark-back-button" : "light-back-button"
							}`}
							onClick={() => dispatch(setRefetch(false))}>
							Back
						</button>
					</Link>
				</div>
				<div className='flex gap-14 mb-10 flex-wrap'>
					<motion.div
						initial={{
							x: -1000,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 100,
						}}
						transition={{
							type: "spring",
							duration: 2,
							when: "beforeChildren",
						}}
						className={`${pulsing ? "pulse" : ""} loadable`}
						style={{ width: `${imageLoading ? "30rem" : "auto"}` }}>
						<motion.img
							initial={{ height: "10rem", opacity: 0 }}
							animate={{
								height: imageLoading ? "10rem" : "auto",
								opacity: imageLoading ? 0 : 1,
							}}
							onLoad={imageLoaded}
							loading='lazy'
							src={country.flag}
							alt={`${countryId}-flag`}
							className='inline shadow-md mx-auto min-w-[280px] max-w-[500px]'
						/>
					</motion.div>
					<motion.div
						className='py-10 mx-auto'
						initial={{ x: 1000 }}
						animate={{ x: 0 }}
						transition={{
							type: "spring",
							duration: 2,
						}}>
						<h1 className='text-3xl font-semibold mb-6'>{country.name}</h1>
						<div className='flex flex-wrap items-start justify-between'>
							<ul className='country-list mr-12'>
								<li>
									<span className='font-semibold'>Native Name: </span>
									{country.name}
								</li>
								<li>
									<span className='font-semibold'>Population: </span>
									<LocaleString number={country.population} />
								</li>
								<li>
									<span className='font-semibold'>Region: </span>
									{country.region}
								</li>
								<li>
									<span className='font-semibold'>Sub Region: </span>
									{country.subregion}
								</li>
								<li>
									<span className='font-semibold'>Capital: </span>
									{country.capital}
								</li>
							</ul>
							<ul className='country-list'>
								<li>
									<span className='font-semibold'>Top Level Domain: </span>
									{country.topLevelDomain}
								</li>
								<li>
									<span className='font-semibold'>Currencies: </span>
									<List listArray={country.currencies} />
								</li>
								<li>
									<span className='font-semibold'>Languages: </span>
									<List listArray={country.languages} />
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default CountryPage;
