import express from 'express'
import cors from 'cors'
const app=express()
app.use(express.json())
app.use(cors())

const list=[]

app.post("/todo",(req,res)=>{
    const new_todo={
        id:Date.now(),
        ...req.body}
    list.push(new_todo)
    res.json(new_todo)
})


// app.get("/todo",(req,res)=>{
//     res.json(list)
// })

const port=5000
app.listen(port,()=>{
    console.log(`Server is ruuning on http://localhost:${port}`)
})