import React from 'react';
import './Table.css';

function Table({countries}) {

//note we are destructuring the object in the map function i.e. {country, cases} so we dont need to write out in long format like this: country.country
// note {country}, {cases} in the td tags means its in jsx
return (
    <div className="table">Table
    
    
   { countries.map(({country,cases}) => (
       <tr>
           <td>{country}</td>
           <td><strong>{cases}</strong></td>
       </tr>
 
   )

   ) }
    
    
    
    
    </div>


  )
}

export default Table