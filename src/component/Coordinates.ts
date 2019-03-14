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
  export const BASE_3_4_FISHERY_COORDINATES = [
    new Coordinate(5, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(2, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(11, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(11, 4, [LEFT, TOP_LEFT]),
    new Coordinate(2, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(5, 6, [TOP_LEFT, TOP_RIGHT])];

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
  export const EXTENSION_5_6_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(11, 3, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(13, 5, [LEFT, TOP_LEFT]),
    new Coordinate(10, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(3, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(6, 8, [TOP_LEFT, TOP_RIGHT])];

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
  export const EXTENSION_7_8_HARBOR_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT]),
    new Coordinate(12, 0, [BOTTOM_LEFT]),
    new Coordinate(3, 1, [RIGHT]),
    new Coordinate(2, 2, [BOTTOM_RIGHT]),
    new Coordinate(14, 2, [LEFT]),
    new Coordinate(15, 3, [BOTTOM_LEFT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(15, 5, [LEFT]),
    new Coordinate(3, 7, [TOP_RIGHT]),
    new Coordinate(6, 8, [TOP_LEFT]),
    new Coordinate(8, 8, [TOP_RIGHT]),
    new Coordinate(12, 8, [TOP_LEFT])];
  export const EXTENSION_7_8_FISHERY_COORDINATES = [
    new Coordinate(10, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(5, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(1, 3, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(13, 3, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(14, 6, [LEFT, TOP_LEFT]),
    new Coordinate(5, 7, [BOTTOM_LEFT, LEFT]),
    new Coordinate(10, 8, [TOP_LEFT, TOP_RIGHT])];

  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(4, 1),
    new Coordinate(6, 1),
    new Coordinate(3, 2),
    new Coordinate(5, 2),
    new Coordinate(7, 2),
    new Coordinate(2, 3),
    new Coordinate(4, 3),
    new Coordinate(6, 3),
    new Coordinate(8, 3),
    new Coordinate(3, 4),
    new Coordinate(5, 4),
    new Coordinate(7, 4),
    new Coordinate(4, 5),
    new Coordinate(6, 5)];
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(5, 0, [BOTTOM_RIGHT]),
    new Coordinate(2, 1, [RIGHT]),
    new Coordinate(8, 1, [LEFT]),
    new Coordinate(1, 2, [BOTTOM_RIGHT]),
    new Coordinate(1, 4, [TOP_RIGHT]),
    new Coordinate(9, 4, [TOP_LEFT]),
    new Coordinate(2, 5, [RIGHT]),
    new Coordinate(8, 5, [LEFT])];
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(3, 2, [LEFT, TOP_LEFT]),
    new Coordinate(9, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(7, 4, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(5, 6, [TOP_LEFT, TOP_RIGHT])];
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(10, 1),
    new Coordinate(11, 2),
    new Coordinate(12, 3),
    new Coordinate(11, 4),
    new Coordinate(13, 4),
    new Coordinate(12, 5),
    new Coordinate(14, 5),
    new Coordinate(11, 6),
    new Coordinate(13, 6),
    new Coordinate(4, 7),
    new Coordinate(6, 7),
    new Coordinate(8, 7),
    new Coordinate(10, 7)];

  export const BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(12, 1),
    new Coordinate(13, 2),
    new Coordinate(14, 3),
    new Coordinate(13, 4),
    new Coordinate(15, 4),
    new Coordinate(14, 5),
    new Coordinate(16, 5),
    new Coordinate(13, 6),
    new Coordinate(15, 6),
    new Coordinate(6, 7),
    new Coordinate(8, 7),
    new Coordinate(10, 7),
    new Coordinate(12, 7)];

  export const EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = EXTENSION_5_6_TERRAIN_COORDINATES
      .map((c) => new Coordinate(c.x + 2, c.y, c.positions));
  export const EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT]),
    new Coordinate(10, 0, [BOTTOM_LEFT]),
    new Coordinate(13, 1, [BOTTOM_LEFT]),
    new Coordinate(4, 2, [RIGHT]),
    new Coordinate(3, 3, [BOTTOM_RIGHT]),
    new Coordinate(15, 3, [BOTTOM_LEFT]),
    new Coordinate(3, 5, [RIGHT]),
    new Coordinate(15, 5, [LEFT]),
    new Coordinate(5, 7, [TOP_RIGHT]),
    new Coordinate(13, 7, [TOP_LEFT]),
    new Coordinate(8, 8, [TOP_RIGHT])];
  export const EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(5, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(5, 3, [LEFT, TOP_LEFT]),
    new Coordinate(4, 4, [BOTTOM_LEFT, LEFT]),
    new Coordinate(14, 4, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 6, [LEFT, TOP_LEFT]),
    new Coordinate(4, 6, [TOP_RIGHT, RIGHT]),
    new Coordinate(11, 7, [RIGHT, BOTTOM_RIGHT])];
  export const EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(16, 2),
    new Coordinate(1, 3),
    new Coordinate(17, 3),
    new Coordinate(0, 4),
    new Coordinate(18, 4),
    new Coordinate(1, 5),
    new Coordinate(17, 5),
    new Coordinate(2, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(15, 7)];

  export const EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = EXTENSION_7_8_TERRAIN_COORDINATES
      .map((c) => new Coordinate(c.x + 2, c.y + 1, c.positions));
  export const EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES = EXTENSION_7_8_HARBOR_COORDINATES
      .map((c) => new Coordinate(c.x + 2, c.y + 1, c.positions));
  export const EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES = EXTENSION_7_8_FISHERY_COORDINATES
      .map((c) => new Coordinate(c.x + 2, c.y + 1, c.positions));
  export const EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(5, 0),
    new Coordinate(7, 0),
    new Coordinate(9, 0),
    new Coordinate(11, 0),
    new Coordinate(13, 0),
    new Coordinate(15, 0),
    new Coordinate(4, 1),
    new Coordinate(16, 1),
    new Coordinate(3, 2),
    new Coordinate(17, 2),
    new Coordinate(2, 3),
    new Coordinate(18, 3),
    new Coordinate(1, 4),
    new Coordinate(19, 4),
    new Coordinate(0, 5),
    new Coordinate(20, 5),
    new Coordinate(1, 6),
    new Coordinate(19, 6),
    new Coordinate(2, 7),
    new Coordinate(18, 7),
    new Coordinate(3, 8),
    new Coordinate(17, 8),
    new Coordinate(4, 9),
    new Coordinate(16, 9),
    new Coordinate(5, 10),
    new Coordinate(7, 10),
    new Coordinate(9, 10),
    new Coordinate(11, 10),
    new Coordinate(13, 10),
    new Coordinate(15, 10)];

  export const BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(12, 4),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];
  export const BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES = [
    new Coordinate(3, 1, [RIGHT]),
    new Coordinate(7, 1, [BOTTOM_LEFT]),
    new Coordinate(2, 2, [BOTTOM_RIGHT]),
    new Coordinate(1, 3, [BOTTOM_RIGHT]),
    new Coordinate(14, 4, [LEFT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(10, 8, [TOP_LEFT])];
  export const BASE_3_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES = [
    new Coordinate(10, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(13, 1, [BOTTOM_LEFT, LEFT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(1, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(4, 8, [TOP_LEFT, TOP_RIGHT])];
  export const BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(9, 3),
    new Coordinate(8, 4),
    new Coordinate(7, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7)];

  export const BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(13, 3),
    new Coordinate(2, 4),
    new Coordinate(12, 4),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];
  export const BASE_4_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_LEFT]),
    new Coordinate(1, 1, [RIGHT]),
    new Coordinate(0, 2, [BOTTOM_RIGHT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(14, 4, [TOP_LEFT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(8, 8, [TOP_LEFT]),
    new Coordinate(10, 8, [TOP_RIGHT])];
  export const BASE_4_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES = [
    new Coordinate(9, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(11, 1, [TOP_RIGHT, RIGHT]),
    new Coordinate(2, 2, [LEFT, TOP_LEFT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(2, 6, [BOTTOM_LEFT, LEFT]),
    new Coordinate(3, 7, [BOTTOM_RIGHT, BOTTOM_LEFT])];
  export const BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(5, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(3, 7)];

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

  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES = [
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
  export const EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES = [
    new Coordinate(10, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(5, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(13, 1, [BOTTOM_LEFT, LEFT]),
    new Coordinate(1, 3, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 4, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(13, 7, [LEFT, TOP_LEFT]),
    new Coordinate(7, 7, [BOTTOM_RIGHT, BOTTOM_LEFT])];
// }
