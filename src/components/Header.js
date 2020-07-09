import React from 'react';

export default ({ totals, formatNum }) => {

  	return (
	    <header className="header d-flex flex-row align-items-center justify-content-between w-100">
	    	<div className="d-flex"><h2>Coronavirus <strong>(COVID-19)</strong> dashboard - South Africa</h2></div>
	    	<div className="totals d-flex flex-row">
	    		<div>
	    			<strong>Confirmed:</strong><br />
	    			<span className="total-number">{formatNum(totals.confirmed)}</span>
	    		</div>
	    		<div>
	    			<strong>Active:</strong><br />
	    			<span className="total-number">{formatNum(totals.active)}</span>
	    		</div>
	    		<div>
	    			<strong>Recoveries:</strong><br />
	    			<span className="total-number">{formatNum(totals.recovered)}</span>
	    		</div>
	    		<div>
	    			<strong>Deaths:</strong><br />
	    			<span className="total-number">{formatNum(totals.deaths)}</span>
	    		</div>
	    	</div>
	    </header>
  	);
}