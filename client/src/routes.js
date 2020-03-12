import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import { Tablepage } from './pages/Tablepage'
import { AuthPage } from './pages/AuthPage'


export const useRoutes = isAuthentificated =>{
    if(isAuthentificated){
        return (
            <Switch>
                <Route path = "/table" exact>
                    <Tablepage />
                </Route>
                <Redirect to = "/table"/>
            </Switch>
            
        )
    }
    return(
        <Switch>
            <Route path ="/" exact>
                <AuthPage />
            </Route>
            <Redirect to = "/"/>
        </Switch>
    )
}