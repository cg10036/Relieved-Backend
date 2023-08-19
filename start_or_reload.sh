git pull
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
npm i
pm2 delete all
pm2 start index.js