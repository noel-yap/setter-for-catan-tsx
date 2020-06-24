import _ from 'underscore';

import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import * as ROT from 'rot-js';
import Hex from 'rot-js/lib/display/hex';
import {DisplayOptions} from 'rot-js/lib/display/types';

import * as Boards from './component/Boards';
import * as Chits from './component/Chits';
import * as Configuration from './component/Configuration';
import * as Coordinates from './component/Coordinates';
import * as Markers from './component/Markers';
import * as Specifications from './component/Specifications';
import * as Tiles from './component/Tiles';
import {Cartesian2D} from './util/Cartesian2D';

interface GeneratedBoardProps {
  board: Boards.Board
}

interface GeneratedBoardState {}

export class GeneratedBoard extends React.Component<GeneratedBoardProps, GeneratedBoardState> {
  private canvasDivRef = React.createRef<HTMLDivElement>();

  render(): JSX.Element {
    const canvasDiv = this.canvasDivRef.current;
    if (!!canvasDiv) {
      canvasDiv.childNodes.forEach((child) => canvasDiv.removeChild(child));

      canvasDiv.appendChild(this.renderBoard());
    }

    const terrainTilesByType = GeneratedBoard.groupByComponentType(this.props.board.terrainTilesLayout);
    const riverByType = GeneratedBoard.groupByComponentType(this.props.board.riverLayout);
    const fisheryTilesByType = GeneratedBoard.groupByComponentType(this.props.board.fisheryTilesLayout);
    const developmentCardsByType = GeneratedBoard.groupByComponentType(this.props.board.developmentCardsLayout);
    const harborTilesByType = GeneratedBoard.groupByComponentType(this.props.board.harborTilesLayout);
    const victoryPointsByType = GeneratedBoard.groupByComponentType(this.props.board.victoryPointsLayout);
    const chits = _.groupBy(
        this.props.board.terrainTilesLayout
            .concat(this.props.board.fisheryTilesLayout)
            .concat(this.props.board.vertexChitsLayout),
        (component) => {
          return component.chits.values;
        });

    return (
        <div className="row">
          <div>
            <Typography variant="body1">
              Components:
            </Typography>
            <Typography variant="body2">
              {GeneratedBoard.renderBom(terrainTilesByType)}
              {GeneratedBoard.renderBom(riverByType)}
              {GeneratedBoard.renderBom(fisheryTilesByType)}
              {GeneratedBoard.renderBom(chits, 'Chit')}
              {GeneratedBoard.renderBom(harborTilesByType)}
              {GeneratedBoard.renderBom(developmentCardsByType)}
              {GeneratedBoard.renderBom(victoryPointsByType)}
            </Typography>
          </div>
          <div id="generated-board-div" ref={this.canvasDivRef}/>
        </div>);
  }

  renderBoard(): HTMLCanvasElement {
    const displayOptions = {
      layout: 'hex',
      fontSize: 16,
      fg: 'black',
      bg: 'navy',
      width: 30,
      height: 14,
      spacing: 5
    };
    const display = new ROT.Display(displayOptions as Partial<DisplayOptions>);
    console.log(`App.GeneratedBoard.canvas: display.options = ${JSON.stringify(display._options)}`);

    this.props.board.terrainTilesLayout.forEach((configuration) => {
      GeneratedBoard.renderTerrain(display, configuration);
    });

    window.requestAnimationFrame(() => {
      this.props.board.harborTilesLayout.forEach((configuration) => {
        GeneratedBoard.renderPort(display, configuration);
      });
    });

    window.requestAnimationFrame(() => {
      this.props.board.developmentCardsLayout.forEach((configuration) => {
        GeneratedBoard.renderDevelopmentCard(display, configuration);
      })
    });

    window.requestAnimationFrame(() => {
      this.props.board.victoryPointsLayout.forEach((configuration) => {
        GeneratedBoard.renderVictoryPoint(display, configuration);
      });
    });

    window.requestAnimationFrame(() => {
      this.props.board.vertexChitsLayout.forEach((configuration) => {
        GeneratedBoard.renderVertexChit(display, configuration);
      });
    });

    window.requestAnimationFrame(() => {
      this.props.board.fisheryTilesLayout.forEach((configuration) => {
        GeneratedBoard.renderFishery(
            display,
            configuration,
            !this.props.board.terrainTilesLayout.some((c) => {
              return c.coordinate.x === configuration.coordinate.x && c.coordinate.y === configuration.coordinate.y;
            }));
      })
    });

    window.requestAnimationFrame(() => {
      this.props.board.riverLayout.forEach((configuration) => {
        GeneratedBoard.renderRiver(
            display,
            configuration,
            this.props.board.terrainTilesLayout.filter((c) => {
              return c.coordinate.x === configuration.coordinate.x && c.coordinate.y === configuration.coordinate.y;
            })[0]);
      });
    });

    window.requestAnimationFrame(() => {
      const options = display._options;
      const hexSize = (display._backend as Hex)._hexSize;

      this.props.board.vertexMarkersLayout.forEach((marker) => {
        const hexCenter = GeneratedBoard.hexCenter(hexSize, marker.coordinate.x, marker.coordinate.y);
        const vertexPositionPoint = _.partial(GeneratedBoard.vertexPositionPoint, _, hexCenter, hexSize, options.border);

        marker.coordinate.vertices.forEach((vertex) => {
          GeneratedBoard.renderMarker(
              display,
              marker,
              vertexPositionPoint(vertex),
              hexSize / 6);
        });
      });
    });

    return display.getContainer() as HTMLCanvasElement;
  }

