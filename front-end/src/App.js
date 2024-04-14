import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from './Pages/Login';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import FeedBack from './Pages/FeedBack';
import { store } from './Redux/store.js';

function App() {
  const user = store.getState().auth.login.currentUser;
  console.log(user)
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>          
            <Route path="/Register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Profile" element={user?<Profile/>:<Home/>}/>
            <Route path="/FeedBack" element={user?<FeedBack/>:<Home/>}/>
            
          </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;