A lightweight 3-service microservice system that simulates routing, delivering, and logging communication messages (Email, SMS, WhatsApp).
Built with Node.js and a simple file-based message queue mechanism.

Overview
---------

This project simulates a real-world communication aggregator with three services:

1. Router Service

Receives client requests, validates the message, and pushes it into a task queue.

2. Delivery Service

Consumes queued tasks and simulates delivering messages (Email/SMS/WhatsApp).

3. Logging Service

Consumes log events and stores them into a centralized logs file.

A simple file-based queue system (rabbit.js) is used instead of RabbitMQ to keep the project lightweight and easy to run.

How the System Works (High-Level Flow)
---------------------------------------

1️. Client sends a message → Router Service
2️. Router validates & enqueues task → tasks.json
3️. Delivery Service consumes task → simulates sending
4️. Delivery logs event → logs.json
5️. Logging Service consumes logs → writes to logging-service/data/logs.json

This behavior simulates RabbitMQ-style publish/consume without requiring external dependencies.

Running the Services (Local Development)
----------------------------------------

Open three terminals, one for each service.
1. Start Router Service (Port 4000)

# commands

cd comm-agg/router-service
npm install
npm start

2. Start Delivery Service

# commands

cd comm-agg/logging-service
npm install
npm start

3. Start Logging Service

# commands

cd comm-agg/logging-service
npm install
npm start


Test the System
----------------

Use curl on Postman.

Example Request

curl -X POST http://localhost:4000/message \
  -H "Content-Type: application/json" \
  -d '{
    "id": "msg-1",
    "channel": "email",
    "to": "user@example.com",
    "body": "Hello World!"
  }'

Where Data is Stored
---------------------

# Queue files (in router-service):

router-service/data/queues/tasks.json
router-service/data/queues/logs.json

# Delivery results:

delivery-service/data/deliveries.json
delivery-service/data/email_sent.json
delivery-service/data/sms_sent.json
delivery-service/data/wa_sent.json

# Logs:

logging-service/data/logs.json


Open these JSON files to view processed messages and logs.