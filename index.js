if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require("express");
const bodyparser = require('body-parser');
const bcrypt= require('bcrypt')
const mongoose = require('mongoose');
const passport=require('passport')
const flash= require('express-flash')
const session= require('express-session')
const Detail= require('./models/details')

const initilizePassport=require('./passport-config')
initilizePassport(passport,
    email=>users.find(user => user.email === email),
    id=>users.find(user => user.id === id)
)
const app=express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.set("views", "./views")
app.set('view-engine','ejs')
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

let users=[]

app.get("/",(req,res)=>{
    res.render("register.ejs");
})
app.get("/login",(req,res)=>{
    
    res.render("login.ejs");
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/table',
    failureRedirect:'/login',
    failureFlash:true
}))
app.post("/register", async (req,res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        res.redirect('/login')
    }catch{
        res.redirect('/')

    }
    res.render("register.ejs");
})
app.get("/table", async (req,res)=>{
    // add the code  to read the data from data base
    const details=await Detail.find();
   console.log(details)
    res.render("table.ejs",{details});
})



app.listen(3000,()=>{console.log("server is listening")})