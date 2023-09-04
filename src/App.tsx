import './App.css'
import { Routes, Route } from 'react-router-dom';
import { BasePage } from './pages/BasePage';
import { FormRegisterVehicle } from './pages/form/FormeRegisterVehicle';
import { Principal } from './pages/principal/Principal';


function App() {

  return (
    <Routes>
      <Route path='/admin' element={<BasePage />}>
        <Route path='veiculos' element={<Principal />}/>
        <Route path-='veiculos/novo' element={<FormRegisterVehicle />}/>
      </Route>
    </Routes>
  )
}

export default App
