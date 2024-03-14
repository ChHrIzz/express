const express = require("express");
const morgan = require("morgan");
const app= new express();
app.use(morgan('dev'));
app.use(express.json());


let tasks=[];
app.get('/',(req,res)=>{
    res.json(tasks);
}) 
app.post('/tasks',(req,res)=>{
    const task=req.body
    tasks.push(task);
    res.send({message:"Task added",tasks})
   
})

app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task = tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found")
    }else{
        res.json(task)
    }
})


app.put('/tasks/:id',(req,res)=>{
    const id =req.params.id;
    const updatedTasks =req.body;
    const index =tasks.findIndex(task=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTasks);
        res.send(tasks)
    }
})

app.delete('/dlt/:id',(req,res)=>{
    const id = req.params.id;
    const index =tasks.find(task=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1);
        res.send(tasks)
    }
})
app.listen(3005,(req,res)=>{
    console.log("port is up")
    })
     