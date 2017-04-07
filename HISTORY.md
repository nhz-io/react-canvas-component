# History
## 0.1.5
* added fix for #5.
    > In case you are unable to control what gets transpiled and what gets ignored  
    (When using stuff like [create-react-app](https://github.com/facebookincubator/create-react-app) and need to eject to alter config)  
    you might experience issues with [uglify-js](https://github.com/mishoo/UglifyJS). In this case, import transpiled version  
    from `react-canvas-component/es5`

## 0.1.4
* re-enabled rollup interop - fixes #3

## 0.1.3
* switched to eslint instead of xo
* updated deps

## 0.1.2
* using cb ref instead of string

## 0.1.0
* Updated to more terse example

## 0.1.0
* Using **rolup** for release bundling
* Slight refactoring

## 0.0.8
* Simplified scripts
* Updated to React 15
* Not passing `draw`, `realtime`, `top` and `left` to **canvas**

## 0.0.7
* Added travis npm autodeployment config

## 0.0.6
* Updated webpack config
* Prettier package.json
* Updated .travis.yml with new node versions

## 0.0.5
* Proper modular build. Can `import` and `require` now

## 0.0.4
* Updated the README.md

## 0.0.1
* Initial commit
