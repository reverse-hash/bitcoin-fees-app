#!/bin/bash

# This script compares the translation files and extracts unique keys from lines containing 
# key-value pairs. If the files do not have the same keys, the script exits with an error code.
#
# Usage: ./check_i18n.sh file1.ts file2.ts ...

if [ "$#" -lt 2 ]; then
  echo "Please provide at least two files for comparison."
  exit 1
fi

files=("$@")

for file in "${files[@]}"; do
  echo -n "Checking $file... ";
  keys=$(grep -oP '^\s*"\K[^"]+(?=":\s*)|^\s*\K\S+(?=\s*:\s*")' "$file" | sort -u)
  
  if [ -z "$common_keys" ]; then
    common_keys="$keys"
    echo "ok."
  else
    diff_keys=$(comm -3 <(echo "$common_keys") <(echo "$keys"))
    
    if [ -n "$diff_keys" ]; then
        echo "failed (miss or extra keys)."
        echo $diff_keys
        exit 1
    else
        echo "ok."
    fi
  fi
done

exit 0
