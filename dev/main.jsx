import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper.jsx';
import Alt from 'alt';
const alt = new Alt();
import { Component, Store, Actions } from 'src/main.jsx';

main();

class DevWrapper extends React.Component {
  render() {
    return <Component {...props}>{props.children}</Component>;
  }
}

function main() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<DevWrapper alt={alt} />, div);
}
