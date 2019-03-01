export module Coordinates {
  enum EdgePosition {
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
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5)
  ];
  export const BASE_PORT_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT]),
    new Coordinate(8, 0, [BOTTOM_LEFT]),
    new Coordinate(9, 1, [BOTTOM_LEFT]),
    new Coordinate(0, 2, [RIGHT]),
    new Coordinate(13, 3, [LEFT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(9, 5, [TOP_LEFT]),
    new Coordinate(8, 6, [TOP_LEFT]),
    new Coordinate(4, 6, [TOP_RIGHT]),
  ];
  export const BASE_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_LEFT, BOTTOM_RIGHT]),
    new Coordinate(3, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(10, 2, [LEFT, BOTTOM_LEFT]),
    new Coordinate(10, 4, [LEFT, TOP_LEFT]),
    new Coordinate(3, 5, [RIGHT, TOP_RIGHT]),
    new Coordinate(6, 6, [TOP_LEFT, TOP_RIGHT]),
  ];
}
