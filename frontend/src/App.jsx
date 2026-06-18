import { useEffect, useState } from "react"
import "./App.css"
import axios from 'axios'
export default function App(){
    const [task,setTask]=useState("")
    const [desc,setDesc]=useState("")
    const [tasks,setTasks]=useState([])
    const [view,setview]=useState(false)
    const [editid,setEditid]=useState(null)

    const handlesubmit=(e)=>{
        e.preventDefault()
        if(!task.trim()) return
        
        if(editid){
            setTasks(tasks.map((t)=>t.id==editid?{...t,task,desc}:t))
            setEditid(null)
        }
        else{
        const new_task={id:Date.now(), task:task, desc:desc};
        setTasks([...tasks, new_task])}
    
        setTask("")
        setDesc("")
    }
    const toggle=()=>{
        setview(view?false:true)
    }
    const update=(t)=>{
        setTask(t.task)
        setDesc(t.desc)
        setEditid(t.id)
    }
    const delete_task=(id)=>{
        setTasks(tasks.filter((t)=>t.id!==id))
    }
    return(
    <div className="container">
        <h1>Student Task Manager</h1>
        <div>
            <form onSubmit={(e)=>handlesubmit(e)} className="task-form">
                <input
                    value={task}
                    placeholder="Enter Task Name"
                    onChange={(e)=>setTask(e.target.value)} 
                />
                <input
                    value={desc}
                    placeholder="Enter Description" 
                    onChange={(e)=>setDesc(e.target.value)} 
                />
                <button type="submit">Add Task</button>
            </form>
            <button className="view-btn" onClick={toggle}>View Tasks</button>
            {view &&<div className="task-list">
                {tasks.map((t)=>(
                    <div key={t.id} className="task-item">
                        <p><strong>Task:</strong> {t.task}</p>
                        {t.desc && <p style={{marginTop: '5px', color: '#777'}}><strong>Desc:</strong> {t.desc}</p>}
                        <button className="update-btn" onClick={()=>update(t)}>Update</button>
                        <button className="delete-btn" onClick={()=>delete_task(t.id)}>Delete</button>
                    </div>
                ))}
            </div>}
        </div>
    </div>
  )
}
