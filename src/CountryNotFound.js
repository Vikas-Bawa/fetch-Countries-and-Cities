import React from 'react'
import { useNavigate } from 'react-router-dom'


function CountryNotFound() {
  const navigate = useNavigate();
  return (
    <div className='container bg-light p-5 m-5'>
      <p className='text-danger'>Please check the country name</p>
      <div><button className='btn btn-primary my-2' onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  )
}

export default CountryNotFound
