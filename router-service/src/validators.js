
function validateMessage(p){
  if(!p || !p.id || !p.channel || !p.to || !p.body) return false;
  return ['email','sms','whatsapp'].includes(p.channel);
}
module.exports={validateMessage};
