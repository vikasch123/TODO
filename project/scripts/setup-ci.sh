#!/bin/bash

# Exit on any error
set -e

# This script helps set up CI/CD tools locally for testing

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start Jenkins container for local CI/CD testing
echo "Setting up Jenkins for local CI/CD testing..."
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts

# Wait for Jenkins to start
echo "Waiting for Jenkins to start..."
sleep 30

# Get the initial admin password
JENKINS_PASSWORD=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)
echo "Jenkins initial admin password: $JENKINS_PASSWORD"
echo "Access Jenkins at: http://localhost:8080"

echo "CI/CD setup completed successfully!"