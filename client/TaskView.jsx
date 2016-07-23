import React from 'react';
import Task from './Task.jsx';
import moment from 'moment';

const TaskView = (props) => (
  <div>
    {props.overdueTasks.map((overdueTask, i) => {
      return (
          <div className="col-xs-2" key={i}>
            <Task
              completeTask={props.completeTask}
              id={overdueTask.id}
              name={overdueTask.name}
              due={moment().endOf(overdueTask.dueBy).fromNow()}
              overdue={0}
            />
          </div>
        );
    })}

      {/* Create the urgentTask bubbles */}
      {props.urgentTasks.map((urgentTask, i) => {
        return (
          <div className="col-xs-2" key={i}>
            <Task
              completeTask={props.completeTask}
              id={urgentTask.id}
              name={urgentTask.name}
              due={moment().endOf(urgentTask.dueBy).fromNow()}
              color={1}
              />
          </div>
        );
      })}

      {/* Create the recentTask bubbles */}
      {props.recentTasks.map((recentTask, i) => {
        return (
          <div className="col-xs-3" key={i}>
            <Task
              completeTask={props.completeTask}
              id={recentTask.id}
              name={recentTask.name}
              due={moment().endOf(recentTask.dueBy).fromNow()}
              overdue={2}
              />
          </div>
        );
      })}
  </div>
);

export default TaskView;
