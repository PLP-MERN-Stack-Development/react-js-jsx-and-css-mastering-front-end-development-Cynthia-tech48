import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks on first render (safe parse)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('tasks');
      const saved = raw ? JSON.parse(raw) : [];
      // Ensure saved is an array
      setTasks(Array.isArray(saved) ? saved : []);
    } catch (err) {
      console.error('Failed to parse saved tasks:', err);
      setTasks([]);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks:', err);
    }
  }, [tasks]);

  // Add task with a stable id
  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const taskObj = {
      id: Date.now().toString(), // stable id as string
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, taskObj]);
    setNewTask('');
  };

  // Toggle complete/incomplete by id
  const toggleTask = (id) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete task by id
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card title="Welcome">
        <p className="text-gray-600 dark:text-gray-300">
          Manage your tasks efficiently using the <strong>Cynthia Task Manager</strong>.
        </p>
      </Card>

      <Card title="Task Manager">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
            onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center italic">No tasks added yet.</p>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.map(task => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span
                      className={`${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-800 dark:text-gray-200'
                      } transition-all duration-200`}
                    >
                      {task.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Optional: show created time or other controls here */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition-all duration-200"
                      aria-label={`Delete ${task.text}`}
                    >
                      🗑️
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Home;
