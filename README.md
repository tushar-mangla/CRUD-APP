# setup server

```sh
npm init -y
```

- create and test server.js

```sh
node server
```

### install packages

```sh
npm install bcryptjs@2.4.3 concurrently@8.0.1 cookie-parser@1.4.6 dayjs@1.11.7 dotenv@16.0.3 express@4.18.2 express-async-errors@3.1.1 express-validator@7.0.1 http-status-codes@2.2.0 jsonwebtoken@9.0.0 mongoose@7.0.5 morgan@1.10.0 multer@1.4.5-lts.1 nanoid@4.0.2 nodemon@2.0.22 cloudinary@1.37.3 dayjs@1.11.9 datauri@4.1.0
```

package.json

```json
"scripts": {
    "dev": "nodemon server.js"
  },
```

install express and nodemon.

```sh
npm i express@4.18.2 nodemon@2.0.22
```

server.js

```js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5100, () => {
  console.log("server running....");
});
```

### Setup express middleware to accept json

server

```js
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});
```

```js
import morgan from "morgan";

app.use(morgan("dev"));
```
