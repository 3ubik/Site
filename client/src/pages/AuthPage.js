import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/App.context'
export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request,error,clearError} = useHttp()
const [form,setForm] = useState({
    login:'',
    email:'',
    password:''
})

useEffect( () =>{
    message(error)
    clearError()
},[error,message,clearError])

useEffect(()=>{
    window.M.updateTextFields()
},[])

const changeHandler = event => {
    setForm({...form,[event.target.name]: event.target.value})
}

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register','POST',{...form})
            message(data)
            
        } catch (e) {
            
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
            
            
        } catch (e) {
            
        }
    }


    
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Authorization</h1>
                <div class="card green darken-1">
                    <div class="card-content white-text">
                        

                        <div>

                            <div class="input-field ">
                                <input
                                    placeholder="Введите Логин"
                                    id="login"
                                    type="text"
                                    className="validate"
                                    name = "login"
                                    
                                    onChange={changeHandler}
                                    />
                                    
                                <label htmlFor="login">login</label>
                            </div>

                            <div class="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    className="validate"
                                    name = "email" 
                                    value={form.email}
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="email">email</label>
                            </div>

                            <div class="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    className="validate"
                                    name = "password"
                                    value={form.password}
                                    
                                    onChange={changeHandler} 
                                    />
                                <label htmlFor="passworf">password</label>
                            </div>

                            



                        </div>

                    </div>
                    <div class="card-action">
                        <button className="btn red " 
                        style={{ marginRight: 10 }}
                       

                        onClick={loginHandler}
                        disabled={loading}


                        >
                            Log in
                            </button>



                        <button className="btn red " 
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            
                            Registration
                            </button>
                    </div>
                </div>
            </div>

        </div>
    )
}