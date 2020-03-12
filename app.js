const express =require('express')
const config=require('config')
const path = require('path')
const mongoose=require('mongoose')
require('dotenv').config()

const app= express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/table',require('./routes/table.routes'))

if (process.env.NODE_ENV=== 'production') {
    app.use('/',express.static(path.join(__dirname,'client','public')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','public', 'index.html'))
    })
}
//const PORT=config.get('port')||5000
const PORT=process.env.PORT||5000


async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser:true,
             useUnifiedTopology:true,
             useCreateIndex:true

})
app.listen(PORT ,()=> console.log("Сервер слушает..."))
    }catch(e){
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()



