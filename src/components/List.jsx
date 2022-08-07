import React, { useEffect, useState } from "react";

const List = ({ listArray }) => {
	const [items, setItems] = useState("");
	useEffect(() => {
		if (listArray !== undefined) {
			const NameArray = listArray.map((item) => {
				let itemName = item.name;
				return itemName;
			});
			const allItems = NameArray.join(", ");
			setItems(allItems);
		}
	}, [listArray]);
	return <span>{items}</span>;
};

export default List;
