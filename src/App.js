import './App.css';
import { BrowserRouter, Routes,Route, useNavigate } from 'react-router-dom';
import City from './City';
import Country from './Country';
import PageNotFound from './PageNotFound';
import CountryNotFound from './CountryNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Country/>}/>
          <Route path='country/:countryName' element={<City/>}/>
          <Route path='country/countryNotFound' element={<CountryNotFound/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
