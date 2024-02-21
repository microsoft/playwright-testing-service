#!/bin/bash

# This script generates a URL and sets it as an environment variable

# Generate a timestamp to include in the URL
TIMESTAMP=$(date +%s)

# Construct the URL with the timestamp
GENERATED_URL="https://example.com/results/$TIMESTAMP"

# Set the URL as an environment variable for the entire workflow
echo "export GENERATED_URL=$GENERATED_URL" >> $GITHUB_ENV

# Print the generated URL for informational purposes
echo "Generated URL: $GENERATED_URL"

