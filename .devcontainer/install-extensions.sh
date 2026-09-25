#!/usr/bin/env bash
set -euo pipefail

CONFIG=".vscode/extensions.json"
EXT_DIR=".devcontainer/extensions"
LOG="[install-extensions]"

# CLI serveur VS Code (fonctionne sans terminal VS Code), version la plus récente
CODE_BIN="$(ls -t \
    /vscode/vscode-server/bin/*/*/bin/code-server \
    ~/.vscode-server/bin/*/bin/code-server \
    2>/dev/null | head -n 1 || true)"

# Fallback : remote-cli, uniquement dans un terminal VS Code (IPC disponible)
if [ -z "$CODE_BIN" ] && [ -n "${VSCODE_IPC_HOOK_CLI:-}" ]; then
  CODE_BIN="$(command -v code || true)"
fi

if [ -z "$CODE_BIN" ]; then
  echo "$LOG CLI VS Code Server introuvable" >&2
  exit 1
fi
echo "$LOG CLI : $CODE_BIN"

if [ ! -f "$CONFIG" ]; then
  echo "$LOG $CONFIG absent, rien à installer"
  exit 0
fi

# IDs du bloc "recommendations" (commentaires // ignorés, unwantedRecommendations exclu)
mapfile -t WANTED < <(
  sed -n '/"recommendations"[[:space:]]*:/,/\]/p' "$CONFIG" \
    | sed 's#//.*##' \
    | grep -oE '"[A-Za-z0-9][A-Za-z0-9-]*\.[A-Za-z0-9][A-Za-z0-9-]*"' \
    | tr -d '"'
)

if [ "${#WANTED[@]}" -eq 0 ]; then
  echo "$LOG aucune recommandation dans $CONFIG"
  exit 0
fi

# Extensions installées (IDs seuls, en minuscules)
INSTALLED="$("$CODE_BIN" --list-extensions | tr '[:upper:]' '[:lower:]')"

shopt -s nullglob nocaseglob
FAILED=0

for id in "${WANTED[@]}"; do
  id_lc="$(tr '[:upper:]' '[:lower:]' <<< "$id")"

  if grep -qxF "$id_lc" <<< "$INSTALLED"; then
    echo "$LOG déjà installée : $id"
    continue
  fi

  # 1. Marketplace
  echo "$LOG tentative Marketplace : $id"
  if "$CODE_BIN" --install-extension "$id"; then
    continue
  fi

  # 2. Fallback .vsix local : exact, puis préfixe versionné, puis "contient"
  vsix=""
  for candidate in "$EXT_DIR/$id.vsix" "$EXT_DIR/$id"-*.vsix "$EXT_DIR"/*"$id"*.vsix; do
    if [ -e "$candidate" ]; then
      vsix="$candidate"
      break
    fi
  done

  if [ -z "$vsix" ]; then
    echo "$LOG échec Marketplace et aucun .vsix : $id" >&2
    FAILED=$((FAILED + 1))
    continue
  fi

  echo "$LOG installation de $id depuis $vsix"
  if ! "$CODE_BIN" --install-extension "$vsix" --force; then
    echo "$LOG échec installation .vsix : $id" >&2
    FAILED=$((FAILED + 1))
  fi
done

echo "$LOG terminé (${FAILED} échec(s))"
