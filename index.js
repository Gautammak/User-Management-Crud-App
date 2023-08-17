const express = require("express")
const app = express();
const mongoose = require("mongoose")
const User = require("./models/index.js")
const bodyParser  = require('body-parser')
 


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/crud",{useUnifiedTopology:true , useNewUrlParser : true})
var connection = mongoose.connection;
connection.once('open',function(){
    console.log("connection successfull");
})


app.set('view engine','ejs')
 
app.get("/",(req,res)=>{

    res.render('insert')
})


app.post('/insert',(req,res)=>{

    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    user.save(()=>{
        res.send("<h1> data send </h1>")
    })

})

app.get('/show',(req,res)=>{

    User.find({},(err,result)=>{
res.render('show',{users:result})
        
    })
  
})

app.get('/delete/:id',async(req,res)=>{
  await  User.findByIdAndDelete(req.params.id)
  res.redirect('/show')
})

app.get('/edit/:id',(req,res)=>{
     User.findById(req.params.id,(err,result)=>{
        res.render('edit',{users : result})
     })

  })

  app.post('/update/:id', async(req,res)=>{
 await   User.findByIdAndUpdate(req.params.id,req.body)
 res.redirect('/show')
  })
const port =  process.env.port || 3000;
app.listen(port,(req,res)=>{
    console.log(` start at ${port}`);
})