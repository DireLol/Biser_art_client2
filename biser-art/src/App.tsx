import React, {FC, useContext, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';



const App: FC=()=> {
  const {authStore} =useContext(Context)
 
  useEffect(()=>{
    if(localStorage.getItem('token')){
      authStore.checkAuth()
    }
  })

  

  return (
    
    
    <BrowserRouter>
    <NavBar/>
      <AppRouter/>
    </BrowserRouter>
    
    
      
  );
}

export default App;
