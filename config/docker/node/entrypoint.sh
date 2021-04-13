#!/bin/bash
set -e

cwd=$(pwd)
user_id=$(stat -c "%u" "$cwd")

sed -ie "s/$(id -u node)/$user_id/g" /etc/passwd

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec gosu "$user_id" "$@"
