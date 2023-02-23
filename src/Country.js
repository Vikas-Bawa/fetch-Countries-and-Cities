import React from 'react'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function Country() {
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/capital').then((result) => {
            result.json().then((resp) => {
                setCountry(resp.data)
            })
        })
    }, [])

    const handleChange = (event) => {
        setSelectedCountry(event.target.value);
    }

    return (
        <div>
            <h1 className='bg-info'>Select your country</h1>
            <div className="container">
                <select className="form-select" onChange={handleChange} aria-label="Default select example">
                    <option>Select Country</option>
                    {country.map((cObj) => {
                        return (
                            <option value={cObj.name}>{cObj.name}</option>
                        )
                    })}
                </select>
                <button className='btn btn-primary mt-1' onClick={() => navigate(`/country/${selectedCountry}`)}>Click</button>
            </div>
        </div>
    )
}

export default Country
