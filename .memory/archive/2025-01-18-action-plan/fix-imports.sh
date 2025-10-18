#!/bin/bash
# Fix @/ imports in core files to use relative paths

cd /Users/alphab/Dev/LLM/DEV/b_value

# Replace @/core with relative paths based on file location
find src/core -type f -name "*.ts" -exec sed -i '' 's|@/core/keywords|../keywords|g' {} \;
find src/core -type f -name "*.ts" -exec sed -i '' 's|@/core/units|../units|g' {} \;
find src/core -type f -name "*.ts" -exec sed -i '' 's|@/core/types|../types|g' {} \;
find src/core -type f -name "*.ts" -exec sed -i '' 's|@/core|..|g' {} \;

# Fix nested imports in types/gradient/
find src/core/types/gradient -type f -name "*.ts" -exec sed -i '' 's|\.\./keywords|../../keywords|g' {} \;
find src/core/types/gradient -type f -name "*.ts" -exec sed -i '' 's|\.\./units|../../units|g' {} \;
find src/core/types/gradient -type f -name "*.ts" -exec sed -i '' 's|\.\./types|..|g' {} \;

echo "Imports fixed"
