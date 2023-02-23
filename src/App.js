import './App.css';
import { BrowserRouter, Routes,Route, useNavigate } from 'react-router-dom';
import City from './City';
import Country from './Country';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Country/>}/>
          <Route path='country/:countryName' element={<City/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
