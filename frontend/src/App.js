// import logo from './logo.svg';
import './App.css';
// import './styles.css'
import axios from 'axios'
import Header from './components/header/Header';
import Products from './product';
// import useAuth from './components/useAuth';
import { useContext } from 'react';
import AuthContext from './components/AuthContext';


axios.defaults.baseURL='http://localhost:3000/api'

function App() {
    const {auth} = useContext(AuthContext)
    return (
        <div className="App">
            <Header data={auth}/>
            <Products/>
        </div>
    );
}

export default App;
