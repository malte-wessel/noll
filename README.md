noll
=========================

[![npm](https://img.shields.io/badge/npm-noll-brightgreen.svg?style=flat-square)]()
[![npm version](https://img.shields.io/npm/v/noll.svg?style=flat-square)](https://www.npmjs.com/package/noll)
[![npm downloads](https://img.shields.io/npm/dm/noll.svg?style=flat-square)](https://www.npmjs.com/package/noll)

![Screen](https://github.com/malte-wessel/noll/raw/master/docs/screen1.gif)


* environment for computer graphics experiments
* webpack dev server, ES6 with babel
* hot module replacement
* implement experiments only with an `initialize` and `update` function
* neat user interface for controlling your experiments
* define controls for your parameters
* support for canvas, threejs, glsl and many more

## Getting started

The easiest way to get started is to clone the [noll-starter](https://github.com/malte-wessel/noll-starter) repository.
```bash
git clone https://github.com/malte-wessel/noll-starter.git
cd noll-starter
npm install
npm start
```

### Starting from zero

If you want to start from zero first install noll:
```bash
npm install noll --save
```

Then add a folder for your first experiment
```bash
mkdir experiment
```

Inside this folder you need to create a file `experiment.json` in order to tell noll that this folder contains an experiment. A minimal `experiment.json` contains only a title for the experiment:

```json
{
  "title": "My first experiment"
}
```

noll also expects two files in this folder: `initialize.js` and `update.js` which both export a single function.

#### initialize.js
```javascript
export default function initialize(canvas, values) {
    // Initialize logic goes here ...
    // You have access to
    //   - the canvas element
    //   - a `values` object that holds the values of your controls defined in `experiment.json`

    // Return data and objects that you want to access in your `update` function
    return {};
}
```

#### update.js
```javascript
export default function update(canvas, data, values) {
    // Update and render logic goes here ...
    // You have access to
    //   - the canvas element
    //   - a `data` object that holds objects and data that your `initialize` function returned
    //   - a `values` object that holds the values of your controls defined in `experiment.json`

    // return false if you want to stop the animation loop
    return false;
}

```



