# Connect Quest Service
This service contains the API for managing Users and Challenges data.

## Tech Stack
- NodeJS (v20+)
- Express.JS
- MongoDB

## Project Structure
```
backend
├── config/             # environment configurations
├── scripts/    
├── src/        
│   ├── controllers/    # contains any scripts
│   ├── models/         # database models
│   ├── routes/         # api endpoints
│   ├── services/       # database transactions
│   ├── database.js     # database configuration
│   ├── main.js         # app configuration 
├── .env                # environment variables
└── Dockerfile          # containerized environment
```

# Commands

### Getting Started

1. Install the dependencies.
    ```bash
    npm install
    ```

1. Create `.env` with the following variables.
    ```
    MONGO_DB_USERNAME=******
    MONGO_DB_PASSWORD=******
    MONGO_DB_HOST=******
    MONGO_DB_APP_NAME=******
    DEV_MODE=true
    ```

### Running dev mode
```bash
npm run dev # deploys on PORT 3000
```

### Running dev in a docker container
```bash
# build docker container
docker build -t connect-quest-app .

# run docker container with PORT 3000
docker run -p 3000:3000 --env-file .env connect-quest-app
```

# Deploying the API to AWS
Ensure you have the AWS Beanstalk CLI installed.
```
eb deploy
```