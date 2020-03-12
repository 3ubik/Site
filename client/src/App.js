import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/App.context';
import { Navbar } from './components/NavBar';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId,ready } = useAuth()
  const isAuthentificated = !!token
  const routes = useRoutes(isAuthentificated)
  if(!ready){
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token,login,logout,userId,isAuthentificated
    }}>
      <Router>
        {isAuthentificated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )


}

export default App
