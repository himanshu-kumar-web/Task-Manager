import { useEffect, useState } from "react"
import "./App.css"
export default function App(){
    const [task,setTask]=useState("")
    const [desc,setDesc]=useState("")
    const [tasks,setTasks]=useState([])

    const handlesubmit=(e)=>{
        e.preventDefault()
        if(!task.trim()) return
        
        const new_task={id:Date.now(), task:task, desc:desc};
        setTasks([...tasks, new_task]) 
    
        setTask("")
        setDesc("")
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
            
            <div className="task-list">
                {tasks.map((t)=>(
                    <div key={t.id} className="task-item">
                        <p><strong>Task:</strong> {t.task}</p>
                        {t.desc && <p style={{marginTop: '5px', color: '#777'}}><strong>Desc:</strong> {t.desc}</p>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
