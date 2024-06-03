import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Register from './Pages/Login';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import FeedBack from './Pages/FeedBack';
import { store } from './Redux/store.js';
import History from './Pages/History/index.js';
import DetailSentiment from './Pages/DetailSentiment/index.js';
import InputURL from './Pages/InputURL/index.js';
import DetailFilesSentiment from './Pages/DetailFileSentiment/index.js';

function App() {
  const user = store.getState().auth.login.currentUser;
  return (
    <BrowserRouter>
      <div className="App">
         <Routes>          
            <Route path="/Register" element={<Register/>}/>
            <Route path="/" element={user?<Home/>:<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/History" element={user?<History/>:<Home/>}/>
            <Route path="/Profile" element={user?<Profile/>:<Home/>}/>
            <Route path="/FeedBack" element={user?<FeedBack/>:<Home/>}/>
            <Route path="/Details" element={user?<DetailSentiment/>:<Home/>}/>
            <Route path="/DetailsFiles" element={user?<DetailFilesSentiment/>:<Home/>}/>
            <Route path="/InputURL" element={user?<InputURL/>:<Home/>}/>
          </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;