Make use of Node.js and MongoDB to implement the simple TinyUrl functionality.

For more information about TinyUrl, go to http://tinyurl.com/. 
Mapping the annoying hard-remember url to short beautiful url.


Pre Requirement
1. Install Node.js 
2. Install MongoDB 
3. Install MongoDB Node.js Driver

For more information about Node.js, go to http://nodejs.org/
For more information about MongoDB, go to http://www.mongodb.org/
For more information about MongoDB Node.js Driver, go to https://github.com/mongodb/node-mongodb-native


How to user?
1. Start your MongoDB (Recommended using customized db location)
2. Make sure you already created a db called "tinyUrl" (You can also use other defaulte db like test, make sure you change the code in the DBClient.js)
3. git clone this project
4. cd to this project
5. run "node index.js"
6. Open your browser by hitting "localhost:8888" and you will see the home page with two input fileds
   Enter the long url you want to short in the first input field
   Enter the short url you want to use in the second input field
   Click "Submit"
7. If save successfully, you can go to localhost:8888/shortUrl and it will redirect you to the original long url
