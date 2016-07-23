import React from 'react';
import Paper from 'material-ui/Paper';

let style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};

var Task = (props) => {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     id: this.props.id,
  //     name: this.props.name,
  //     due: this.props.due,
  //     color: this.props.color
  //   };
  // }
  var completeTask = function() {
    props.completeTask(props.id);
  };

  var componentWillMount = (function() {
    if (props.color === 0) {
      style.border = '2px solid red';
    } else if (props.color === 1) {
      style.border = '2px solid yellow';
    } else {
      style.border = '2px solid green';
    }
  })();

  // render() {

  return (
    <div>
      <Paper
        style={style}
        zDepth={3}
        circle={true}
        onTouchTap={completeTask}>
        <div className="innerTaskText">
          {props.name}
        </div>
      </Paper>
    </div>
  );
  // }
};

export default Task;
