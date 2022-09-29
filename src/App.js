 import './App.css';
import Header from './Components/Header';
import {BrowserRouter ,Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Cart from './Components/Cart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
         
        <Route   path ='/' element={<Home/>} />
        
      

        <Route   path ='/cart'  element={<Cart/>} />
        
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
