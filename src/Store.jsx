export default class Store {
  constructor(actions) {
    this.state = {};
    this.bindListeners({
      handleUpdate          : actions.UPDATE,
    });
  }

  handleUpdate(state) {
    this.state = state;
  }
}
