
const fs = require('fs');
const path = require('path');

const qdir = path.join(__dirname,'data','queues');
fs.mkdirSync(qdir,{recursive:true});

function qfile(q){ return path.join(qdir, q+'.json'); }

async function enqueue(q, item){
  const f = qfile(q);
  let arr = [];
  if(fs.existsSync(f)) arr = JSON.parse(fs.readFileSync(f));
  arr.push(item);
  fs.writeFileSync(f, JSON.stringify(arr,null,2));
}

function consume(q, handler){
  const f = qfile(q);
  setInterval(()=>{
    let arr=[];
    if(fs.existsSync(f)) arr = JSON.parse(fs.readFileSync(f));
    if(arr.length===0) return;
    fs.writeFileSync(f,"[]");
    arr.forEach(handler);
  },1000);
}

module.exports={enqueue,consume};
