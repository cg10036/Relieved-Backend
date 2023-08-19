git pull
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
pm2 delete all
pm2 start index.js