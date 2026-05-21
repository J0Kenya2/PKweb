#!/usr/bin/env bash
# Push to GitHub using token from project .env (not committed).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.example to .env and set GITHUB_TOKEN."
  exit 1
fi

# shellcheck disable=SC1091
source .env

if [[ -z "${GITHUB_TOKEN:-}" || "${GITHUB_TOKEN}" == ghp_paste_your_token_here ]]; then
  echo "Set GITHUB_TOKEN in .env"
  exit 1
fi

USER="${GITHUB_USERNAME:-justinwsl123}"
REMOTE="https://${USER}:${GITHUB_TOKEN}@github.com/J0Kenya2/PKweb.git"

git push "$REMOTE" main
