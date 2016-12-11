
	// focus the search input field
	const suggestions = document.querySelector('.suggestions');
	const searchInput = document.querySelector('input.search');
	searchInput.focus();

	const cities = [];
	const data = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
	fetch(data)
		.then(blob => blob.json())
		.then(jblob => cities.push(...jblob));	//use spread attributes to push not the whole array but its elements
	console.log(cities);	

	function findMatches(wordToMatch, cities){
		return cities.filter(place => {
			const regex = new RegExp(wordToMatch, 'gi');	//'g' for global(doesn't stop on first match) and 'i' for case-insensitive
			console.log('findMatches');
			return place.city.match(regex) || place.state.match(regex)
		});
	}

	function numberWithCommas(x) {
	  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');	//...ddd,ddd,d
	}

	function displayMatches(){
		console.log('displayMatches');
		const matched = findMatches(this.value, cities);
		const html = matched.map(place => {
			const regex = new RegExp(this.value, 'gi');
			const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
			const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
			return `
					<li>
						<span class="name">${cityName}, ${stateName}</span>
						<span class="population">${numberWithCommas(place.population)}</span>
					</li>
				`
		}).join('');
		suggestions.innerHTML = html;
	}

	searchInput.addEventListener('change', displayMatches);
	searchInput.addEventListener('keyup', displayMatches);