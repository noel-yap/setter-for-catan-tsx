import React from 'react';
import './App.css';

import * as ROT from "rot-js";
import {DisplayOptions} from "rot-js/lib/display/types";

import * as Boards from "./component/Boards";
import * as Coordinates from "./component/Coordinates";
import * as Configurations from "./component/Configurations";
import * as Tiles from "./component/Tiles";
import {ConfiguredTile} from "./component/ConfiguredTiles";

class Cartesian2D {
  constructor(public x: number, public y: number) {}

  translate(d: Cartesian2D): Cartesian2D {
    return new Cartesian2D(this.x + d.x, this.y + d.y);
  }
}

interface GeneratedBoardProps {
  board: Boards.Board
}

interface GeneratedBoardState {}

class GeneratedBoard extends React.Component<GeneratedBoardProps, GeneratedBoardState> {
  private canvasDivRef = React.createRef<HTMLDivElement>();

  render(): JSX.Element {
    const canvasDiv = this.canvasDivRef.current;
    if (!!canvasDiv) {
      canvasDiv.childNodes.forEach((child) => canvasDiv.removeChild(child));

      canvasDiv.appendChild(this.canvas());
    }

    return (<div ref={this.canvasDivRef}/>);
  }

  canvas(): HTMLCanvasElement {
    const displayOptions = {
      layout: 'hex',
      bg: 'navy',
      width: 30,
      height: 11,
      spacing: 5,
    };
    const display = new ROT.Display(displayOptions as Partial<DisplayOptions>);
    console.log(`App.GeneratedBoard.canvas: display.options = ${JSON.stringify(display._options)}`);

    this.props.board.portTilesLayout.forEach((layout) => {
      window.requestAnimationFrame(() => {
        this.renderPort(display, layout);
      });
    });

    this.props.board.terrainTilesLayout.forEach((layout) => {
      this.renderTerrain(display, layout);
    });

    return display.getContainer() as HTMLCanvasElement;
  }

  renderTerrain(display: ROT.Display, configuredTile: ConfiguredTile) {
    display.draw(
        configuredTile.coordinate.x,
        configuredTile.coordinate.y,
        configuredTile.chits.values.toString().replace(/,/g, ' '),
        'black',
        GeneratedBoard.color(configuredTile.tile));
  }

  renderPort(display: ROT.Display, configuredTile: ConfiguredTile): void {
    const canvas = display.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    const options = display._options;

    const x = configuredTile.coordinate.x;
    const y = configuredTile.coordinate.y;
    const position = configuredTile.coordinate.positions[0];
    const color = GeneratedBoard.color(configuredTile.tile);

    // These calculations copied from rot.js to help ensure consistency.
    const charWidth = Math.ceil(context.measureText('W').width);
    const border = options.border;
    const fontSize = options.fontSize;
    const spacing = options.spacing;

    const hexSize = Math.floor((spacing * (fontSize + charWidth / Math.sqrt(3)) / 2));
    const spacingX = hexSize * Math.sqrt(3) / 2;
    const spacingY = 1.5 * hexSize;
    const hexCenter = new Cartesian2D((x + 1) * spacingX, y * spacingY + hexSize);

    function startPoint(edgePosition: Coordinates.EdgePosition, hexSize: number): Cartesian2D {
      return hexCenter.translate(new Cartesian2D(
          ([Coordinates.LEFT, Coordinates.TOP_LEFT].some((p) => p === edgePosition)
              ? -1
              : [Coordinates.TOP_RIGHT, Coordinates.BOTTOM_LEFT].some((p) => p === edgePosition)
              ? 0
              : 1)
          * (spacingX - border),
          ([Coordinates.TOP_RIGHT, Coordinates.RIGHT, Coordinates.TOP_LEFT].some((p) => p === edgePosition)
              ? -1
              : 1)
          * ([Coordinates.TOP_RIGHT, Coordinates.BOTTOM_LEFT].some((p) => p === edgePosition) ? 1 : .5) * hexSize + border));
    }

    context.strokeStyle = 'black';
    context.fillStyle = color;
    context.lineWidth = 1;

    GeneratedBoard.polygon(context, [
      hexCenter,
      startPoint(position, hexSize),
      startPoint((position + 1) % 6, hexSize)]);
  }

  static polygon(context: CanvasRenderingContext2D, points: Cartesian2D[]): void {
    context.beginPath();

    context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    points.forEach((point) => context.lineTo(point.x, point.y));

    context.stroke();
    context.fill();
  }

  static color(tile: Tiles.Tile): string {
    switch (tile.type) {
      case Tiles.Type.ANY_PORT: {
        return "gold";
      }

      case Tiles.Type.BRICK_PORT:
      case Tiles.Type.HILL: {
        return "firebrick";
      }

      case Tiles.Type.ORE_PORT:
      case Tiles.Type.MOUNTAIN: {
        return "slategray";
      }

      case Tiles.Type.SHEEP_PORT:
      case Tiles.Type.PASTURE: {
        return "lawngreen";
      }

      case Tiles.Type.WHEAT_PORT:
      case Tiles.Type.FIELD: {
        return "wheat";
      }

      case Tiles.Type.WOOD_PORT:
      case Tiles.Type.FOREST: {
        return "forestgreen";
      }

      case Tiles.Type.FISHERY:
      case Tiles.Type.LAKE: {
        return "aqua";
      }

      case Tiles.Type.SEA: {
        return "navy";
      }

      case Tiles.Type.DESERT: {
        return "sandybrown";
      }

      case Tiles.Type.GOLD: {
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
