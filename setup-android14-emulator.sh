#!/usr/bin/env bash
set -euo pipefail
SDK_ROOT="${ANDROID_HOME:-$HOME/android-sdk}"
export ANDROID_HOME="$SDK_ROOT"
export ANDROID_SDK_ROOT="$SDK_ROOT"
export PATH="$SDK_ROOT/cmdline-tools/latest/bin:$SDK_ROOT/platform-tools:$SDK_ROOT/emulator:$PATH"

yes | sdkmanager --licenses >/dev/null || true
sdkmanager "emulator" "system-images;android-34;google_apis;x86_64"
mkdir -p "$HOME/.android"
printf 'no\n' | avdmanager create avd -n studybd_api34 -k "system-images;android-34;google_apis;x86_64" --device "pixel_6" --force
printf 'hw.device.name=pixel_6\nhw.ramSize=2048\nhw.keyboard=yes\n' >> "$HOME/.android/avd/studybd_api34.avd/config.ini"
