import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/App.context';
import { Loader } from '../components/Loader';
import { Tablelist } from '../components/Tablelist';




export const Tablepage = () => {

  const [table,setTable] = useState([])
  const {loading, request } = useHttp()
  const {token} = useContext(AuthContext)

  const fetchtable = useCallback( async()=>{
    try {
      const fetched = await request('/api/table','GET',null,{
        Authorization: `Bearer ${token}`
      })
      setTable(fetched)
      
    } catch (e) {
      
    }
  },[token,request])

  useEffect( ()=>{
    fetchtable()
  },[fetchtable])

  if(loading){
    return <Loader/>
  }
  

  return (
    
    <>

      {!loading && <Tablelist table = {table} />}

    </>



  )
}
