#!/bin/bash

# Jekyll Local Development Server Script

echo "Starting Jekyll development server..."

# Add gem bin path
export PATH="$HOME/snap/code/208/.local/share/gem/ruby/3.3.0/bin:$PATH"

# Clean up any previous builds
rm -rf _site

# Try to complete bundle install (may take time for sassc)
echo "Installing dependencies (this may take a few minutes on first run)..."
bundle config set --local path 'vendor/bundle'
bundle install

# Start Jekyll server
echo "Starting Jekyll server at http://localhost:4000"
bundle exec jekyll serve --livereload --host 0.0.0.0

# Alternative if bundle exec fails:
# jekyll serve --skip-initial-build --host 0.0.0.0