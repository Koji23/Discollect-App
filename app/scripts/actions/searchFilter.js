const searchFilter = (data, kw, zip, cat) => {
	let output = data;
	if (kw) {
		let kwMatch = new RegExp(kw);
		output = output.filter((item) => {
			return item.title.toLowerCase().match(kwMatch);
		});
	}

	if (zip) {
		let zipMatch = new RegExp('^' + zip);
		output = output.filter((item) => {
			return String(item.zipcode).match(zipMatch);
		});
	}

	if(cat) {
		let catMatch = new RegExp(kw);
		if (cat !== 'all-categories' || cat === null) {
			output = output.filter((item) => {
				return item.category === cat;
			});
		}
	}
	return output;
}

module.exports = searchFilter;

