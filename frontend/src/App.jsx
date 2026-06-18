import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(false);
  const [editid, setEditid] = useState(null);

  const API_URL = "http://localhost:5000/todo";

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or Update Task
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    try {
      if (editid) {
        await axios.put(`${API_URL}/${editid}`, {
          task,
          desc,
        });

        setEditid(null);
      } else {
        await axios.post(API_URL, {
          task,
          desc,
        });
      }

      await fetchTasks();

      setTask("");
      setDesc("");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Load task into form for editing
  const update = (t) => {
    setTask(t.task);
    setDesc(t.desc);
    setEditid(t.id);
  };

  // Delete task
  const delete_task = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggle = () => {
    setView(!view);
  };

  return (
    <div className="container">
      <h1>Student Task Manager</h1>

      <form onSubmit={handlesubmit} className="task-form">
        <input
          type="text"
          placeholder="Enter Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button type="submit">
          {editid ? "Update Task" : "Add Task"}
        </button>
      </form>

      <button className="view-btn" onClick={toggle}>
        {view ? "Hide Tasks" : "View Tasks"}
      </button>

      {view && (
        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((t) => (
              <div key={t.id} className="task-item">
                <p>
                  <strong>Task:</strong> {t.task}
                </p>

                {t.desc && (
                  <p
                    style={{
                      marginTop: "5px",
                      color: "#777",
                    }}
                  >
                    <strong>Description:</strong> {t.desc}
                  </p>
                )}

                <button
                  className="update-btn"
                  onClick={() => update(t)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => delete_task(t.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}