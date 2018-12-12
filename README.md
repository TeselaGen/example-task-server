# example-task-server
Example server showing how to use the microservice task framework

# Getting Started
1. Start PostgreSQL Container for storing queue
`sh reset_postgres.sh`
2. Start your microservice worker (refer to microservice worker documentation)
3. Copy `example.env`, rename it `.env` and update any relevant variables.
4. Run Drop and Sync to clear out the database and start running the demo tasks
`yarn ds`
