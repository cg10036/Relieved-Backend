#!/bin/bash
if [[ `id -u` != 0 ]]; then
    echo "restarting as root..."
    sudo bash start_or_reload.sh
    exit 0
fi

md5_ori=($(md5sum start_or_reload.sh))
git pull
md5=($(md5sum start_or_reload.sh))
if [ "$md5_ori" != "$md5" ]; then
    echo "md5sum changed, restarting"
    bash start_or_reload.sh
    exit 0
fi

cp nginx.conf /etc/nginx/nginx.conf
service nginx restart
npm i
pm2 delete all
pm2 start index.js