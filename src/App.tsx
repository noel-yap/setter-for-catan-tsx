import React from 'react';
import './App.css';

import * as ROT from "rot-js";
import {DisplayOptions} from "rot-js/lib/display/types";

import * as Boards from "./component/Boards";
import * as Configurations from "./component/Configurations";
import * as Tiles from "./component/Tiles";
import {Type} from "./component/Tiles";

interface GeneratedBoardProps {
  board: Boards.Board
}

interface GeneratedBoardState {}

class GeneratedBoard extends React.Component<GeneratedBoardProps, GeneratedBoardState> {
  private canvasDivRef = React.createRef<HTMLDivElement>();

  render(): JSX.Element {
    const divElement = this.canvasDivRef.current;
    if (!!divElement) {
      divElement.childNodes.forEach((child) => divElement.removeChild(child));

      divElement.appendChild(this.canvas());
    }

    return (
        <div ref={this.canvasDivRef} id="generatedBoard">
          <canvas/>
        </div>
    );
  }

  canvas(): HTMLCanvasElement {
    const layout = {
      bg: 'navy',
      width: 30,
      height: 11,
      spacing: 5,
      layout: "hex"
    };
    const display = new ROT.Display(layout as Partial<DisplayOptions>);

    this.props.board.terrainTilesLayout.forEach((layout) => {
      display.draw(layout.coordinate.x, layout.coordinate.y, layout.chits.values.toString(), "#000", this.color(layout.tile));
    });

    // @ts-ignore
    return display.getContainer();
  }

  color(tile: Tiles.Tile): string {
    switch (tile.type) {
      case Type.ANY_PORT: {
        return "saddlebrown";
      }

      case Type.BRICK_PORT:
      case Type.HILL: {
        return "firebrick";
      }

      case Type.ORE_PORT:
      case Type.MOUNTAIN: {
        return "slategray";
      }

      case Type.SHEEP_PORT:
      case Type.PASTURE: {
        return "lawngreen";
      }

      case Type.WHEAT_PORT:
      case Type.FIELD: {
        return "wheat";
      }

      case Type.WOOD_PORT:
      case Type.FOREST: {
        return "forestgreen";
      }

      case Type.FISHERY:
      case Type.LAKE: {
        return "aqua";
      }

      case Type.SEA: {
        return "navy";
      }

      case Type.DESERT: {
        return "sandybrown";
      }

      case Type.GOLD: {
        return "gold";
      }
    }
  }
}

interface AppProps {
}

interface AppState {
  boardGenerator: Boards.BoardGenerator,
  board: Boards.Board
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      boardGenerator: new Boards.BoardGenerator(Configurations.BASE_CONFIGURATION),
      board: new Boards.Board([])
    };
  }

  render(): JSX.Element {
    return (
        <div className="App">
          <header className="App-header">
            <button
                style={{fontSize: 36}}
                onClick={() => {
                  this.setState({
                    board: this.state.boardGenerator.generateBoard()
                  });
                }}
            >
              Generate Board
            </button>
            <GeneratedBoard board={this.state.board}/>
          </header>
        </div>
    );
  }
}

export default App;
