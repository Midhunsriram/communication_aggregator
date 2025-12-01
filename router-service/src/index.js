
const Fastify = require('fastify');
const rabbit = require('../rabbit');
const validators = require('./validators');
const app = Fastify();
const PORT = 4000;

app.post('/message', async (req, reply) => {
  const data = req.body;
  const trace = Date.now().toString();
  if (!validators.validateMessage(data)) {
    await rabbit.enqueue('logs', {trace, event:'validation_failed', data});
    return reply.code(400).send({error:'invalid'});
  }
  await rabbit.enqueue('tasks', {trace, data});
  await rabbit.enqueue('logs', {trace, event:'enqueued'});
  return {status:"enqueued"};
});

app.listen({port:PORT, host:"0.0.0.0"});
