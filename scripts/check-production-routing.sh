#!/usr/bin/env bash

set -u

APEX_URL="${APEX_URL:-https://hangvidu.com/}"
WWW_URL="${WWW_URL:-https://www.hangvidu.com/}"
FIREBASE_URL="${FIREBASE_URL:-https://vidu-aae11.web.app/}"
CONNECT_TIMEOUT_SECONDS="${CONNECT_TIMEOUT_SECONDS:-8}"
MAX_TIME_SECONDS="${MAX_TIME_SECONDS:-15}"
STRICT_IPV4="${STRICT_IPV4:-0}"

failures=0
warnings=0

run_check() {
  local severity="$1"
  local label="$2"
  shift 2

  local output
  local status

  output="$(
    curl \
      --silent \
      --show-error \
      --location \
      --output /dev/null \
      --connect-timeout "$CONNECT_TIMEOUT_SECONDS" \
      --max-time "$MAX_TIME_SECONDS" \
      --write-out "http=%{http_code} remote_ip=%{remote_ip} url=%{url_effective} time_total=%{time_total}" \
      "$@" 2>&1
  )"
  status=$?

  if [ "$status" -eq 0 ]; then
    case "$output" in
      http=2*|http=3*)
        printf "ok:   %s (%s)\n" "$label" "$output"
        return 0
        ;;
    esac
  fi

  if [ "$severity" = "required" ]; then
    failures=$((failures + 1))
    printf "fail: %s (%s, curl_exit=%s)\n" "$label" "$output" "$status"
  else
    warnings=$((warnings + 1))
    printf "warn: %s (%s, curl_exit=%s)\n" "$label" "$output" "$status"
  fi
}

printf "Checking production routing...\n"
printf "APEX_URL=%s\n" "$APEX_URL"
printf "WWW_URL=%s\n" "$WWW_URL"
printf "FIREBASE_URL=%s\n\n" "$FIREBASE_URL"

run_check required "Firebase default hosting" "$FIREBASE_URL"
run_check required "Production apex default" "$APEX_URL"
run_check required "Production apex IPv6" --ipv6 "$APEX_URL"
run_check required "Production www redirect chain" "$WWW_URL"

if [ "$STRICT_IPV4" = "1" ]; then
  ipv4_severity="required"
else
  ipv4_severity="warning"
fi

run_check "$ipv4_severity" "Production apex IPv4" --ipv4 "$APEX_URL"
run_check "$ipv4_severity" "Firebase IPv4 anchor .100" --resolve "hangvidu.com:443:199.36.158.100" "$APEX_URL"
run_check "$ipv4_severity" "Firebase IPv4 anchor .101" --resolve "hangvidu.com:443:199.36.158.101" "$APEX_URL"
run_check warning "Firebase IPv6 anchor" --resolve "hangvidu.com:443:[2620:0:890::100]" "$APEX_URL"

printf "\nSummary: %s required failure(s), %s warning(s)\n" "$failures" "$warnings"

if [ "$failures" -gt 0 ]; then
  exit 1
fi
