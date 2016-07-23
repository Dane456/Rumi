// Necessary for building out the database with the tasks on load.
var socket = require('./socketio');
module.exports = function(allData) {
  console.log('Alldata', allData);
  allData.forEach(task => {
    console.log('Emitting create task');
    socket.emit('create task', task);
  });
};
