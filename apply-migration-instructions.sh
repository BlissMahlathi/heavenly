#!/bin/bash

echo "Installing Supabase CLI..."
# For Linux
curl -sSfL https://supabase.com/install.sh | sh

# Or using npm
# npm install -g supabase

echo "Linking your Supabase project..."
supabase link --project-ref orokbjfkklzlwbcweaja

echo "Pushing migrations to database..."
supabase db push

echo "Done! Migration applied."
