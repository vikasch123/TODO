#!/bin/bash

# Exit on any error
set -e

# This script creates a backup of the Supabase database
# It requires the Supabase CLI to be installed and configured

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first."
    exit 1
fi

# Create backup directory if it doesn't exist
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Create a timestamp for the backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/supabase_backup_$TIMESTAMP.sql"

# Create the backup
echo "Creating database backup..."
supabase db dump -f $BACKUP_FILE

echo "Backup created successfully at: $BACKUP_FILE"