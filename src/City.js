import React, { useEffect, useState,useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageNotFound from './PageNotFound';
import debounce from 'lodash.debounce';

function City() {
  let { countryName } = useParams();
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('Fetching data Please Wait...')
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  var responseStatus;


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
      .then((response) => {
        if (response.status == 404) {
          // alert('Please check the Country name again...')
          navigate('/country/countryNotFound')
        }

        return response.json()
      })
      .then((resp) => setCities(resp.data))
      .catch(err => {
        return (
          setError('Error: Cities Not found')
        )
      })
  }, [])
  console.log('responseStatus after ' + responseStatus);

  function displayAllCities() {
    return cities.map((cityName) => { return <p className='col-8 p-3 w-50 border border-info bg-light rounded-pill'>{cityName}</p> })
  }

  const searchCity = (e) => {
    setQuery((e.target.value).trim())
  }

  function displaySearchedCities(e) {
    const copyOfCities = cities.filter((cityName) => cityName.toLowerCase().includes(query.toLowerCase()));
    if (copyOfCities.length === 0) {
      return <p>Cities not found</p>
    }
    else {
      return copyOfCities.map((cityName) => {
        return <p className='col-8 p-3 w-50   border border-info bg-light rounded-pill'>{cityName}</p>
      })
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce(searchCity, 1000);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });


  return (
    <div className='container my-3  d-flex flex-column alignn-items-center'>
      <h2>Country: {countryName}</h2>

      <div className="d-flex">
        <div className="input-group border mb-3 d-flex flex-row">
          <input type='search' id='inputSearchCity' className="form-control" onChange={debouncedResults} placeholder="Search City" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <i class="bi bi-search py-2 px-3"></i>
        </div>
        <div><button className='btn btn-primary mx-3 pt-2' onClick={() => navigate('/')}>Back</button>
        </div>
      </div>

      <h3>Cities Names</h3>
      <div className="d-flex flex-column align-items-center">
        {(query !== '') ?
          displaySearchedCities()
          : ((cities.length) ? displayAllCities() : <p>{error}</p>)}
      </div>
    </div>
  )
}

export default City
