# myapp
Mobile Application to capture images and annotate


for production
1. generate dist folder using command: npm run build
2. npm install -g http-server (for first-time)
 - http-server -p 8080 -c-1 dist/<project-name-from-angular.json>
3. you will get the urls on which app is available
4. use the url, to open application in your mobile
5. add to home screen
6. pwa is ready in you mobile

for development:
1. ng serve --host <ip-address-of-mobile>  (ip address of your mobile)
2. access application on http://<ip-address-of-mobile>:4200/ 
3. add to home screen
4. start deveopment