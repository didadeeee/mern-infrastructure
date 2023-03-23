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

In server.js, it's very important to have

```js
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

whatever path eg. "/dashboard" will bring you back to index.html

## Dev

You need 2 running servers:
Open 2 Terminals:

- Express -> `node --watch server.js`
- React -> `npm run dev`

## Proxy

Vite proxy info at <https://vitejs.dev/config/server-options.html#server-proxy>

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