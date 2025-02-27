#!/bin/bash

# Exit on any error
set -e

# Build the application
echo "Building the application..."
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
npx netlify-cli deploy --dir=dist --prod

echo "Deployment completed successfully!"