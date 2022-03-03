import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({countries}) {

//note we are destructuring the object in the map function i.e. {country, cases} so we dont need to write out in long format like this: country.country
// note {country}, {cases} in the td tags means its in jsx
return (
    <div className="table"><table><tbody>
   { countries.map((country) => (
       <tr key={country.country}>
           <td>{country.country}</td>
           <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
       </tr>
   )
   ) }
   </tbody></table></div>


  );
}

export default Table;