import React from 'react';
import './TaskItem.scss';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
  
interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
      </div>
      <div className="task-body">
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default TaskItem;
