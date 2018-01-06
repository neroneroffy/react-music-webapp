import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd'
import './style.less'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Button type="primary">按钮</Button>
          <div className="hello">hello</div>
      </div>
    );
  }
}

export default App;
