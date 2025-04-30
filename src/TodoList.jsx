import { useEffect, useState } from "react";
import './TodoList.css';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export default function TodoList() {
    const [inputValue, setInputValue] = useState("");
    const [Task, setTask] = useState(() => {
        const savedTasks = localStorage.getItem("todoTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedCompletedTasks = localStorage.getItem("completedTasks");
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });
    const [datetime, setDateTime] = useState("");

    const HandleChangeValue = (value) => {
        setInputValue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!inputValue) return;

        if (Task.includes(inputValue)) {
            setInputValue("");
            return;
        }
        const updatedTasks = [...Task, inputValue];
        setTask(updatedTasks);
        setInputValue("");
    };

    // Save tasks and completed tasks to localStorage
    useEffect(() => {
        localStorage.setItem("todoTasks", JSON.stringify(Task));
    }, [Task]);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    // Date - Time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattingDate = now.toLocaleDateString();
            const formattingTime = now.toLocaleTimeString();

            setDateTime(`${formattingDate} ${formattingTime}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Delete Task
    const DeleteVal = (value) => {
        const updated = Task.filter((curTask) => curTask !== value);
        setTask(updated);

        // Also remove it from completedTasks if present
        const updatedCompleted = completedTasks.filter((task) => task !== value);
        setCompletedTasks(updatedCompleted);
    };

    // Clear All Tasks
    const ClearValue = () => {
        setTask([]);
        setCompletedTasks([]);
    };

    // Toggle Task Completion
    const toggleCompletion = (task) => {
        if (completedTasks.includes(task)) {
            setCompletedTasks(completedTasks.filter((curTask) => curTask !== task));
        } else {
            setCompletedTasks([...completedTasks, task]);
        }
    };

    return (
        <>
        <div className="container">
            <h1>Todo-List</h1>
            <h3>{datetime}</h3>
            <section>
                <form onSubmit={handleFormSubmit}>
                    <div className="main">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(event) => HandleChangeValue(event.target.value)}
                        />
                    </div>
                    <div className="addTask">
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </section>
    
            <section>
                <div className="unOrder-list">
                    <ul className="ulOrder_items">
                        {Task.map((curTask, index) => (
                            <li key={index} className={completedTasks.includes(curTask) ? "completed" : ""}>
                                <span>{curTask}</span>
                                <button className="check-btn" onClick={() => toggleCompletion(curTask)}>
                                    <IoMdCheckmarkCircle />
                                </button>
                                <button className="delete-btn" onClick={() => DeleteVal(curTask)}>
                                    <MdDeleteForever />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section>
                <button className="clear-btn" onClick={ClearValue}>
                    Clear All
                </button>
            </section>
        </div>
        </>
    );
} 