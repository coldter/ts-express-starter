ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

COPY first-run-notice.txt /tmp/scripts/

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# Install additional OS packages
RUN sudo apt update && export DEBIAN_FRONTEND=noninteractive\
  && sudo apt install -y --no-install-recommends \
  jq \
  rsync \
  zip \
  unzip \
  # Move first run notice to a different location
  && mkdir -p "/usr/local/etc/vscode-dev-containers/" \
  && mv -f /tmp/scripts/first-run-notice.txt /usr/local/etc/vscode-dev-containers/

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# To install more global node packages.
RUN  su node -c "npm install -g npm ts-node typescript tsx"

# Remove scripts now that we're done with them
RUN apt-get clean -y && rm -rf /tmp/scripts

# Mount for docker-in-docker 
VOLUME [ "/var/lib/docker" ]