#!/bin/zsh
cd "$(dirname "$0")"
echo "Opening WildDogHere CMS..."
(sleep 1.5 && open "http://127.0.0.1:4173") &
npm run cms