  static groupByComponentType(components: Configuration.Configuration[]): _.Dictionary<Configuration.Configuration[]> {
    return _.groupBy(components, (component) => {
      return component.tile.type;
    });
  }

  static renderBom(componentsGroupedByType: _.Dictionary<Configuration.Configuration[]>, suffix: string = '') {
    return Object.keys(componentsGroupedByType)
    .map((type: string) => {
      return (
          <ListItem id={`×${type}`} key={type}>
            {componentsGroupedByType[type].length} × {type} {suffix}
          </ListItem>
      );
    });
  }

  static renderTerrain(display: ROT.Display, configuration: Configuration.Configuration) {
    const options = display._options;

    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const draw = _.partial(display.draw.bind(display), configuration.coordinate.x, configuration.coordinate.y);

    if (configuration.coordinate.facePosition === Coordinates.FacePosition.FACE_DOWN) {
        draw('?', 'black', 'white');
    } else {
      const tile = configuration.tile;
      const chits = configuration.chits;

      if (chits.values.length < 2) {
        draw(
            '',
            '',
            GeneratedBoard.tileColor(tile));

        if (chits.odds() > 0) {
          window.requestAnimationFrame(() => {
            GeneratedBoard.renderChit(
                display,
                hexCenter,
                hexSize / 3,
                chits);
          });
        }
      } else {
        draw(
            GeneratedBoard.chitsToString(chits),
            GeneratedBoard.chitTextColor(chits, display._options.fg, GeneratedBoard.tileColor(tile)),
            GeneratedBoard.tileColor(tile, configuration.coordinate.facePosition));
      }
    }

    window.requestAnimationFrame(() => {
      const vertexPositionPoint = _.partial(GeneratedBoard.vertexPositionPoint, _, hexCenter, hexSize, options.border);

      configuration.tile.specialVertices.forEach((vertexPosition) => {
        const vertex = vertexPositionPoint(vertexPosition);
        const midpoint = vertex.translate(hexCenter.diff(vertex).scale(.5));

        const specialVertexColor = ROT.Color.toHex(ROT.Color.interpolate(
            ROT.Color.fromString(GeneratedBoard.tileColor(
                configuration.tile, configuration.coordinate.facePosition)) as [number, number, number],
            ROT.Color.fromString('white') as [number, number, number]));
        GeneratedBoard.renderPolygon(
            display,
            [midpoint, vertex],
            specialVertexColor,
            specialVertexColor);
      });
    });
  }

