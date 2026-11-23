#!/usr/bin/env bash
set -euo pipefail

SDK_ROOT="${ANDROID_SDK_ROOT:-$HOME/android-sdk}"
CMDLINE_TOOLS_VERSION="13114758"
CMDLINE_ZIP="/tmp/commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip"
mkdir -p "$SDK_ROOT/cmdline-tools" "$SDK_ROOT/licenses"

if [ ! -x "$SDK_ROOT/cmdline-tools/latest/bin/sdkmanager" ]; then
  curl -fL --retry 3 "https://dl.google.com/android/repository/commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip" -o "$CMDLINE_ZIP"
  rm -rf "$SDK_ROOT/cmdline-tools/latest" "$SDK_ROOT/cmdline-tools/cmdline-tools"
  unzip -q "$CMDLINE_ZIP" -d "$SDK_ROOT/cmdline-tools"
  mv "$SDK_ROOT/cmdline-tools/cmdline-tools" "$SDK_ROOT/cmdline-tools/latest"
fi

export ANDROID_HOME="$SDK_ROOT"
export ANDROID_SDK_ROOT="$SDK_ROOT"
export PATH="$SDK_ROOT/cmdline-tools/latest/bin:$SDK_ROOT/platform-tools:$PATH"

yes | sdkmanager --licenses >/dev/null || true
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0" "ndk;27.1.12297006"

cat > /home/ubuntu/study-bd/android/local.properties <<EOF
sdk.dir=$SDK_ROOT
EOF
chmod 600 /home/ubuntu/study-bd/android/local.properties
printf 'ANDROID_SDK_ROOT=%s\n' "$SDK_ROOT"
