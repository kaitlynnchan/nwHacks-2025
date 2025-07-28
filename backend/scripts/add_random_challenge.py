import os
import requests
import random
import json
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

PORT = os.getenv("PORT", "3000")
API_URL_PROD = os.getenv("API_URL_PROD")
DEV_MODE = os.getenv("DEV_MODE", "true").lower() == "true"

print("### Creating a new challenge ###")

# Load all challenges
with open("challenges.json") as f:
    challenges = json.load(f)

# Pick a random challenge
challenge = random.choice(challenges)
print("Challenge:", challenge)

# Determine which API URL to use
if DEV_MODE:
    API_URL = f"http://localhost:{PORT}"
else:
    API_URL = API_URL_PROD

# Make the API call to your Express backend
print(f"Adding challenge to database via {API_URL}/api/challenges ...")
try:
    response = requests.post(
        f"{API_URL}/api/challenges",
        json=challenge,
        timeout=10
    )

    if response.ok:
        response_data = response.json()
        print("Successfully added challenge with id:", response_data.get("id", "unknown"))
    else:
        print("Failed adding challenge:", response.status_code)
        print("Response:", response.text)

except requests.exceptions.RequestException as e:
    print("Request failed:", e)

