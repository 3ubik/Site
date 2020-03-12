const {Router} = require('express')
const User = require('../models/User')
//const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/',async (req,res)=>{
    try{
        
        const table = await User.find({})
        
        res.json(table)
        
    }catch(e){
        res.status(500).json({message:'пизда рулю'})
    }
})  
module.exports = router