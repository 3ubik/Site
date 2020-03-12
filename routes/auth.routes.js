const{Router} = require('express')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('login','Минимальная длина логина 3 символа').isLength({min:3,max:12}),
        check('email','Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 7 символов').isLength({min:7,max:20})
        


    ],
    async (req,res)=>{
    try{
        

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Некорректные данные регистрации'
            })
        }

        const {login,email,password}=req.body

        const candidate = await User.findOne ({ login, email })
        
        if(candidate){
           return res.status(400).json({message:'пользователь существует'})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const DateOfRegistration = new Date()
        const dateOfLastLogin = new Date()
        const user = new User ({login,email,password:hashedPassword,dateOfRegistration:DateOfRegistration,dateOfLastLogin:dateOfLastLogin})
        
        await user.save()
    
        res.status(201).json({message:'пользователь создан'})
        
    }catch(e){
        res.status(500).json({message:'пизда рулю'})
    }
})
router.post(
    '/login',
    [
        check('login','Введите логин').exists(),
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()

    ],
    
    async (req,res)=>{
        try{

            const errors = validationResult(req)
    
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'Некорректные данные при входе в систему'
                })
            }
        
            const {login,email,password}=req.body

            const user = await User.findOne({login,email})


            if(!user){
                return res.status(400).json({message:'Пользователя не существует'})
             }

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль'})
            }
            const doll = new Date()
            
            user.update({login:user.login}, {$set: {dateOfLastLogin: doll }})
            
            

            const token = jwt.sign(
                { userId:user.id},
                config.get("jwtSecret"),
                {expiresIn: '1h'}

            )
           
            res.json({token,user:user.id})           
            

            
            
        }catch(e){
            res.status(500).json({message:'пизда рулю'})
        }
})



module.exports = router