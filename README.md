- vite is a react bundler as react takes up a lot of disk space, it uses esbuild instead of babel.
  https://vitejs.dev/guide/why.html

- to setup:

```terminal
npm create vite@latest
✔ Project name: … vite-project // folder name
✔ Select a framework: › React
✔ Select a variant: › JavaScript

cd vite-project
npm install // package.json
npm run dev
```

// clean up
Remove everything in App.jsx except minimal JSX
Remove "index.css" import in main.css
Remove unused files - index.css, App.css, assets/react.svg, public/vite.png

// copy over .gitignore file for windows and osx - https://www.toptal.com/developers/gitignore/api/windows,osx,node,visualstudiocode

install eslint extension

```terminal
npm install eslint --save-dev

❯ npm init @eslint/config
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JSON
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

add below in .eslintrc.json below "plugin:react/recommended"

```json
"plugin:react/jsx-runtime"
```

install eslint for react hooks (new version of react with hooks)
https://www.npmjs.com/package/eslint-plugin-react-hooks

```terminal
npm install eslint-plugin-react-hooks --save-dev
```

add below in .eslintrc.json below "plugin:react/jsx-runtime"

```json
"plugin:react-hooks/recommended"
```

check all files end with jsx in the terminal

```terminal
npm eslint srx/**/*.jsx
```

commons rules:

- try not to change index.html and main.jsx
- create jsx file to write html like syntax
- components file name and function are Capitalised

- object destructuring

```javascript
const x = { name: "simon", age: 30 };

console.log(x.name); //? simon
const n = x.name;
console.log(n); //? simon

const { name } = x;
console.log(name); //? simon
```

<li>testing</li> -> is being treated as an object
everything in an array is a object {}
jsx can be string, <jsx> and an array of jsx like [<tr></tr>, <tr></tr>]

- mapping an array:

```javascript
const output = [];
for (const person of contacts) {
  output.push(
    <tr>
      <td>My name is {person.name}</td>
      <td>My place is {person.location}</td>
    </tr>
  );
}
console.log("output", output);
```

unique value for key is required to optimised diffing, and it has to be in outermost element

lectures:

- the relationship between the files:
  index.html <- main.jsx <- app.jsx <- each jsx file that contains in each component

- when we write html like code (jsx), vite uses esbuild to transform it into js code.

- in current unit, instead of rendering ejs file, we are rendering the jsx file.

- in the older react version, it's required to import React from "react".

- name a new file using UpperCamelCase, name the component (function) the same as the file name

- import ToDoList from "./ToDoList" is the same as - const ToDoList = require("./ToDoList")

- export default App; is the same as - module.exports = App

- console.log does not appear in terminal but browser instead

- data flow
  information flow from closest parent component to the child component

- input (props) -> react function -> JSX - string/html/[]

- in the exported function, pass props as the parameter, indicate how you use it as {props.name} in the child component

- passing the data in the parent component as attribute as per below:

```javascript
<ToDoListItem name="simon" company="GA" />
```

- conditional rendering

```javascript
if (contacts.length === 0) {
  return <p>Nothing here</p>;
}

or;

return (
  <tbody>
    {contacts.length === 0 ? (
      <h3>Blank</h3>
    ) : (
      contacts.map((c, index) => (
        <tr key={index}>
          <td>My pi name is {c.name}</td>
          <td>My pi place is {c.location}</td>
        </tr>
      ))
    )}
  </tbody>
);
```

- since we are creating a function for .map, then instead of x(), present it as a component instead: <x />

- state is variable, array and objects

- props are read only

- reacts automatically renders when props and states are changed

- a hook is useXXX
  eg.
  const [contacts, setContacts] = useState([])
  useState([]) is a callback function that returns an array of 2 values - state, setState
  limitations:

- as react render optimally according to diffing, and the only way to change the state is to use setState to replace the state

```javascript
const a = [1, 2, 3];
const b = a;
a.pop();
console.log(b === a); // true
console.log(a === [1, 2, 3]); // false
```

- an example to get the count increase in subsequent codes accordingly

```javascript
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
```

- using spread operator

```javascript
const handleClick = () => {
  console.log("click");
  // setShow("");
  // contacts.pop();
  console.log(contacts);
  const c = [...contacts];
  c.pop();
  setContacts(c); // replace (a copy)
  console.log(contacts);
};
```

```javascript
function myUseState(x) {
  return [2, 5];
}
const [a, b] = myUseState();

