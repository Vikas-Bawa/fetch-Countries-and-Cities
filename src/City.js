import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function City() {
  let { countryName } = useParams();
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('Fetching data Please Wait...')
  const navigate = useNavigate();

  useEffect(()=>{
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      body: JSON.stringify({
        country: countryName
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((resp) => setCities(resp.data))
      .catch(err => {
        return (
          setState('Error: Cities Not found')
        )
})
  },[])

  function displayCities(){
    return cities.map((cityName)=>{return <p>{cityName}</p>})
  }
  function displayError(){
    return setState('Error: Cities not found')
  }

    console.log('countryName : ')
    console.log('cities : ' + cities);
  return (
    <div>
      <h2>Country: {countryName}</h2>
      <h3>Cities Names</h3>
      <button  className='btn btn-primary mt-1' onClick={()=>navigate('/')}>Back</button>
      {(cities.length)?displayCities():<p>{state}</p>}

      {/* {(cities.length)?cities.map((cityName)=>{return <p>{cityName}</p>}):<p>{state}</p>} */}
    </div>
  )
}

export default City
