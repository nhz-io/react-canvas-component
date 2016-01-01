import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Alt from 'alt';
const alt = new Alt();
import { Component, Store, Actions } from 'src/main.jsx';
import TestWrapper from './TestWrapper.jsx';

main();

function renderer({ctx, delta, time}) {
  const { width, height } = ctx.canvas;

  ctx.clearRect(0,0,width,height);
  ctx.save();
  ctx.translate(width/3, height/3);
  ctx.rotate((Math.PI/180)*((time/10)%360));
  ctx.fillStyle = 'black';
  ctx.fillRect(-1 * (width/6), -1 * (height/6), width/3, height/3);
  ctx.restore();
  ctx.save();
  ctx.translate(width - width/5, height - height/5);
  ctx.rotate(-1*(Math.PI/180)*((time/5)%360));
  ctx.fillStyle = 'red';
  ctx.fillRect(-1 * (width/10), -1 * (height/10), width/5, height/5);
  ctx.restore()
}

function main() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<TestWrapper draw={renderer} realtime={true}/>, div);
}
