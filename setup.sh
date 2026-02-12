#!/usr/bin/env bash
set -euo pipefail

# Project folder name (change if you want)
PROJECT_NAME="eventease-project"

echo "🚀 Creating project skeleton: ${PROJECT_NAME}"

# Create root
mkdir -p "${PROJECT_NAME}"
cd "${PROJECT_NAME}"

# Root files/folders
mkdir -p docs
touch README.md .gitignore .env.example

# src structure
mkdir -p src/{config,modules,middlewares,utils,tests}

# app & server
touch src/app.js src/server.js

# config
mkdir -p src/config
# keep names generic; you can rename later if needed
touch src/config/env.js
touch src/config/database.js

# modules
for m in auth events organizer user admin; do
  mkdir -p "src/modules/${m}"
done

# auth module files
touch src/modules/auth/auth.routes.js
touch src/modules/auth/auth.controller.js
touch src/modules/auth/auth.service.js
touch src/modules/auth/auth.schema.js

# Placeholder files for other modules (add details later)
for m in events organizer user admin; do
  touch "src/modules/${m}/${m}.routes.js"
  touch "src/modules/${m}/${m}.controller.js"
  touch "src/modules/${m}/${m}.service.js"
  touch "src/modules/${m}/${m}.schema.js"
done

# middlewares
touch src/middlewares/auth.js
touch src/middlewares/roles.js
touch src/middlewares/validator.js
touch src/middlewares/index.js

# utils
touch src/utils/jwt.js

# tests
touch src/tests/.gitkeep

echo "✅ Done! Created skeleton at ./${PROJECT_NAME}"
echo "📌 Next: cd ${PROJECT_NAME} && npm init -y"
