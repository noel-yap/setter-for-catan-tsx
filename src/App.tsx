import React, { Component } from 'react';
import './App.css';

import * as Boards from "./component/Boards";
import * as Configurations from "./component/Configurations";

class App extends Component {
  state = {
    boardGenerator: new Boards.BoardGenerator(Configurations.BASE_CONFIGURATION),
    board: null
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button
              style={{fontSize: 36}}
              onClick={() => this.setState({
                board: this.state.boardGenerator.generateBoard()
              })}
          >
            Generate Board
          </button>
          {/* TODO: Use canvas to display the board setup. */}
          {JSON.stringify(this.state.board, null, 2)}
        </header>
      </div>
    );
  }
}

export default App;
