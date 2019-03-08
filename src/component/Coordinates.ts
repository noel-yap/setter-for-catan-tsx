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

  export const BASE_3_4_TERRAIN_COORDINATES = [
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
    new Coordinate(8, 5)];
  export const EXTENSION_5_6_TERRAIN_COORDINATES = [
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
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7)];
  export const EXTENSION_7_8_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];

  export const BASE_3_4_HARBOR_COORDINATES = [
    new Coordinate(3, 0, [BOTTOM_RIGHT]),
    new Coordinate(7, 0, [BOTTOM_LEFT]),
    new Coordinate(10, 1, [BOTTOM_LEFT]),
    new Coordinate(1, 2, [RIGHT]),
    new Coordinate(12, 3, [LEFT]),
    new Coordinate(1, 4, [RIGHT]),
    new Coordinate(10, 5, [TOP_LEFT]),
    new Coordinate(7, 6, [TOP_LEFT]),
    new Coordinate(3, 6, [TOP_RIGHT])];
  export const EXTENSION_5_6_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT]),
    new Coordinate(8, 0, [BOTTOM_LEFT]),
    new Coordinate(11, 1, [BOTTOM_LEFT]),
    new Coordinate(1, 3, [RIGHT]),
    new Coordinate(14, 4, [LEFT]),
    new Coordinate(1, 5, [TOP_RIGHT]),
    new Coordinate(2, 6, [RIGHT]),
    new Coordinate(12, 6, [TOP_LEFT]),
    new Coordinate(11, 7, [LEFT]),
    new Coordinate(8, 8, [TOP_LEFT]),
    new Coordinate(4, 8, [TOP_RIGHT])];
  export const EXTENSION_7_8_HARBOR_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT]),
    new Coordinate(12, 0, [BOTTOM_LEFT]),
    new Coordinate(3, 1, [RIGHT]),
    new Coordinate(2, 2, [BOTTOM_RIGHT]),
    new Coordinate(14, 2, [LEFT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(15, 5, [LEFT]),
    new Coordinate(2, 6, [RIGHT]),
    new Coordinate(4, 8, [TOP_RIGHT]),
    new Coordinate(6, 8, [TOP_LEFT]),
    new Coordinate(10, 8, [TOP_LEFT])];

  export const BASE_3_4_FISHERY_COORDINATES = [
    new Coordinate(5, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(2, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(11, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(11, 4, [LEFT, TOP_LEFT]),
    new Coordinate(2, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(5, 6, [TOP_LEFT, TOP_RIGHT])];
  export const EXTENSION_5_6_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(11, 3, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(13, 5, [LEFT, TOP_LEFT]),
    new Coordinate(10, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(3, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(6, 8, [TOP_LEFT, TOP_RIGHT])];

  export const BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(4, 1),
    new Coordinate(6, 1),
    new Coordinate(3, 2),
    new Coordinate(5, 2),
    new Coordinate(7, 2),
    new Coordinate(9, 2),
    new Coordinate(4, 3),
    new Coordinate(6, 3),
    new Coordinate(8, 3),
    new Coordinate(10, 3),
    new Coordinate(3, 4),
    new Coordinate(5, 4),
    new Coordinate(7, 4),
    new Coordinate(9, 4),
    new Coordinate(4, 5),
    new Coordinate(6, 5)];
  export const BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(8, 1),
    new Coordinate(2, 3),
    new Coordinate(8, 5)];
  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(7, 7),
    new Coordinate(9, 7)];
  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES = [
    new Coordinate(8, 4)];
  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES = [
    new Coordinate(11, 1),
    new Coordinate(2, 4),
    new Coordinate(11, 7)];
  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(14, 4),
    new Coordinate(5, 7)];

  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES = [
    new Coordinate(10, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(5, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(13, 1, [BOTTOM_LEFT, LEFT]),
    new Coordinate(1, 3, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 4, [TOP_RIGHT, RIGHT]),
    new Coordinate(1, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(11, 7, [BOTTOM_RIGHT, BOTTOM_LEFT])];

// }
