import React from 'react';
import Comp from './Comp.jsx';
import moment from 'moment';

var Completeds = (props) => {

  return (
    <div>
    {props.completeds.map((completedTask, i) => {
      return (
        <Comp
          id={completedTask.id}
          name={completedTask.name}
          due={moment().startOf(completedTask.dueBy).fromNow()}
          user={'Trevor'}
          key={i}
        />
      );
    })}
    </div>
  );
};

export default Completeds;