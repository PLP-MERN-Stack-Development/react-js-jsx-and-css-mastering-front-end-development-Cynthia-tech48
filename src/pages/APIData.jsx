import React, { useEffect, useState } from "react";

const ApiData = () => {
  const [data, setData] = useState([]);         // Tasks data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state
  const [search, setSearch] = useState("");     // Search input

  // 20 sample English tasks
  const sampleData = [
    { id: 1, title: "Buy groceries", body: "Milk, Eggs, Bread, Fruits" },
    { id: 2, title: "Finish homework", body: "React assignment due today" },
    { id: 3, title: "Call mom", body: "Check how she is doing" },
    { id: 4, title: "Walk the dog", body: "Evening walk at 6 PM" },
    { id: 5, title: "Clean room", body: "Organize desk and wardrobe" },
    { id: 6, title: "Read a book", body: "Read 30 pages of a novel" },
    { id: 7, title: "Plan trip", body: "Decide weekend getaway location" },
    { id: 8, title: "Exercise", body: "Do 30 minutes of cardio" },
    { id: 9, title: "Pay bills", body: "Electricity and Internet bills" },
    { id: 10, title: "Meditate", body: "10 minutes of morning meditation" },
    { id: 11, title: "Update grocery list", body: "Add vegetables and snacks" },
    { id: 12, title: "Finish project report", body: "Submit by Friday" },
    { id: 13, title: "Laundry", body: "Wash and fold clothes" },
    { id: 14, title: "Car maintenance", body: "Check oil and tire pressure" },
    { id: 15, title: "Schedule meeting", body: "Team sync-up at 2 PM" },
    { id: 16, title: "Water plants", body: "Garden and indoor plants" },
    { id: 17, title: "Email client", body: "Send updated proposal" },
    { id: 18, title: "Organize files", body: "Clean downloads and documents folder" },
    { id: 19, title: "Cook dinner", body: "Prepare pasta and salad" },
    { id: 20, title: "Evening walk", body: "Relax and unwind for 30 minutes" },
  ];

  // Simulate fetching data (like an API call)
  useEffect(() => {
    try {
      setData(sampleData);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter tasks based on search input
  const filteredData = data.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Task list */}
      <ul className="grid md:grid-cols-2 gap-4">
        {filteredData.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600 hover:shadow transition"
          >
            <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
              {task.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{task.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiData;
