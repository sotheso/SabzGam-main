#!/bin/bash

# Update SabzGam from GitHub
echo "در حال بروزرسانی سبزگام از گیت‌هاب..."

# Pull the latest changes
git pull origin main

# Always install dependencies to ensure everything is up to date
echo "در حال نصب وابستگی‌ها..."
npm install

# Build the project
echo "در حال ساخت پروژه..."
npm run build

echo "بروزرسانی با موفقیت انجام شد!" 