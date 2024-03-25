import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from './Pages/Login';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>          
            <Route path="/Register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
          </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;