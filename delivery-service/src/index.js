
const rabbit = require('../rabbit');

rabbit.consume('tasks', item=>{
  console.log("DELIVERY:", item);
  rabbit.enqueue('logs', {event:'delivered', trace:item.trace});
});

console.log("delivery-service running");
