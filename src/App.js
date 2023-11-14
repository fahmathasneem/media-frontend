import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Landingpage from './pages/Landingpage';
import Home from './pages/Home'
import Wacthistory from './pages/Wacthistory';


function App() {
  return (
    <>
    <Header/>
      <div className="container m-5">
        {/* jsx code  */}
        <Routes>
          <Route path='/' element={ <Landingpage/>}/> 
          <Route path='/home' element={<Home/>}/>
          <Route path='/watch-history' element={<Wacthistory/>}/>
        </Routes>
     
      </div>
      <Footer/>
    </>
  );
}

export default App;
