import React from 'react';

export default ({ handleFilter, filters }) => {

  return (
    <div id="filter_type">
    	<label>
    		<input name="type" value="confirmed" checked={filters.type === 'confirmed'} onChange={handleFilter} type="radio" className="mr-1" />
    		Confirmed
    	</label>
    	<label>
    		<input name="type" value="active" checked={filters.type === 'active'} onChange={handleFilter} type="radio" className="mr-1" />
    		Active
    	</label>
    	<label>
    		<input name="type" value="recovered" checked={filters.type === 'recovered'} onChange={handleFilter} type="radio" className="mr-1" />
    		Recoveries
    	</label>
    	<label>
    		<input name="type" value="deaths" checked={filters.type === 'deaths'} onChange={handleFilter} type="radio" className="mr-1" />
    		Deaths
    	</label>
    </div>
  );
}
