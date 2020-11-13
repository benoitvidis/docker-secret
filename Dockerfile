FROM node:12-alpine

LABEL fr.ben0.maintainer="Benoît Vidis"

WORKDIR /opt/secret
COPY src /opt/secret

RUN  set -x \
  && cd /opt/secret \
  && npm ci

ENTRYPOINT [ "/opt/secret/secret" ]