  static renderPort(display: ROT.Display, configuration: Configuration.Configuration): void {
    const options = display._options;

    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const vertex0 = edgePositionStartPoint(configuration.coordinate.edges[0]);
    const vertex1 = edgePositionStartPoint((configuration.coordinate.edges[0] + 1) % 6);

    GeneratedBoard.renderPolygon(
        display,
        [hexCenter, vertex0, vertex1],
        GeneratedBoard.tileColor(configuration.tile, configuration.coordinate.facePosition));

    const offset = vertex1.translate(vertex0.diff(vertex1).scale(.5)).diff(hexCenter).scale(.6875);
    GeneratedBoard.renderText(
        display,
        options.fg,
        hexCenter.translate(offset),
        configuration.coordinate.facePosition === Coordinates.FacePosition.FACE_UP
            ? configuration.tile === Tiles.GENERIC_HARBOR ? '3:1' : '2:1'
            : '?');
  }

  static renderDevelopmentCard(display: ROT.Display, configuration: Configuration.Configuration) {
    const options = display._options;

    // These calculations copied from rot.js to help ensure consistency.
    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const vertex0 = edgePositionStartPoint(configuration.coordinate.edges[0]);
    const vertex1 = edgePositionStartPoint((configuration.coordinate.edges[0] + 1) % 6);
    const vertex2 = edgePositionStartPoint(configuration.coordinate.edges[1]);
    const vertex3 = edgePositionStartPoint((configuration.coordinate.edges[1] + 1) % 6);

    GeneratedBoard.renderPolygon(
        display,
        [vertex0, vertex1, vertex2, vertex3],
        GeneratedBoard.tileColor(configuration.tile, configuration.coordinate.facePosition));
  }

  static renderVictoryPoint(display: ROT.Display, configuration: Configuration.Configuration) {
    const options = display._options;

    // These calculations copied from rot.js to help ensure consistency.
    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const edgePosition = configuration.coordinate.edges[0];
    const vertex0 = edgePositionStartPoint(edgePosition);
    const vertex1 = edgePositionStartPoint((edgePosition + 1) % 6);

    const midpoint = vertex0.translate(vertex1.diff(vertex0).scale(.5));
    const radius = hexSize / 4;

    GeneratedBoard.renderCircle(display, midpoint, radius, this.tileColor(configuration.tile), 'black');
  }

  static renderVertexChit(display: ROT.Display, configuration: Configuration.Configuration) {
    const options = display._options;

    // These calculations copied from rot.js to help ensure consistency.
    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const vertexPositionPoint = _.partial(GeneratedBoard.vertexPositionPoint, _, hexCenter, hexSize, options.border);

    GeneratedBoard.renderChit(
        display,
        vertexPositionPoint(configuration.coordinate.vertices[0]),
        hexSize / 3,
        configuration.chits);
  }

  static renderChit(
      display: ROT.Display,
      vertex: Cartesian2D,
      radius: number,
      chits: Chits.Chits) {
    GeneratedBoard.renderCircle(display, vertex, radius, this.tileColor(Tiles.CHIT), 'black');
    GeneratedBoard.renderText(
        display,
        GeneratedBoard.chitTextColor(chits, display._options.fg, GeneratedBoard.tileColor(Tiles.CHIT)),
        vertex,
        GeneratedBoard.chitsToString(chits));
  }

  static renderFishery(display: ROT.Display, configuration: Configuration.Configuration, inside: boolean) {
    const options = display._options;

    // These calculations copied from rot.js to help ensure consistency.
    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const vertex0 = edgePositionStartPoint(configuration.coordinate.edges[0]);
    const vertex1 = edgePositionStartPoint(configuration.coordinate.edges[1]);
    const vertex2 = edgePositionStartPoint((configuration.coordinate.edges[1] + 1) % 6);
    const offset = vertex1.diff(hexCenter).scale(inside ? -.5 : .5);

    GeneratedBoard.renderPolygon(
        display,
        [vertex0, vertex1, vertex2, vertex2.translate(offset), vertex1.translate(offset), vertex0.translate(offset)],
        GeneratedBoard.tileColor(configuration.tile, configuration.coordinate.facePosition));

    GeneratedBoard.renderText(
        display,
        GeneratedBoard.chitTextColor(
            configuration.chits,
            display._options.fg,
            GeneratedBoard.tileColor(configuration.tile)),
        vertex1.translate(offset.scale(.5 + (inside ? .0625 : -.0625))),
        GeneratedBoard.chitsToString(configuration.chits));
  }

