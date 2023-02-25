import { FileSystemTree } from "@webcontainer/api";

export const files: FileSystemTree = {
  "index.html": {
    file: {
      contents: `
<html>
<head>
<title>Login Form</title>
<style>
.login-form {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-form form {
  border: 1px solid #ccc;
  padding: 10px;
}
.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
.login-form input[type="checkbox"] {
  margin-right: 5px;
}
.login-form input[type="submit"] {
  width: 100%;
  padding: 5px;
}
</style>
</head>
<body>
<div class="login-form">
  <form>
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Email" />
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Password" />
    <input type="checkbox" id="remember-me" />
    <label for="remember-me">Remember me</label>
    <input type="submit" value="Login" />
  </form>
</div>
</body>
</html>
      `,
    },
  },
  "index.js": {
    file: {
      contents: `
import express from 'express';
import path from 'path';
const app = express();
const port = 3111;
const __dirname = path.resolve();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  "package.json": {
    file: {
      contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "express": "latest",
              "nodemon": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};
