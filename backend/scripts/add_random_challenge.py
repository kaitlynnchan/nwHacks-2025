import os
import json
import random
import requests
import argparse
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Parse command-line arguments
parser = argparse.ArgumentParser(description="Add a random challenge to the database.")
parser.add_argument("--api_url_prod", type=str, help="Production API base URL", default=os.getenv("API_URL_PROD"))
parser.add_argument("--dev_mode", action="store_true", help="Use the local development server")
parser.add_argument("--port", type=str, help="Port number for development server", default=os.getenv("PORT", "3000"))
args = parser.parse_args()


if not args.api_url_prod and not args.dev_mode:
    print("[ERROR] Error: You must provide --api_url_prod or enable --dev_mode.")
    exit(1)

print("### STARTING CHALLENGE CREATION SCRIPT ###")

# Determine API URL
if args.dev_mode:
    API_URL = f"http://localhost:{args.port}"
    print(f"[INFO] Running in development mode. Using API: {API_URL}")
else:
    API_URL = args.api_url_prod
    print(f"[INFO] Running in production mode. Using API: {API_URL}")


# Load challenges from file
print("\n[INFO] Loading challenge list from 'challenges.json' ...")
try:
    with open("./scripts/challenges.json", "r") as file:
        challenges = json.load(file)
        if not challenges:
            print("[ERROR] Error: No challenges found in challenges.json.")
            exit(1)
        print(f"[INFO] Total challenges loaded: {len(challenges)}")
except Exception as e:
    print(f"[ERROR] Error loading challenges.json: {e}")
    exit(1)

# Select a random challenge
challenge = random.choice(challenges)
print("\n[INFO] Selected challenge: ", challenge)


# Post the challenge to the backend
print(f"\n[INFO] Sending POST request to {API_URL}/api/challenges ...")
try:
    response = requests.post(
        f"{API_URL}/api/challenges",
        json=challenge,
        timeout=10
    )

    if response.ok:
        response_data = response.json()
        print("[SUCCESS] Success: Challenge added with ID:", response_data.get("id", "unknown"))
    else:
        print("[ERROR] Error: Failed to add challenge. Status code:", response.status_code)
        print("Response:", response.text)

except requests.exceptions.RequestException as e:
    print("[ERROR] Request error:", e)
