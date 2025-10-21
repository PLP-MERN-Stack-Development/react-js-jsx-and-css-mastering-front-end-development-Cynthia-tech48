import React from 'react';
import TaskManager from '../components/TaskManager';
import Card from '../components/Card';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <Card title="Your Tasks">
        <TaskManager />
      </Card>
    </div>
  );
};

export default Tasks;