const tmp = myUseState();
const a = tmp[0];
const b = tmp[1];
```

```javascript
function ContactsTable(props) {
  const [contacts, setContacts] = useState([]);

  const state = useState([]);
  const contacts = state[0];
  const setContacts = state[1]
```

# Project 3

## Difficult Libaries

- Maps
- Calendar
- Charts
- Component Toolkit

## Medium

- Dates
- Utils like lodash

## Working with git as a team

- try not to work on the same files

1 main line -> `main` branch -> auto deploy by cyclic.sh
Each team member create their own branch, example `simon`

develop the features (like Login) on your own branch - `simon`
commit changes -> edit the file -> git add -A -> git commit -m 'test commit'
get updated changes - `git pull`

When feature is done & want to share -> goto `main` and `git pull` && `git merge simon`
When you want to see other people features in your branch -> goto `simon` and `git merge main`

#### Practice

```terminal
// get the latest update
git pull
// create a new branch
git checkout -b ida
// check branch
git branch
// switch branch
git switch main
git switch ida
// on the branch (git branch ida), check if ur features work with the main branch
git merge main
// push ur updates to the main branch (git branch main)
git merge ida
//
```

pushing your updates to ur own branch

```terminal
// make sure you are on your own branch
git switch ida
git add
git commit
git push origin ida
```

review the pull request on github and merge

## Gotcha with state

- Replace the state NOT mutate the state
- Repeating setState x 3 != setState(count + 3)

## Unit 1

[Traditional] Click -> Model -> render() -> View
[React Way] Click -> State -> render(auto) -> View

- event handling
  think in the mvc approach, update the state without mutating the props

## Form Inputs

- Controlled - [no form required, lengthy], you can access the date as you type
- Form Submit - needs a form [do something after but add button is clicked]
- Uncontrolled - an input form with open value is uncontrolled [no form required, shorter codes, not recommended]

### Controlled Input

#### Unit 1 Alternative

button.addEventListener("change", (event) => console.log(event.target.value))

1. Create a state for the input
2. put the state as input value -> <input value={state}>
3. add onchange method -> <input onChange={changeName} value={state}>
4. inside onChange -> extract variable + change state
   1. event -> event.target.value
   2. setState(event.target.value)

```js
function MyForm() {
   // controlled -> React controls the input
   const [state, setState] = useState({
      color: "",
      count: 0,
   }); // STep 1

   // Step 4
   const handleChange = event => setState({
      ...state, //? if you forget -> replace state with just 1 field
      [event.target.name]: event.target.value //? "color": <input>.value
   })

   return <>
            <input name="color"
            value={state.color} // Step 2 -> forces input to sync with the state
            onChange={handleChange}/> // Step 3
            <input name="count"
            value={state.count}
            onChange={handleChange} />
         </input>
}
```

Show alternative onChange

### UnControlled Input

#### Unit 1 Alternative

```js
<input name="name" value="simon">

const handleClick = () => {
  const input = document.querySelector("input").value
}
```

Steps

1. Create a ref for the input using useRef
2. Attach ref to the input -> <input ref={myRef}>
3. Access the value using `myRef.current.value`

enter/add(submit) button will trigger the submit, add event.preventDefault();

## Form Submit

1. When create the form, tag input with `name` attribute
   1. <input name="input-name" />
2. form add onSubmit handler
3. onSubmit -> event.preventDefault()
4. extract -> event.target.elements.[input-name].value

## Issue

ContactsTable -> state for `contacts`
ContactForm -> form needs to change state using `setContacts`
TableBody -> view for `contacts` -> pass using props

Could consider shifting `contacts` into ContactForm (won't work)
Could we mirror `contacts` in ContactForm and maybe export it?

### Lifting State

Props -- 1 input --> React Component (Function) --output--> JSX (string, array, <html>)

React has 1 data flow -> Parent to Child (deterministic)
ContactsTable (contacts) --> TableBody (props)

Child ---> Parent ???
Child ---> Sibling ???

### Usual Route - Lifting State

Started with TableBody -> `contacts` state
Create Form inside TableBody
Extract Form -> ???? (TableBody <--- ContactForm)
LIft State ---> Create Parent Component (ContactTable has both TableBody and ContactForm)

Each Componment has 1 task

TableBody -> show contacts as HTML
ContactForm -> collect info for new Contact -> change state
ContactTable -> Contains both TableBody and ContactForm

# MERN

**Changes from Notes**

Use `vite` rather than `CRA`
Change from `build` to `dist` folder
Remove `favicon` code in server.js
use `node --watch server.js` to run Express
change "type":"commonjs" in package.json

after vite setup

## Code the Skeleton Express App

Instead we're going to code our own Express app from scratch because we won't need much middleware, etc. due to the fact that the Express backend simply needs to:

- Deliver the production-ready index.html, which will in turn request the production-ready scripts, etc.
- Respond to AJAX requests, performing any necessary CRUD, and finally respond with JSON.

```terminal
git
npm run build
npm install express morgan serve-favicon
```

make sure you're in the root folder where you can see package.json

```terminal
ls
new-item server.js
```

setup server.js by copying the codes
error message: require is not defined

1. change file name to server.cjs
   // const favicon = require("serve-favicon");
   // app.use(favicon(path.join(**dirname, "build", "favicon.ico")));
   app.use(express.static(path.join(**dirname, "dist")));
   OR
2. replace const express = require("express") to import express from "express" OR
3. recommended way: in package.json, change "type":"commonjs"

## Building -> Bundling + Minifying

**deployable**
// products a new folder: dist(vite), build(CRA)
dist folder has compressed stuff
dist folder is also automaticall gitignored
dist folder only changes after 'npm run build'
minifying - changes all the word to single letter and remove the space
Bundler: Roll up (vite), similar as webpack
Tree shaking - remove unused files

In the future, all Express routes should start with "/api"

In server.js, it's very important to have the "Catch All" route to serve the index.html when any non-AJAX "API" request is received by the Express app [to send back the index.html page for all non-API/AJAX requests.]

be sure to mount API or other routes before it!

```js
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

Now the "catch all" route will serve the index.html whenever:

- A user types a path into the address bar and presses enter.
- The user refreshes the browser.
- A person clicks a link to the app provided via email, slacked, included on another web page, etc.

Note:

- The React app should use a "service/api" module to communicate with the backend's API routes via AJAX.

whatever path eg. "/dashboard" will bring you back to index.html

## Dev

You need 2 running servers:
Open 2 Terminals:

- Express -> `node --watch server.js`
- React -> `npm run dev`

or you `npm install concurrently --save-dev` and change `package.json`

for mac user

```json
    "dev": "concurrently 'vite' 'node --watch server.js'",
```

for windows user

```json
"dev": "concurrently \"node --watch server.js\" vite",
```

## Proxy

Vite proxy info at <https://vitejs.dev/config/server-options.html#server-proxy>

in vite.config.js

for mac os

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

for windows

```js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000/",
    },
  },
});
```

## Deployment

setup github repo and connect to cyclic

### Add startup script

```json
  "scripts": {
    "start": "node server.js",
  }
```

## IMPORTANT

DO NOT SYNC UP THE CODE!!
We will be using React Router 6 - https://reactrouter.com/en/main but not the new stuff in 6.4 (yet - wait till Unit 4) and also we will NOT be using React Router 5 (which is what most of the tutorials out there are).

React Router: We will be using 6.0 - 6.3, not 5.x or 6.4 and above
RR6: element = {newOrderPage}
RR5: components = {newOrderPage}

## Clean up vite

App.js -> App.jsx
main.jsx -> remove `index.css`

index.js(note) = main.jsx (vite) -> fix import for App after the move
src, public folder, vite.config.js -> belongs to React
every js file outside of src -> belongs to Express

Folders

- src/pages: This folder will hold the "page-level" components that implement the app's main functionality. Page-level components are rendered for each client-side route. For example, in the past where we might have rendered a movies/show.ejs template for a GET /movies/:id route, we now might want to render a MovieDetailPage.jsx component when at the /movies/:id client-side route instead. We'll move the <App> component into the src/pages folder as well.

- src/components: This folder will hold all other non-page-level components. These components may often be used/rendered by any number of other components.

in main.jsx

```js
import App from "./pages/App/App";
```

## dotenv

npm install dotenv
new-item .env
npm install mongoose
new-item config/database.js

```dotenv
DATABASE_URL=""
```

config/database.js

```js
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
```

in server.js

```js
require("dotenv").config();

// Connect to the database
require("./config/database");
```

new-item crud-helper.js

```js
// Connect to the database
require("dotenv").config();
require("./config/database");

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;
```

## Part 2

create each pages in seperate folders in src/pages/

## Add Browser Router

if using react (web based)

```terminal
npm install react-router-dom
```

if using react native

```terminal
npm install react-router
```

to use current url to affect

import and update main.js

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## Styling

### npm install framework

#### Bootstrap & picocss

in terminal

```terminal
npm install bootstrap@5.3.0-alpha1
npm install @picocss/pico
```

on top of main.jsx

```js
import "@picocss/pico/css/pico.css";
import "bootstrap/dist/css/bootstrap.css";
```

note: change class => className

```js
 <button type="button" className="btn btn-primary">
```

Pro: easy
Cons: stuck with their style

#### inline.css

index.css
write own css

myStyle is on object like { backgroundColor: "yellow" }
<style={myStyle}>

Pro: individual and works
Cons: not css

#### CSS module

https://vitejs.dev/guide/features.html#css-modules

Pro: CSS and individual
Con: ???

import "index.css"
https://vitejs.dev/guide/features.html#css-modules

#### Component Toolkit

https://bestofjs.org/projects?tags=component&tags=react

Pro: React based
Cons: Stuck with theme? Need know the underlying framework

#### Tailwind

https://tailwindcss.com/

Pro: complete design system for css
Cons: learn tailwind

#### CSS in JS

https://bestofjs.org/projects?tags=css-in-js

Pro: CSS in JS
Con: Complex

## Class

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

React will write this part for us:

```js
const p = new Person("Simon");
```

in class component, remove "this"

## Over the Weekend for Monday

- Recap `register` for a user from Unit 2
  - express hash
  - write controller, route, model
- Research & Decide on UI / CSS
- Swap sessions wih JWT
- Recap `fetch` - https://sei-42-materials.vercel.app/docs/unit2/wk05d03/4.3-consuming-3rd-party-apis
- Do the Movie HW as a group

## Over the weekend II

Remember to do this

- Recap `register` for a user from Unit 2
  - express hash
  - write controller, route, model
- Research & Decide on UI / CSS
- Swap sessions wih JWT
- Recap `fetch` - https://sei-42-materials.vercel.app/docs/unit2/wk05d03/4.3-consuming-3rd-party-apis
  - async and await
- Do the Movie HW as an (optional) group

## React Communication with Express

React ---(request)---> Express

Express ---(response)---> React

Signup -> New User -> CRUD -> Create - POST /api/users/

React ---(request - fetch)---> Express
React -> onSubmit -> collect form data -> submit

instead of the express ejs way

```js
<form action="/users/" method="post">
```

this is the react way to fetch post request + url

```js
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Express - Create User

route - /api/users POST
controller - UserController.create

```js
const create = async (req, res, next) => {
  req.body; // info in the POST
  // no validation!!
  if (req.body.name === "") {
    res.json({}); // goes back as data for fetch
    return;
  }
  // no hash -> bcrypt
  await User.create(req.body);
  res.json({});
};
```

model - User -> name, password, email, confirm(XX)

## Signup endings

Correct -> See all orders
Wrong -> Error message

Express ---(response)---> React
Express -> response -> never redirect(), never render(), always send json()

## Setup Router

mkdir routes -> new-item userRouter.js

```js
const express = require("express");
const router = express.Router();
// starting from api - due to server.js setup
router.post("/", (req, res) => {
  res.json({ body: req.body });
});

module.exports = router;
```

in server.js, move out the api path, below config/database.js

```js
const userRouter = require("./routes/usersRouter");
```

above app.get("/\*")

```js
app.use("/api/users", userRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

## Setup Model

in User.js

```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
```

## Setup Controller

```js
const User = require("../models/User");

const create = (req, res) => {
  res.json({ body2: req.body });
};

module.exports = {
  create,
};
```

## Hashing

```terminal
npm i bcrypt
```

in models/User.js [do not use arrow function due to this]

```js
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});
```

## To Navigate

```js
import { useNavigate } from "react-router-dom";

const [error, setError] = useState("No Error");
const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  // window.alert(JSON.stringify(state));
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    navigate("/orders");
  } catch (error) {
    setError(error.error);
  }
};
```

on app, we can't use cookies, and there might be differents servers serving the client, so session for authorisation is not that applicable.

### JWT

https://jwt.io/
Libraries - working with backend, so node.js

```terminal
npm install jsonwebtoken
```

Header (cannot be changed)
Payload (can insert any data)

How to prevent people hacking the encoded data?
with Verify Signature, it uses the header and payload data and produce into a unique data
[your-256-bit-secret]

encoding vs encryption?
encode and decode without a key

encoded

- has a fixed formula to convert the data to url (replace space, ', / with some other strings)
- not a secret

Client --> /login POST (body) --> Server
Server (sign jwt) --> jwt --> Client

Client --> /secret (manually send JWT along)
Server (verify JWT?) -> Client

in userController, setup jwt and expiry

```js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SERCET;

const create = async (req, res) => {
  const { password } = req.body;
  if (password.length < 3) {
    return res.status(400).json({ message: "password too short" });
  }

  try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
};
```

in dotenv, make sure no "" & no space, restart server

```js
JWT_SECRET=;
```

in SignUpForm, in handleSubmit

```js
localStorage.setItem("token", data);
// setUser(data);
// navigate("/orders");
```

inside src
mkdir utilities
new-item users-service.js

```js
export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(windowatob(token.split(".")[1])).user : null;
}
```

server.js

```js
const jwt = require("jsonwebtoken");

app.get("/api/secret", (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  return res.json(token);
});
```

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
