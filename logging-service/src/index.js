
const rabbit = require('../rabbit');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname,'..','data','logs.json');
fs.mkdirSync(path.dirname(logFile),{recursive:true});
if(!fs.existsSync(logFile)) fs.writeFileSync(logFile,'[]');

rabbit.consume('logs', item=>{
  let arr = JSON.parse(fs.readFileSync(logFile));
  arr.push(item);
  fs.writeFileSync(logFile, JSON.stringify(arr,null,2));
});

console.log("logging-service running");
