const express=require('express')
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://amit:amit123@cluster0.w8nn4gk.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
const app=express();
app.listen(3000,(err)=>{
    console.log('server start');
})

app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))
app.set("view engine",'ejs');

const todolist=new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    }
});
const collection=mongoose.model('todo',todolist);



app.get('/',async(req,res)=>{
    const alltodo=await collection.find({});
  res.render('index.ejs',{todos:alltodo});
})

app.post('/todo',async(req,res)=>{
   await collection.create({
     todo:req.body.todo
   })
//    console.log('data successful inserted');
    res.redirect('/');
})

app.get('/delete/:id',async(req,res)=>{
    const {id}=req.params
    await collection.deleteOne({ _id: id });
    //  console.log('delete successful');
     res.redirect('/');
})

