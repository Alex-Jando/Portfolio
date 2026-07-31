#!/usr/bin/env bash
#
# Deploy the portfolio to the self-hosted staging site (portfolio.jando.live).
#
# This ONLY touches the local staging deployment. It never pushes to git and
# never affects the production Vercel deployment on master.
#
# Usage:
#   scripts/deploy-staging.sh            # build + restart from current checkout
#   scripts/deploy-staging.sh --ref BR   # check out BR first, then build
#
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE="portfolio-staging"
REF=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --ref) REF="${2:-}"; shift 2 ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

cd "$APP_DIR"

if [[ -n "$REF" ]]; then
  echo "==> Checking out $REF"
  git checkout "$REF"
fi

echo "==> Deploying from branch: $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)"

# Guard: refuse to stage-deploy master so this never shadows the Vercel flow.
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" == "master" && "${ALLOW_MASTER:-0}" != "1" ]]; then
  echo "Refusing to deploy 'master' to staging (set ALLOW_MASTER=1 to override)." >&2
  exit 1
fi

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
npm run build

echo "==> Restarting $SERVICE"
if systemctl --user list-unit-files | grep -q "^${SERVICE}.service"; then
  systemctl --user restart "$SERVICE"
  sleep 2
  systemctl --user is-active --quiet "$SERVICE" && echo "==> $SERVICE is active"
else
  echo "Service $SERVICE not installed. See scripts/portfolio-staging.service" >&2
  exit 1
fi

echo "==> Smoke test"
for path in / /projects /resume /collection /about /contact; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8080${path}")"
  printf '    %-14s %s\n' "$path" "$code"
  [[ "$code" == "200" ]] || { echo "Smoke test failed for $path" >&2; exit 1; }
done

echo "==> Deployed: https://portfolio.jando.live"
