import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, Link } from 'react-router'
//import Login from './Login.jsx'

// Necessary for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Necessary for simple Mobile/Web click functionality on components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Provides 'a few seconds ago' and 'in 2 hours' to time Data
import moment from 'moment';

// Components we have built
import Navbar from './Navbar.jsx';
import TaskView from './TaskView.jsx';
import Completeds from './Completeds.jsx';
import AddTask from './AddTask.jsx';


let urgency = require('./urgency.service');

import socket from './socketio.js';
 //Necessary for original run, to create some tasks in the database.
let fake = require('./fakeData');


// let allTasks = fake.allTasks;
// import createFakeTasks from './createTasks';
// createFakeTasks(allTasks);


let hours = n => 1000*60*60*n;
let days = n => hours(n) * 24;
let cl = console.log.bind(console);

console.log(socket);
//socket.on('sending all tasks', cl);

// import socket from './socketio.js'
//
// window.socket = socket;
//console.log(socket);


//socket.emit()

class App extends React.Component {
  constructor() {
    super();

    // let allTasks = urgency.prioritizeTasks(fake.allTasks);

    this.state = {
      overdueTasks: [],
      urgentTasks: [],
      recentTasks: [],
      completedTasks: []
    };

    this.completeTask = this.completeTask.bind(this);
  }

  componentWillMount() {
    socket.emit('get all tasks');
  }

  completeTask(id) {
    console.log('Complete task run top view');
    socket.emit('complete task', id);
  }

  render() {

    socket.on('sending all tasks', function(tasks) {

      var t = urgency.prioritizeTasks(tasks);
      console.log('', t);

      this.setState({
        overdueTasks: t.overdue,
        recentTasks: t.recent,
        urgentTasks: t.urgent,
        completedTasks: []
      });

    }.bind(this));

    socket.on('complete task', function(completedTask) {

      var cs = this.state.completedTasks;

      cs.push(completedTask);

      this.setState({
        completedTasks: cs
      });
      console.log(completedTask);
    }.bind(this));

    return (
      <MuiThemeProvider className="container">
        <div>

          {/* If you want to see a client side log of state */}
          {console.log('overdue', this.state.overdueTasks)}
          {console.log('urgent', this.state.urgentTasks)}
          {console.log('completed', this.state.completedTasks)}

          <Navbar />

          <div className="row">

            <div className="col-xs-2 col-xs-offset-5">
              <AddTask/>
            </div>

            <div className="col-xs-12">

              {/* Create the overdueTask bubbles */}
              <TaskView completeTask={this.completeTask.bind(this)} overdueTasks={this.state.overdueTasks} recentTasks={this.state.recentTasks} urgentTasks={this.state.urgentTasks}/>

            </div>
          </div>

            {/*
              Scrapping this button due to unnecessary time spent styling:
              Proposal: add it to the drop down in the top right or at the top
              That way it will only have sign out and create a task
              Better in terms of MVP, as opposed to real use

              <div className="col-xs-2">
                <div className="showAll" onTouchTap={test}></div>
              </div>

            */}

          {/* Create the completedTasks cards */}
          <Completeds completeds={this.state.completedTasks}/>


        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}/>
//     <Route path="login" component={Login}/>
//   </Router>),
// document.getElementById('app'));
