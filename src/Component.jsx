import React from 'react';
import Alt from 'alt';
const { PropTypes } = React;

import Actions from './Actions.jsx';
import Store from './Store.jsx';

export default class Component extends React.Component {
  static defaultProps = {
    store: null, actions: null, flux: null
  }

  static propTypes = {
    store: PropTypes.object,
    actions: PropTypes.object,
    flux: PropTypes.instanceOf(Alt)
  }

  static contextTypes = {
    flux: PropTypes.instanceOf(Alt)
  }

  constructor(props) {
    const { content } = this;
    const alt = props.alt || (new Alt();
    super(props);
    this.store = props.store || null;
    this.actions = props.actions || null;
    this.flux = props.flux || null;
    this.storeChanged = this.storeChanged.bind(this);
    this.state = {}
  }

  componentDidMount() {
    const { context } = this;
    if (!this.flux) {
      this.flux = (context && context.flux) ? context.flux : new Alt()
    }
    const flux = this.flux;
    if (!this.actions) {
      this.actions = flux.createActions(Actions);
      this.store = flux.createStore(Store,
        `ComponentStore${Math.random().toString().substr(2,5)}`, this.actions);
    }
    if (!this.store) {
      this.store = flux.createStore(Store,
        `ComponentStore${Math.random().toString().substr(2,5)}`, this.actions);
    }
    this.store.listen(this.storeChanged);
  }

  componentWillUnmount() {
    this.store.unlinsten(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }
}
