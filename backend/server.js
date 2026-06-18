import express from 'express'
import cors from 'cors'
const app=express()
app.use(express.json())
app.use(cors())

const list=[]

app.get("/todo",(req,res)=>{
    res.json(list);
})
app.post("/todo",(req,res)=>{
    const new_todo={
        id:Date.now(),
        ...req.body}
    list.push(new_todo)
    res.json(new_todo)
})


app.put("/todo/:id",(req,res)=>{
    const id=Number(req.params.id)
    const {task,desc}=req.body
    const index=list.findIndex((t)=>t.id==id)
    list[index]={...list[index],task,desc}
    res.json(list[index])
})
app.delete("/todo/:id",(req,res)=>{
    const id=Number(req.params.id)
    list.filter((t)=>t.id!==id)
    res.json({message:"deleted"})
})
const port=5000
app.listen(port,()=>{
    console.log(`Server is ruuning on http://localhost:${port}`)
})