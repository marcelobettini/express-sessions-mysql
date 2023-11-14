# How to store Session in MySQL Database using express-mysql-session

We use sessions to allow the server to maintain the state across many page requests and keep users logged in. So when they revisit a website, they don’t have to put their credentials in again.

A session creates a unique ID per user recorded on the user’s browser as a cookie and stores some information on that user in the server. Whenever that user makes a request, the server will match a user with the proper session data.

### Why storing sessions in a Database?

Sessions work by assigning to each visitor a unique identifier. When you save data into the session, the session will store this information into a specific file on the server. The unique identifier is also stored as a cookie on your computer. One problem you may encounter with storing sessions in a file system on the server is using a shared hosting plan. In this case, if the server is not configured correctly, it would be possible for someone to get access to your Sessions.

To avoid the potential problem of an attacker using JavaScript to modify a cookie that affects session data, you can store the session data in a database that you create. Then, the session data is passed back and forth between the application and that database. This way, only someone with access to the database could change the session data.

Storing Sessions in a database is easy, and there are no adverse effects for your users. It may also be advantageous if you need to expand your application to multiple servers in different regions.

### Easy way to store session in MySQL Database using express-mysql-session

Express-mysql-session is a MySQL session store for express.js, and it is mainly used to upload session data to the MySQL database. This module creates a database table to save session data, but if you are using an older version of MySQL than MySQL 5.5.3, create your sessions table before initializing the MySQLStore. Click HERE if you need help on how to create MySQL database and tables with node.js.

This npm module is always used with an express-session middleware as a store. Here is how it is implemented:

- The first thing we need to install express-session:

<code>npm install --save express-session</code>

- Then install express-mysql-session and add it to your application’s package.json file.

<code>npm install --save express-mysql-session</code>

When we are done installing, we will import the two modules. Then we are going to set this up in our start server as middleware for express.

Now we have the express-mysql-session installed, we can import it and add it by creating a new store, and we can pass any options we want or just use the default one.

<code>
const mysqlStore = require('express-mysql-session')(session);

const sessionStore = new mysqlStore(options);
</code>

This store will internally create a MySQL connection pool that handles the connection to the database. The pool consists of 1 connection by default, but you can override this using the connectionLimit option.