  static renderRiver(
      display: ROT.Display,
      configuration: Configuration.Configuration,
      underlyingConfiguration: Configuration.Configuration) {
    const options = display._options;

    const hexSize = (display._backend as Hex)._hexSize;
    const hexCenter = GeneratedBoard.hexCenter(hexSize, configuration.coordinate.x, configuration.coordinate.y);

    const edgePositionStartPoint = _.partial(GeneratedBoard.edgePositionStartPoint, _, hexCenter, hexSize, options.border);

    const chitsExist = underlyingConfiguration.chits.odds() !== 0;

    const backgroundLuminance = GeneratedBoard.luminance(GeneratedBoard.tileColor(underlyingConfiguration.tile));
    const lakeColor = GeneratedBoard.tileColor(Tiles.LAKE);
    const seaColor = GeneratedBoard.tileColor(Tiles.SEA);
    const color = Math.abs(backgroundLuminance - GeneratedBoard.luminance(lakeColor)) > Math.abs(backgroundLuminance - GeneratedBoard.luminance(seaColor))
        ? GeneratedBoard.tileColor(Tiles.LAKE)
        : GeneratedBoard.tileColor(Tiles.SEA);

    configuration.coordinate.edges.forEach((position) => {
      const vertex0 = edgePositionStartPoint(position);
      const vertex1 = edgePositionStartPoint((position + 1) % 6);

      const midpoint = vertex0.translate(vertex1.diff(vertex0).scale(.5));

      GeneratedBoard.renderPolygon(
          display,
          [
            chitsExist
                ? hexCenter.translate(midpoint.diff(hexCenter).scale(.5))
                : hexCenter,
            midpoint],
          color,
          color);
    });
  }

  static renderMarker(
      display: ROT.Display,
      marker: Markers.Marker,
      vertex: Cartesian2D,
      radius: number) {
    GeneratedBoard.renderCircle(display, vertex, radius, this.markerColor(marker), 'black');
  }

  static hexCenter(hexSize: number, x: number, y: number) {
    return new Cartesian2D(
        (x + 1) * (hexSize * Math.sqrt(3) / 2),
        (y * 1.5 + 1) * hexSize);
  }

  static renderPolygon(display: ROT.Display, points: Cartesian2D[], fillColor: string, strokeColor ?: string): void {
    const canvas = display.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    const options = display._options;

    context.strokeStyle = strokeColor || options.fg;
    context.fillStyle = fillColor;
    context.lineWidth = 1;

    context.beginPath();

    context.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    points.forEach((point) => context.lineTo(point.x, point.y));

    context.fill();
    context.stroke();
  }

  static renderCircle(display: ROT.Display, center: Cartesian2D, radius: number, fillColor: string, strokeColor ?: string): void {
    const canvas = display.getContainer() as HTMLCanvasElement;
    const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
    const options = display._options;

    context.strokeStyle = strokeColor || options.fg;
    context.fillStyle = fillColor;
    context.lineWidth = 1;

    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);

    context.fill();
    context.stroke();
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
    function getStartVertex(edgePosition: Coordinates.EdgePosition) {
      switch (edgePosition) {
        case Coordinates.TOP_RIGHT: {
          return Coordinates.VertexPosition.TOP;
        }

        case Coordinates.RIGHT: {
          return Coordinates.VertexPosition.TOP_RIGHT;
        }

        case Coordinates.BOTTOM_RIGHT: {
          return Coordinates.VertexPosition.BOTTOM_RIGHT;
        }

        case Coordinates.BOTTOM_LEFT: {
          return Coordinates.VertexPosition.BOTTOM;
        }

        case Coordinates.LEFT: {
          return Coordinates.VertexPosition.BOTTOM_LEFT;
        }

        case Coordinates.TOP_LEFT: {
          return Coordinates.VertexPosition.TOP_LEFT;
        }
      }
    }

