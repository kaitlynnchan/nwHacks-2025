# Connect Quest Service
This service contains the API for managing Users and Challenges data. 

## Tech Stack
- NodeJS (v20+)
- Express.JS
- MongoDB
- Supabase Auth

## Project Structure
```
backend
├── config/             # environment configurations
├── scripts/            # contains any scripts
├── src/        
│   ├── controllers/
│   ├── middleware/     # middleware for endpoints
│   ├── models/         # database models
│   ├── routes/         # api endpoints
│   ├── services/       # database transactions
│   ├── database.js     # database configuration
│   ├── main.js         # app configuration 
├── tests/        
│   ├── integration/    # integration tests for routes
│   ├── supabase.js     # generate auhorization token
│   ├── db-handler.js   # local database configuration for tests
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
    SUPABASE_JWT_SECRET=******
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

### Running integration tests on API routes
Integration tests are run on a mongodb database configured in memory. Authorization token is generated locally.
```bash
npm run test
```

# Deploy API to AWS

### Github Actions Workflow
This process is automated with github actions. The `aws-elastic-beanstalk.yaml` workflow deploys any merged changes to main on the backend directory.

### Manual Run
1. Install AWS Beanstalk CLI.
1. Use AWS Beanstalk credentials to authenticate via the terminal
1. Deploy the service
    ```
    eb deploy
    ```

# Manual Run Scripts

### Add Random Challenge Script
Chooses a random challenge from a predefined list of challenges and makes an api call to create the challenge in the database. The `challenge-cron-job.yaml` github workflow runs the script daily on github actions.

```bash
# install the dependencies
pip install scripts/requirements.txt

# Run the script in development mode on localhost
# Must use the --dev_mode flag
# port does not need to be specified, it is set to 3000 by default
python scripts/add_random_challenge.py --dev_mode --port=3000

# Run the script on the production api service
# port is not needed
python scripts/add_random_challenge.py --api_url_prod='api-prod-url'
```

`--dev-mode`: flag to run in development mode using localhost api

`--port`: specify port for development api, set to 3000 by default

`--api_url_prod`: specify production api
