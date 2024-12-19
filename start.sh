#!/bin/bash

# Path to Genymotion installation
GENYMOTION_PATH="/opt/genymobile/genymotion"

# Virtual device name (replace with your device name)
VM_NAME="Samsung Galaxy S23"

# Path to your React Native project
PROJECT_PATH=$(pwd)

# Desired static port for Expo
EXPO_PORT=8081

# Function to kill any process running on the desired port
kill_process_on_port() {
  PORT=$1
  PID=$(lsof -t -i:$PORT)
  if [ -n "$PID" ]; then
    echo "Killing process on port $PORT (pid $PID)..."
    kill -9 $PID
  fi
}

# Launch Genymotion virtual device
echo "Launching Genymotion virtual device: $VM_NAME..."
$GENYMOTION_PATH/player --vm-name "$VM_NAME" &

# Give the emulator time to launch
sleep 10  # Adjust based on emulator initialization time

# Navigate to the project directory
echo "Navigating to project directory..."
cd "$PROJECT_PATH" || { echo "Failed to navigate to project directory"; exit 1; }


# Start the Expo development server on a static port
echo "Starting the Expo development server on port $EXPO_PORT..."
npx expo start --dev-client --port $EXPO_PORT