    return GeneratedBoard.vertexPositionPoint(getStartVertex(edgePosition), hexCenter, hexSize, border);
  }

  static vertexPositionPoint(vertexPosition: Coordinates.VertexPosition, hexCenter: Cartesian2D, hexSize: number, border: number): Cartesian2D {
    const spacingX = hexSize * Math.sqrt(3) / 2;

    return hexCenter.translate(new Cartesian2D(
        ([Coordinates.VertexPosition.BOTTOM_LEFT, Coordinates.VertexPosition.TOP_LEFT].some((p) => p === vertexPosition)
            ? -1
            : [Coordinates.VertexPosition.TOP, Coordinates.VertexPosition.BOTTOM].some((p) => p === vertexPosition)
                ? 0
                : 1)
        * (spacingX - border),
        ([Coordinates.VertexPosition.TOP, Coordinates.VertexPosition.TOP_RIGHT, Coordinates.VertexPosition.TOP_LEFT].some((p) => p === vertexPosition)
            ? -1
            : 1)
        * ([Coordinates.VertexPosition.TOP, Coordinates.VertexPosition.BOTTOM].some((p) => p === vertexPosition) ? 1 : .5) * hexSize + border));
  }

  static chitTextColor(chits: Chits.Chits, primaryForegroundColor: string, underlyingBackgroundColor: string): string {
      function secondaryColor(backgroundColor: string): string {
        const backgroundLuminance = GeneratedBoard.luminance(backgroundColor);

        return ['crimson', '#C70000', '#FF8C8C', '#FFD3D3']
            .reduce((max: [string, number], color: string): [string, number] => {
              const contrast = Math.abs(backgroundLuminance - GeneratedBoard.luminance(color));

              return contrast > max[1]
                  ? [color, contrast]
                  : max
            }, ['', 0])[0];
      }

      return chits.odds() < 5
        ? primaryForegroundColor
        : secondaryColor(underlyingBackgroundColor);
  }

  static markerColor(marker: Markers.Marker): string {
    switch (marker.type) {
      case Markers.GREAT_BRIDGE_SETTLEMENT_REQUIREMENT: {
        return 'purple';
      }

      case Markers.GREAT_WALL_SETTLEMENTS_REQUIREMENT: {
        return 'yellow';
      }

      case Markers.SETUP_SETTLEMENTS_PROHIBITION: {
        return 'orange';
      }

      default: {
        return 'gray';
      }
    }
  }

  static tileColor(
      tile: Tiles.Tile, facePosition: Coordinates.FacePosition = Coordinates.FacePosition.FACE_UP): string {
    if (facePosition === Coordinates.FacePosition.FACE_DOWN) {
      return 'white';
    } else {
      switch (tile.type) {
        case Tiles.Type.DESERT:
        case Tiles.Type.OASIS: {
          return 'sandybrown';
        }

        case Tiles.Type.BRICK_HARBOR:
        case Tiles.Type.HILL:
        case Tiles.Type.QUARRY: {
          return 'firebrick';
        }

        case Tiles.Type.ORE_HARBOR:
        case Tiles.Type.MOUNTAIN: {
          return 'slategray';
        }

        case Tiles.Type.WOOL_HARBOR:
        case Tiles.Type.PASTURE:
        case Tiles.Type.CASTLE: {
          return 'lawngreen';
        }

        case Tiles.Type.GRAIN_HARBOR:
        case Tiles.Type.FIELD: {
          return 'wheat';
        }

        case Tiles.Type.LUMBER_HARBOR:
        case Tiles.Type.FOREST:
        case Tiles.Type.GLASSWORKS: {
          return 'forestgreen';
        }

        case Tiles.Type.GOLD:
        case Tiles.Type.GENERIC_HARBOR:
        case Tiles.Type.VICTORY_POINT: {
          return 'gold';
        }

        case Tiles.Type.SEA: {
          return 'navy';
        }

        case Tiles.Type.FISHERY:
        case Tiles.Type.LAKE: {
          return 'aqua';
        }

        case Tiles.Type.SWAMP: {
          return 'darkkhaki';
        }

        case Tiles.Type.DEVELOPMENT_CARD: {
          return 'white';
        }

        case Tiles.Type.CHIT: {
          return 'peachpuff';
        }

        default: {
          return 'black';
        }
      }
    }
  }

  static luminance(color: string): number {
    const rgb = ROT.Color.fromString(color);

    return Math.sqrt(
        0.299 * Math.pow(rgb[0], 2)
        + 0.587 * Math.pow(rgb[1], 2)
        + 0.114 * Math.pow(rgb[2], 2));
  }
}

export default GeneratedBoard;