FROM mcr.microsoft.com/devcontainers/typescript-node:24

# Pas de prompt analytics au premier "ng"
ENV NG_CLI_ANALYTICS=false

# Suppression de tous les paquets npm globaux sauf npm
RUN PKGS="$(npm ls -g --depth=0 --json \
      | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8')); \
                 console.log(Object.keys(d.dependencies||{}).filter(n=>n!=='npm').join(' '))")" \
 && if [ -n "$PKGS" ]; then npm rm -g $PKGS; fi
