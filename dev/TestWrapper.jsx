import React from 'react';
import Component from 'src/Component.jsx';

export default class TestWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({width:window.innerWidth, height:window.innerHeight});
  }

  render() {
    const { width, height } = this.state;
    return(
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <Component {...this.props} width={width} height={height}/>
      </div>
    );
  }
}
