import React from 'react';

export default ({ countries, activeCountries, handleCountryChange, filters }) => {

	function renderNumber(filters, confirmed, active, recovered, deaths) {
		let num = 0;
		let suffix = '';

		switch(filters.sortby) {
			case 'alphabetically':
				num = confirmed;
				break;
			case 'confirmed':
				num = confirmed;
				break;
			case 'active':
				num = active;
				suffix = ' active';
				break;
			case 'recovered':
				num = recovered;
				suffix = ' recovered';
				break;
			case 'deaths':
				num = deaths;
				suffix = ' deaths';
				break;
			default:
				break;
		}
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
	}

	return (
		<div>
			<ul id="countries" className="my-3">
				<p className="mb-1"><strong>Select Provinces:</strong></p>
				{countries !== false && countries.map(
					({ title, confirmed, active, recovered, deaths }) => (
						<li key={title} className="d-flex align-items-center">
							<label>
								<input name={title} onChange={handleCountryChange} checked={activeCountries[title]} type="checkbox" className="mr-2" />
								<strong>{title}</strong> ({renderNumber(filters, confirmed, active, recovered, deaths)})
							</label>
						</li>
					)
				)}
			</ul>
			<p><small>Visit <a href="https://coronaviewer.com/" target="_blank">CoronaViewer.com</a> for world stats</small></p>
		</div>
	);
}