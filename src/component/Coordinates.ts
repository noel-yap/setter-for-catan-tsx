// export module Coordinates {
import * as Configuration from './Configuration';

export enum EdgePosition {
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  LEFT,
  TOP_LEFT,
}

export function edgePositionToInt(
  edgePosition: EdgePosition | string | number
): number {
  return typeof edgePosition === 'string'
    ? EdgePosition[edgePosition as keyof typeof EdgePosition]
    : edgePosition;
}

export enum VertexPosition {
  TOP,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  TOP_LEFT,
}

export function vertexPositionToInt(
  vertexPosition: VertexPosition | string | number
): number {
  return typeof vertexPosition === 'string'
    ? VertexPosition[vertexPosition as keyof typeof VertexPosition]
    : vertexPosition;
}

export enum FacePosition {
  FACE_UP,
  FACE_DOWN,
}

export function facePositionToInt(
  facePosition: FacePosition | string | number
): number {
  return typeof facePosition === 'string'
    ? FacePosition[facePosition as keyof typeof FacePosition]
    : facePosition;
}

export class Coordinate {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public edgePositions: EdgePosition[] = [],
    public vertexPositions: VertexPosition[] = [],
    public facePosition: FacePosition = FacePosition.FACE_UP
  ) {}

  onEdges(...edges: EdgePosition[]): Coordinate {
    // TODO: Set vertices based on edges.
    return new Coordinate(this.x, this.y, edges, [], this.facePosition);
  }

  adjacentCoordinates(): Coordinate[] {
    return [
      new Coordinate(
        this.x - 1,
        this.y - 1,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
      new Coordinate(
        this.x + 1,
        this.y - 1,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
      new Coordinate(
        this.x + 2,
        this.y,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
      new Coordinate(
        this.x + 1,
        this.y + 1,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
      new Coordinate(
        this.x - 1,
        this.y + 1,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
      new Coordinate(
        this.x - 2,
        this.y,
        this.edgePositions,
        this.vertexPositions,
        this.facePosition
      ),
    ].filter(c => c.x >= 0 && c.y >= 0);
  }
}

export function adjacentCoordinates(coordinates: Coordinate[]): Coordinate[] {
  return coordinates
    .flatMap(c => c.adjacentCoordinates())
    .filter((lhs, index, self) => {
      return (
        self.findIndex(rhs => lhs.x === rhs.x && lhs.y === rhs.y) === index
      );
    });
}

export function oddsAtCoordinatesLessThan(
  adjacentCoordinates: Coordinate[],
  odds: number
): (configuration: Configuration.Configuration) => boolean {
  return (configuration: Configuration.Configuration) =>
    configuration.chit.odds() < odds ||
    !adjacentCoordinates.some(
      c =>
        c.x === configuration.coordinate.x && c.y === configuration.coordinate.y
    );
}

export const TOP_RIGHT = EdgePosition.TOP_RIGHT;
export const RIGHT = EdgePosition.RIGHT;
export const BOTTOM_RIGHT = EdgePosition.BOTTOM_RIGHT;
export const BOTTOM_LEFT = EdgePosition.BOTTOM_LEFT;
export const LEFT = EdgePosition.LEFT;
export const TOP_LEFT = EdgePosition.TOP_LEFT;

export const HEXAGON_EDGE_POSITIONS: EdgePosition[] = [
  EdgePosition.TOP_RIGHT,
  EdgePosition.RIGHT,
  EdgePosition.BOTTOM_RIGHT,
  EdgePosition.BOTTOM_LEFT,
  EdgePosition.LEFT,
  EdgePosition.TOP_LEFT,
];

export const HEXAGON_VERTEX_POSITIONS: VertexPosition[] = [
  VertexPosition.TOP,
  VertexPosition.TOP_RIGHT,
  VertexPosition.BOTTOM_RIGHT,
  VertexPosition.BOTTOM,
  VertexPosition.BOTTOM_LEFT,
  VertexPosition.TOP_LEFT,
];
// }
