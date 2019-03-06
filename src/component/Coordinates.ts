// export module Coordinates {
  export enum EdgePosition {
    TOP_RIGHT,
    RIGHT,
    BOTTOM_RIGHT,
    BOTTOM_LEFT,
    LEFT,
    TOP_LEFT
  }

  export class Coordinate {
    constructor(public x: number, public y: number, public positions: EdgePosition[] = HEXAGON_EDGE_POSITIONS) {}
  }

  export const TOP_RIGHT = EdgePosition.TOP_RIGHT;
  export const RIGHT = EdgePosition.RIGHT;
  export const BOTTOM_RIGHT = EdgePosition.BOTTOM_RIGHT;
  export const BOTTOM_LEFT = EdgePosition.BOTTOM_LEFT;
  export const LEFT = EdgePosition.LEFT;
  export const TOP_LEFT = EdgePosition.TOP_LEFT;

  const HEXAGON_EDGE_POSITIONS: EdgePosition[] = [
    EdgePosition.TOP_RIGHT,
    EdgePosition.RIGHT,
    EdgePosition.BOTTOM_RIGHT,
    EdgePosition.BOTTOM_LEFT,
    EdgePosition.LEFT,
    EdgePosition.TOP_LEFT];

  export const BASE_TERRAIN_COORDINATES = [
    new Coordinate(4, 1),
    new Coordinate(6, 1),
    new Coordinate(8, 1),
    new Coordinate(3, 2),
    new Coordinate(5, 2),
    new Coordinate(7, 2),
    new Coordinate(9, 2),
    new Coordinate(2, 3),
    new Coordinate(4, 3),
    new Coordinate(6, 3),
    new Coordinate(8, 3),
    new Coordinate(10, 3),
    new Coordinate(3, 4),
    new Coordinate(5, 4),
    new Coordinate(7, 4),
    new Coordinate(9, 4),
    new Coordinate(4, 5),
    new Coordinate(6, 5),
    new Coordinate(8, 5)
  ];
  export const BASE_PORT_COORDINATES = [
    new Coordinate(3, 0, [BOTTOM_RIGHT]),
    new Coordinate(7, 0, [BOTTOM_LEFT]),
    new Coordinate(10, 1, [BOTTOM_LEFT]),
    new Coordinate(1, 2, [RIGHT]),
    new Coordinate(12, 3, [LEFT]),
    new Coordinate(1, 4, [RIGHT]),
    new Coordinate(10, 5, [TOP_LEFT]),
    new Coordinate(7, 6, [TOP_LEFT]),
    new Coordinate(3, 6, [TOP_RIGHT]),
  ];
  export const BASE_FISHERY_COORDINATES = [
    new Coordinate(5, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(2, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(11, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(11, 4, [LEFT, TOP_LEFT]),
    new Coordinate(2, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(5, 6, [TOP_LEFT, TOP_RIGHT]),
  ];
// }
