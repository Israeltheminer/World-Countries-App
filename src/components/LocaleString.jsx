import React, { useEffect, useState } from "react";

const LocaleString = ({ number }) => {
	const [item, setItem] = useState("");
	useEffect(() => {
		if (number !== undefined) {
			const localeString = number.toLocaleString();
			setItem(localeString);
		}
	}, [number]);
	return <span>{item}</span>;
};

export default LocaleString;
