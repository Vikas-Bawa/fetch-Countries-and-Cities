import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function City() {
  let { countryName } = useParams();
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('Fetching data Please Wait...')
  const [query, setQuery] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
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
          setError('Error: Cities Not found')
        )
      })
  }, [])

  function displayAllCities() {
    return cities.map((cityName) => { return <p className='col-8 p-3 w-50 border border-info bg-light rounded-pill'>{cityName}</p> })
  }

  function searchCity(e) {
    setQuery(e.target.value)
  }

  function displaySearchedCities(e) {
    const copyOfCities = cities.filter((cityName) => cityName.toLowerCase().includes(query.toLowerCase()));
    return copyOfCities.map((cityName) => { 
      return <p className='col-8 p-3 w-50   border border-info bg-light rounded-pill'>{cityName}</p> })
  }

  return (
    <div className='container my-3  d-flex flex-column alignn-items-center'>
      <h2>Country: {countryName}</h2>
      <h3>Cities Names</h3>
      <div><button className='btn btn-primary my-2' onClick={() => navigate('/')}>Back</button>
      </div>
      <div className="input-group mb-3 d-flex flex-row">
        <input type='search' className="form-control" onChange={(e) => searchCity(e)} placeholder="Search city" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
      <div className="d-flex flex-column align-items-center">
        {(query !== '') ?
          displaySearchedCities()
          : ((cities.length) ? displayAllCities() : <p>{error}</p>)}
      </div>
    </div>
  )
}

export default City
