import React, { useState, useEffect } from 'react';
import timeseries from '../data/timeseries';

import Chart from './Chart';
import Header from './Header';
import Footer from './Footer';
import Countries from './Countries';
import FilterLog from './FilterLog';
import FilterType from './FilterType';
import FilterAlign from './FilterAlign';
import FilterSortBy from './FilterSortBy';
import FilterAllNone from './FilterAllNone';

export default () => {

	// Fix null recoveries in data
	Object.keys(timeseries).forEach(el => {
		let lastRecovered = 0;
		let country = timeseries[el];
		Object.keys(country).forEach(day => {
			if(country[day].recovered !== null) {
				lastRecovered = country[day].recovered;
			} else {
				country[day].recovered = lastRecovered;
			}
		});	
	});

	const [countries, setCountries] = useState(getCountries(timeseries));
	const [activeCountries, setActiveCountries] = useState(getActiveCountries(countries));
    const [numCountries, setNumCountries] = useState(0);
	const [filters, setFilters] = useState({
		sortby: 'confirmed',
		type: 'confirmed',
		align: true,
		scale: 'linear',
		linear: 10,
		log: [1, 2, 10, 20, 100, 200, 1000, 2000, 10000, 20000, 100000, 200000, 1000000],
	});
	const [data, setData] = useState(getDataForChart(timeseries, activeCountries, 'confirmed', !filters.align));
	let totals = getTotals(timeseries);

	useEffect(() => {
        setData(getDataForChart(timeseries, activeCountries, filters.type, !filters.align));

        let numC = 0;
        Object.keys(activeCountries).forEach(c => {
        	if(activeCountries[c]) {
        		numC++;
			}
        });

        setNumCountries(numC);
    }, [activeCountries, filters]);

	function formatNum(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function getTotals(timeseries) {
		let totals = {
			title: 'All Countries',
			confirmed: 0,
			deaths: 0,
			recovered: 0,
			active: 0
		};

		Object.keys(timeseries).forEach(el => {
			let country = timeseries[el];
			let lastIndex = country.length-1;
			totals['confirmed'] += country[lastIndex].confirmed;
			totals['deaths'] += country[lastIndex].deaths;
			totals['recovered'] += (country[lastIndex].recovered === null) ? country[lastIndex-1].recovered : country[lastIndex].recovered;
		});

		totals['active'] = totals['confirmed'] - totals['deaths'] - totals['recovered'];

		return totals;
	}

	function getDataForChart(timeseries, activeCountries, type, byDate) {
		let data = [];

		Object.keys(timeseries).forEach(el => {
			let dataArr = [];
			let country = timeseries[el];
			let day_count = 1;

			if(activeCountries[el]) {
				Object.keys(country).forEach(day => {

					if(byDate || country[day].confirmed > 0) {
						let stat = {
							confirmed: country[day].confirmed,
							deaths: country[day].deaths,
							recovered: country[day].recovered,
							active: (country[day].confirmed - country[day].deaths - country[day].recovered),
						};

						dataArr.push({
							'x': (byDate) ? country[day].date : 'Day '+day_count,
							'y': stat[type],
						});

						day_count++;
					}

				});

				data.push({
					'id': el,
					'data': dataArr
				});
			}
		});

		if(data.length === 0) {
			data = getAllCountriesData(timeseries, byDate);
		}

		return data;
	}

	function getAllCountriesData(timeseries, byDate) {
        let dataConfirmed = [];
        let dataActive = [];
        let dataRecoveries = [];
        let dataDeaths = [];
        let day_count = 1;

        // loop dates for any country to get all date indexes
        Object.keys(timeseries['China']).forEach(d => {
            let totalConfirmed = 0;
            let totalActive = 0;
            let totalRecoveries = 0;
            let totalDeaths = 0;

        	// loop countries
            Object.keys(timeseries).forEach(el => {
                totalConfirmed += timeseries[el][d]['confirmed'];
                totalActive += (timeseries[el][d]['confirmed'] - timeseries[el][d]['recovered'] - timeseries[el][d]['deaths']);
                totalRecoveries += timeseries[el][d]['recovered'];
                totalDeaths += timeseries[el][d]['deaths'];
            });

            dataConfirmed.push({ 'x': (byDate) ? timeseries['China'][d]['date'] : 'Day '+day_count, 'y': totalConfirmed });
            dataActive.push({ 'x': (byDate) ? timeseries['China'][d]['date'] : 'Day '+day_count, 'y': totalActive });
            dataRecoveries.push({ 'x': (byDate) ? timeseries['China'][d]['date'] : 'Day '+day_count, 'y': totalRecoveries });
            dataDeaths.push({ 'x': (byDate) ? timeseries['China'][d]['date'] : 'Day '+day_count, 'y': totalDeaths });

            day_count++;
        });

        let data = [{
            'id': 'Total Deaths',
            'data': dataDeaths
        },{
            'id': 'Total Active',
            'data': dataActive
        },{
            'id': 'Total Recoveries',
            'data': dataRecoveries,
            "color": "hsl(54,78%,72%)",
        },{
            'id': 'Total Confirmed',
            'data': dataConfirmed
        }];

        return data;
	}

	function getCountries(timeseries) {
		let countries = [];

		Object.keys(timeseries).forEach(el => {
			let country = timeseries[el];
			let lastIndex = country.length-1;
			let recovered = (country[lastIndex].recovered === null) ? country[lastIndex-1].recovered : country[lastIndex].recovered;
			if(recovered === null) { recovered = country[lastIndex-2].recovered; }
			if(recovered === null) { recovered = 0; }

			countries.push({
				title: el,
				confirmed: country[lastIndex].confirmed,
				deaths: country[lastIndex].deaths,
				recovered: recovered,
				active: (country[lastIndex].confirmed - country[lastIndex].deaths - recovered)
			});
		});

		//sort by confirmed, then title
		countries.sort((a, b) => (a.confirmed > b.confirmed) ? -1 : (a.confirmed === b.confirmed) ? ((a.title > b.title) ? 1 : -1) : 1 );

		return countries;
	}

	function getActiveCountries(countries) {
		let active = {};

		countries.forEach(el => {
            active[el.title] = false; // (el.title === 'Italy' || el.title === 'US' || el.title === 'Spain') ? true : false;
		});

		return active;
	}

	function handleCountryChange(e) {
		const target = e.target;
		const value = target.checked;
		const name = target.name;

		setActiveCountries(values => ({
            ...values,
            [name]: value,
        }));
	}

	function handleFilterSortBy(e) {
		const name = e.target.name;
		const value = e.target.value;
		let c;

		if(value === 'alphabetically') {
			c = countries.sort((a, b) => (a.title > b.title) ? 1 : -1);
		} else {
			c = countries.sort((a, b) => (a[value] > b[value]) ? -1 : (a[value] === b[value]) ? ((a.title > b.title) ? 1 : -1) : 1 );
		}

		setCountries(c);

		setFilters(values => ({
            ...values,
            [name]: value,
        }));
	}

	function handleFilter(e) {
		const target = e.target;
		let value = (target.type === 'checkbox') ? target.checked : target.value;
		const name = target.name;

		if(name === 'scale') {
			value = (value) ? 'log' : 'linear';
		}

		// only confirmed cases can have log scale
		if((name === 'type' && value !== 'confirmed') || (name === 'align' && value === false)) {
            setFilters(values => ({
                ...values,
				scale: 'linear',
                [name]: value,
            }));
		} else {
            setFilters(values => ({
                ...values,
                [name]: value,
            }));
		}
	}

	return (
		<div id="app">
			<div id="topbar" className="d-flex flex-row">
				<div className="left d-flex align-items-center">
					<a href="https://coronaviewer.com">
						<h1 className="title">Corona<strong>Viewer</strong></h1>
					</a>
				</div>
				<div className="right d-flex align-items-center">
					<Header totals={totals} formatNum={formatNum} />
				</div>
			</div>
			<div id="main" className="d-flex flex-row">
				<div className="left">
					<FilterSortBy filters={filters} handleFilterSortBy={handleFilterSortBy} />
					<FilterAllNone />
					<Countries countries={countries} filters={filters} activeCountries={activeCountries} handleCountryChange={handleCountryChange} />
				</div>
				<div className="right">
					<div className={numCountries === 0 ? 'disabled-all' : ''}>
						<div id="filters" className="d-flex align-items-center justify-content-between">
							<FilterType filters={filters} handleFilter={handleFilter} />
							<div className="d-flex flex-row justify-content-end">
								<FilterLog filters={filters} handleFilter={handleFilter} numCountries={numCountries} />
								<FilterAlign filters={filters} handleFilter={handleFilter} />
							</div>
						</div>
					</div>
					<div className="chart">
						<Chart data={data} filters={filters} />
					</div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
