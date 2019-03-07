import _ from 'underscore';
import React from 'react';

import './App.css';

import * as ROT from "rot-js";
import {DisplayOptions} from "rot-js/lib/display/types";

import * as Boards from "./component/Boards";
import * as Chits from "./component/Chit";
import * as Coordinates from "./component/Coordinates";
import * as Configurations from "./component/Configurations";
import * as Tiles from "./component/Tiles";
import {ConfiguredTile} from "./component/ConfiguredTiles";
import Hex from "rot-js/lib/display/hex";

class Cartesian2D {
  constructor(public x: number, public y: number) {}

  translate(d: Cartesian2D): Cartesian2D {
    return new Cartesian2D(this.x + d.x, this.y + d.y);
  }

  scale(factor: number): Cartesian2D {
    return new Cartesian2D(factor * this.x, factor * this.y);
  }

  diff(rhs: Cartesian2D): Cartesian2D {
    return new Cartesian2D(this.x - rhs.x, this.y - rhs.y);
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

      canvasDiv.appendChild(this.renderBoard());
    }

    return (<div ref={this.canvasDivRef}/>);
  }

  renderBoard(): HTMLCanvasElement {
    const displayOptions = {
      layout: 'hex',
      fg: 'black',
      bg: 'navy',
      width: 30,
      height: 11,
      spacing: 5
    };
    const display = new ROT.Display(displayOptions as Partial<DisplayOptions>);
    console.log(`App.GeneratedBoard.canvas: display.options = ${JSON.stringify(display._options)}`);

    this.props.board.terrainTilesLayout.forEach((layout) => {
      GeneratedBoard.renderTerrain(display, layout);
    });

    window.requestAnimationFrame(() => {
      this.props.board.portTilesLayout.forEach((layout) => {
        GeneratedBoard.renderPort(display, layout);
      });
    });

    window.requestAnimationFrame(() => {
      this.props.board.fisheryTilesLayout.forEach((layout) => {
        GeneratedBoard.renderFishery(
            display,
            layout,
            !this.props.board.terrainTilesLayout.some((tl) => {
              return tl.coordinate.x === layout.coordinate.x && tl.coordinate.y === layout.coordinate.y
            }));
      })
    });

    return display.getContainer() as HTMLCanvasElement;
  }

  static renderTerrain(display: ROT.Display, configuredTile: ConfiguredTile) {
    const options = display._options;

    display.draw(
        configuredTile.coordinate.x,
        configuredTile.coordinate.y,
        GeneratedBoard.chitsToString(configuredTile.chits),
        options.fg,
        GeneratedBoard.tileColor(configuredTile.tile));
  }

  static renderPort(display: ROT.Display, configuredTile: ConfiguredTile): void {
    const options = display._options;

    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuredTile.coordinate.x, configuredTile.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const vertex0 = edgePositionStartPoint(configuredTile.coordinate.positions[0]);
    const vertex1 = edgePositionStartPoint((configuredTile.coordinate.positions[0] + 1) % 6);

    GeneratedBoard.renderPolygon(display, GeneratedBoard.tileColor(configuredTile.tile), [
      hexCenter,
      vertex0,
      vertex1]);
  }

  static renderFishery(display: ROT.Display, configuredTile: ConfiguredTile, inside: boolean) {
    const options = display._options;

    // These calculations copied from rot.js to help ensure consistency.
    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuredTile.coordinate.x, configuredTile.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const vertex0 = edgePositionStartPoint(configuredTile.coordinate.positions[0]);
    const vertex1 = edgePositionStartPoint(configuredTile.coordinate.positions[1]);
    const vertex2 = edgePositionStartPoint((configuredTile.coordinate.positions[1] + 1) % 6);
    const offset = vertex1.diff(hexCenter).scale(inside ? -.5 : .5);

    GeneratedBoard.renderPolygon(display, GeneratedBoard.tileColor(configuredTile.tile), [
      vertex0,
      vertex1,
      vertex2,
      vertex2.translate(offset),
      vertex1.translate(offset),
      vertex0.translate(offset)
    ]);

    GeneratedBoard.renderText(
        display,
        options.fg,
        vertex1.translate(offset.scale(.5 + (inside ? .0625 : -.0625))),
        GeneratedBoard.chitsToString(configuredTile.chits));
  }

  static hexCenter(hexSize: number, x: number, y: number) {
    return new Cartesian2D(
        (x + 1) * (hexSize * Math.sqrt(3) / 2),
        (y * 1.5 + 1) * hexSize);
  }

  static renderPolygon(display: ROT.Display, color: string, points: Cartesian2D[]): void {
    const canvas = display.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    const options = display._options;

    context.strokeStyle = options.fg;
    context.fillStyle = color;
    context.lineWidth = 1;

    context.beginPath();

    context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    points.forEach((point) => context.lineTo(point.x, point.y));

    context.stroke();
    context.fill();
  }

  static renderText(display: ROT.Display, color: string, coordinate: Cartesian2D, text: string) {
    const canvas = display.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    const options = display._options;

    context.strokeStyle = options.fg;
    context.fillStyle = color;

    context.fillText(text, coordinate.x, coordinate.y);
  }

  static chitsToString(chits: Chits.Chits) {
    return chits.values.toString().replace(/,/g, ' ');
  }

  static edgePositionStartPoint(edgePosition: Coordinates.EdgePosition, hexCenter: Cartesian2D, hexSize: number, border: number): Cartesian2D {
    const spacingX = hexSize * Math.sqrt(3) / 2;

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

  static tileColor(tile: Tiles.Tile): string {
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
      boardGenerator: new Boards.BoardGenerator(Configurations.BASE_FISHERMEN_CONFIGURATION),
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
