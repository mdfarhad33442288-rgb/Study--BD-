#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p android-signing
chmod 700 android-signing
STORE_PASS="$(openssl rand -hex 24)"
KEY_ALIAS="studybd_release"
KEYSTORE="android-signing/studybd-release.keystore"
rm -f "$KEYSTORE"
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore "$KEYSTORE" \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "$STORE_PASS" \
  -keypass "$STORE_PASS" \
  -dname "CN=study BD, OU=Mobile, O=study BD, L=Dhaka, ST=Dhaka, C=BD" >/tmp/studybd-keytool.log 2>&1
cat > android-signing/keystore.properties <<EOF
storeFile=android-signing/studybd-release.keystore
storePassword=$STORE_PASS
keyAlias=$KEY_ALIAS
keyPassword=$STORE_PASS
EOF
chmod 600 "$KEYSTORE" android-signing/keystore.properties
keytool -list -v -storetype PKCS12 -keystore "$KEYSTORE" -storepass "$STORE_PASS" | grep -E 'Alias name:|Entry type:|Owner:|SHA256:'
