// import logo from './logo.svg';
import './App.css';
// import './styles.css'
import axios from 'axios'
import Header from './components/header/Header';
import Products from './product';
// import useAuth from './components/useAuth';
import { useEffect } from 'react';
import useAuth from './components/useAuth';


axios.defaults.baseURL='http://localhost:3000/api'

function App() {
    const {auth} = useAuth();    
    console.log(sessionStorage.getItem(auth));
    return (
        <div className="App">
            <Header data={auth}/>
            <Products/>
        </div>
    );
}

export default App;
