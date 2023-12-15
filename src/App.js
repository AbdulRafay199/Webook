import Home from './components/Home';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Friendstate from './Context/Friendstate';
import Poststate from './Context/Poststate';
import Userstate from './Context/Userstate';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  document.body.style.backgroundColor = 'rgb(248, 248, 248)';
  return (
    <>
    <Friendstate>
      <Poststate>
        <Userstate>
          <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userProfile/:id" element={<Userprofile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
          </BrowserRouter>
        </Userstate>
      </Poststate>
    </Friendstate>
    </>
  );
}

export default App;
