#!/bin/bash

# Migration Script for Pie Order Heaven
# This script applies database migrations to your Supabase project

echo "🔄 Applying Database Migration..."
echo ""

# Project details
PROJECT_REF="orokbjfkklzlwbcweaja"
MIGRATION_FILE="supabase/migrations/20251008120000_create_admin_notifications.sql"

echo "📋 Migration file: $MIGRATION_FILE"
echo "🎯 Project: $PROJECT_REF"
echo ""

# Check if migration file exists
if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found!"
    exit 1
fi

echo "Choose your preferred method:"
echo ""
echo "1. Apply via Supabase Dashboard (Recommended)"
echo "2. Apply via Supabase CLI (requires CLI setup)"
echo "3. Show SQL to copy manually"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📱 Opening Supabase SQL Editor..."
        echo ""
        echo "🔗 Direct link: https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
        echo ""
        echo "📝 Steps:"
        echo "1. The link above will open in your browser"
        echo "2. Copy the SQL from: APPLY_THIS_SQL.sql"
        echo "3. Paste it into the SQL Editor"
        echo "4. Click 'Run'"
        echo ""
        
        # Try to open in browser
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
        elif command -v open &> /dev/null; then
            open "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
        else
            echo "Please open the link manually in your browser"
        fi
        ;;
    2)
        echo ""
        echo "🔧 Setting up Supabase CLI..."
        
        # Check if npx is available
        if ! command -v npx &> /dev/null; then
            echo "❌ npx not found. Please install Node.js first."
            exit 1
        fi
        
        echo "📦 Linking project..."
        npx supabase link --project-ref $PROJECT_REF
        
        if [ $? -eq 0 ]; then
            echo "✅ Project linked successfully!"
            echo "🚀 Pushing migrations..."
            npx supabase db push
            
            if [ $? -eq 0 ]; then
                echo "✅ Migration applied successfully!"
            else
                echo "❌ Failed to push migration"
                exit 1
            fi
        else
            echo "❌ Failed to link project"
            echo "💡 Tip: You'll need your database password"
            exit 1
        fi
        ;;
    3)
        echo ""
        echo "📄 SQL Content:"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        cat APPLY_THIS_SQL.sql
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Copy the above SQL and run it in Supabase SQL Editor"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
