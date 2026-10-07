#!/bin/bash
cd "$(dirname "$0")/backend"
source venv/bin/activate
uvicorn app:app --reload
