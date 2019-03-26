// export module Coordinates {
  export enum EdgePosition {
    TOP_RIGHT,
    RIGHT,
    BOTTOM_RIGHT,
    BOTTOM_LEFT,
    LEFT,
    TOP_LEFT
  }

  export enum VertexPosition {
    TOP,
    TOP_RIGHT,
    BOTTOM_RIGHT,
    BOTTOM,
    BOTTOM_LEFT,
    TOP_LEFT
  }

  export class Coordinate {
    constructor(
        public x: number,
        public y: number,
        public edgePositions: EdgePosition[] = HEXAGON_EDGE_POSITIONS) {}
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
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5)];
  export const BASE_3_4_HARBOR_COORDINATES = [
    new Coordinate(2, 0, [BOTTOM_RIGHT]),
    new Coordinate(6, 0, [BOTTOM_LEFT]),
    new Coordinate(9, 1, [BOTTOM_LEFT]),
    new Coordinate(0, 2, [RIGHT]),
    new Coordinate(11, 3, [LEFT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(9, 5, [TOP_LEFT]),
    new Coordinate(6, 6, [TOP_LEFT]),
    new Coordinate(2, 6, [TOP_RIGHT])];
  export const BASE_3_4_FISHERY_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(1, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(10, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(10, 4, [LEFT, TOP_LEFT]),
    new Coordinate(1, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(4, 6, [TOP_LEFT, TOP_RIGHT])];

  export const EXT_5_6_TERRAIN_COORDINATES = [
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
  export const EXT_5_6_HARBOR_COORDINATES = [
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
  export const EXT_5_6_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(11, 3, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(13, 5, [LEFT, TOP_LEFT]),
    new Coordinate(10, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(3, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(6, 8, [TOP_LEFT, TOP_RIGHT])];

  export const EXT_7_8_TERRAIN_COORDINATES = [
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
  export const EXT_7_8_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT]),
    new Coordinate(8, 0, [BOTTOM_LEFT]),
    new Coordinate(10, 0, [BOTTOM_RIGHT]),
    new Coordinate(13, 1, [BOTTOM_LEFT]),
    new Coordinate(1, 3, [RIGHT]),
    new Coordinate(16, 4, [LEFT]),
    new Coordinate(1, 5, [TOP_RIGHT]),
    new Coordinate(2, 6, [RIGHT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(4, 8, [TOP_RIGHT]),
    new Coordinate(10, 8, [TOP_LEFT])];
  export const EXT_7_8_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(11, 1, [TOP_RIGHT, RIGHT]),
    new Coordinate(2, 2, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(13, 3, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 5, [BOTTOM_LEFT, LEFT]),
    new Coordinate(15, 5, [LEFT, TOP_LEFT]),
    new Coordinate(11, 7, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(6, 8, [TOP_LEFT, TOP_RIGHT])];

  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5)];
  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT]),
    new Coordinate(1, 1, [RIGHT]),
    new Coordinate(7, 1, [LEFT]),
    new Coordinate(0, 2, [BOTTOM_RIGHT]),
    new Coordinate(0, 4, [TOP_RIGHT]),
    new Coordinate(8, 4, [TOP_LEFT]),
    new Coordinate(1, 5, [RIGHT]),
    new Coordinate(7, 5, [LEFT])];
  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(2, 2, [LEFT, TOP_LEFT]),
    new Coordinate(8, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(6, 4, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(4, 6, [TOP_LEFT, TOP_RIGHT])];
  export const BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(9, 1),
    new Coordinate(10, 2),
    new Coordinate(11, 3),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7)];

  export const BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(11, 1),
    new Coordinate(12, 2),
    new Coordinate(13, 3),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(12, 6),
    new Coordinate(14, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];

  export const EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = EXT_5_6_TERRAIN_COORDINATES
      .map((c) => new Coordinate(c.x + 2, c.y, c.edgePositions));
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES = [
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
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(5, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 2, [BOTTOM_LEFT, LEFT]),
    new Coordinate(5, 3, [LEFT, TOP_LEFT]),
    new Coordinate(4, 4, [BOTTOM_LEFT, LEFT]),
    new Coordinate(14, 4, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(14, 6, [LEFT, TOP_LEFT]),
    new Coordinate(4, 6, [TOP_RIGHT, RIGHT]),
    new Coordinate(11, 7, [RIGHT, BOTTOM_RIGHT])];
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
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

  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = EXT_7_8_TERRAIN_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edgePositions));
  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES = EXT_7_8_HARBOR_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edgePositions));
  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = EXT_7_8_FISHERY_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edgePositions));
  export const EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(6, 0),
    new Coordinate(8, 0),
    new Coordinate(10, 0),
    new Coordinate(12, 0),
    new Coordinate(14, 0),
    new Coordinate(16, 0),
    new Coordinate(5, 1),
    new Coordinate(17, 1),
    new Coordinate(4, 2),
    new Coordinate(18, 2),
    new Coordinate(3, 3),
    new Coordinate(19, 3),
    new Coordinate(2, 4),
    new Coordinate(20, 4),
    new Coordinate(1, 5),
    new Coordinate(21, 5),
    new Coordinate(2, 6),
    new Coordinate(20, 6),
    new Coordinate(3, 7),
    new Coordinate(19, 7),
    new Coordinate(4, 8),
    new Coordinate(18, 8),
    new Coordinate(5, 9),
    new Coordinate(17, 9),
    new Coordinate(6, 10),
    new Coordinate(8, 10),
    new Coordinate(10, 10),
    new Coordinate(12, 10),
    new Coordinate(14, 10),
    new Coordinate(16, 10)];

  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_COORDINATES = [
      new Coordinate(10, 0),
      new Coordinate(3, 1),
      new Coordinate(5, 1),
      new Coordinate(9, 1),
      new Coordinate(11, 1),
      new Coordinate(2, 2),
      new Coordinate(4, 2),
      new Coordinate(8, 2),
      new Coordinate(10, 2),
      new Coordinate(12, 2),
      new Coordinate(4, 4),
      new Coordinate(6, 4),
      new Coordinate(10, 4),
      new Coordinate(12, 4),
      new Coordinate(3, 5),
      new Coordinate(5, 5),
      new Coordinate(9, 5),
      new Coordinate(11, 5),
      new Coordinate(4, 6),
      new Coordinate(6, 6)];
  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_HARBOR_COORDINATES = [
      new Coordinate(8, 0, [BOTTOM_RIGHT]),
      new Coordinate(1, 1, [BOTTOM_RIGHT]),
      new Coordinate(13, 1, [BOTTOM_LEFT]),
      new Coordinate(6, 2, [TOP_LEFT]),
      new Coordinate(5, 3, [BOTTOM_LEFT]),
      new Coordinate(11, 3, [TOP_RIGHT]),
      new Coordinate(8, 4, [BOTTOM_RIGHT]),
      new Coordinate(13, 5, [TOP_LEFT]),
      new Coordinate(2, 6, [TOP_RIGHT])];
  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_FISHERY_COORDINATES = [
      new Coordinate(4, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
      new Coordinate(3, 3, [TOP_LEFT, TOP_RIGHT]),
      new Coordinate(11, 3, [BOTTOM_RIGHT, BOTTOM_LEFT]),
      new Coordinate(10, 6, [TOP_LEFT, TOP_RIGHT])];

  export const BASE_3_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
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
  export const BASE_3_EXP_SEA_SCEN_FI_HARBOR_COORDINATES = [
    new Coordinate(3, 1, [RIGHT]),
    new Coordinate(7, 1, [BOTTOM_LEFT]),
    new Coordinate(2, 2, [BOTTOM_RIGHT]),
    new Coordinate(1, 3, [BOTTOM_RIGHT]),
    new Coordinate(14, 4, [LEFT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(10, 8, [TOP_LEFT])];
  export const BASE_3_EXP_SEA_SCENS_FI_FISHERY_COORDINATES = [
    new Coordinate(10, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(13, 1, [BOTTOM_LEFT, LEFT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(1, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(4, 8, [TOP_LEFT, TOP_RIGHT])];
  export const BASE_3_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES = [
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

  export const BASE_4_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
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
  export const BASE_4_EXP_SEA_SCEN_FI_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_LEFT]),
    new Coordinate(1, 1, [RIGHT]),
    new Coordinate(0, 2, [BOTTOM_RIGHT]),
    new Coordinate(0, 4, [RIGHT]),
    new Coordinate(14, 4, [TOP_LEFT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(8, 8, [TOP_LEFT]),
    new Coordinate(10, 8, [TOP_RIGHT])];
  export const BASE_4_EXP_SEA_SCENS_FI_FISHERY_COORDINATES = [
    new Coordinate(9, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(11, 1, [TOP_RIGHT, RIGHT]),
    new Coordinate(2, 2, [LEFT, TOP_LEFT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(2, 6, [BOTTOM_LEFT, LEFT]),
    new Coordinate(3, 7, [BOTTOM_RIGHT, BOTTOM_LEFT])];
  export const BASE_4_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES = [
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

  export const EXT_5_6_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_FI_HARBOR_COORDINATES = [
    new Coordinate(9, 3, [BOTTOM_RIGHT]),
    new Coordinate(6, 4, [BOTTOM_RIGHT]),
    new Coordinate(14, 4, [BOTTOM_LEFT]),
    new Coordinate(2, 6, [RIGHT]),
    new Coordinate(18, 6, [LEFT]),
    new Coordinate(4, 8, [TOP_LEFT]),
    new Coordinate(8, 8, [TOP_RIGHT]),
    new Coordinate(14, 8, [TOP_LEFT]),
    new Coordinate(16, 8, [TOP_RIGHT])];
  export const EXT_5_6_EXP_SEA_SCENS_FI_FISHERY_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(16, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(1, 1, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(19, 1, [BOTTOM_LEFT, LEFT]),
    new Coordinate(5, 5, [LEFT, TOP_LEFT]),
    new Coordinate(15, 5, [TOP_RIGHT, RIGHT]),
    new Coordinate(3, 7, [BOTTOM_LEFT, LEFT]),
    new Coordinate(17, 7, [RIGHT, BOTTOM_RIGHT])];
  export const EXT_5_6_EXP_SEA_SCEN_FI_GOLD_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(17, 1)];
  export const EXT_5_6_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(14, 2),
    new Coordinate(16, 2),
    new Coordinate(18, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(15, 3),
    new Coordinate(17, 3),
    new Coordinate(19, 3),
    new Coordinate(2, 4),
    new Coordinate(18, 4),
    new Coordinate(1, 5),
    new Coordinate(19, 5)];

  export const BASE_3_4_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(8, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5)];
  export const BASE_3_4_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES = [
    new Coordinate(8, 2),
    new Coordinate(6, 4)];
  export const BASE_3_4_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES = [
    new Coordinate(6, 2),
    new Coordinate(4, 4)];
  export const BASE_3_4_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES = [new Coordinate(4, 2)];
  export const BASE_3_4_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES = [
    new Coordinate(2, 2),
    new Coordinate(2, 4)];
  export const BASE_3_4_EXP_TB_SCEN_ROC_RIVER_COORDINATES = [
    new Coordinate(2, 2, [RIGHT, TOP_LEFT]),
    new Coordinate(4, 2, [RIGHT, LEFT]),
    new Coordinate(6, 2, [RIGHT, LEFT]),
    new Coordinate(8, 2, [LEFT]),
    new Coordinate(2, 4, [RIGHT, BOTTOM_LEFT]),
    new Coordinate(4, 4, [RIGHT, LEFT]),
    new Coordinate(6, 4, [LEFT])];

  export const EXT_5_6_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(4, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(3, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(2, 4),
    new Coordinate(6, 4),
    new Coordinate(3, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(4, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(5, 7),
    new Coordinate(9, 7)];
  export const EXT_5_6_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES = [
    new Coordinate(5, 3),
    new Coordinate(4, 4),
    new Coordinate(8, 4)];
  export const EXT_5_6_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES = [
    new Coordinate(6, 2),
    new Coordinate(5, 5)];
  export const EXT_5_6_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES = [
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(6, 6)];
  export const EXT_5_6_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(7, 7)];
  export const EXT_5_6_EXP_TB_SCEN_ROC_RIVER_COORDINATES = [
    new Coordinate(7, 1, [BOTTOM_LEFT, TOP_LEFT]),
    new Coordinate(6, 2, [TOP_RIGHT, BOTTOM_LEFT]),
    new Coordinate(5, 3, [TOP_RIGHT]),
    new Coordinate(4, 4, [BOTTOM_RIGHT]),
    new Coordinate(8, 4, [RIGHT]),
    new Coordinate(10, 4, [RIGHT, LEFT]),
    new Coordinate(12, 4, [TOP_RIGHT, LEFT]),
    new Coordinate(5, 5, [BOTTOM_RIGHT, TOP_LEFT]),
    new Coordinate(6, 6, [BOTTOM_RIGHT, TOP_LEFT]),
    new Coordinate(7, 7, [BOTTOM_LEFT, TOP_LEFT])];

  export const EXT_7_8_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(4, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(3, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(8, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(11, 7)];
  export const EXT_7_8_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES = [
    new Coordinate(5, 3),
    new Coordinate(6, 4),
    new Coordinate(10, 4)];
  export const EXT_7_8_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES = [
    new Coordinate(6, 2),
    new Coordinate(7, 5)];
  export const EXT_7_8_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES = [
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(8, 6)];
  export const EXT_7_8_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(9, 7)];
  export const EXT_7_8_EXP_TB_SCEN_ROC_RIVER_COORDINATES = [
    new Coordinate(7, 1, [BOTTOM_LEFT, TOP_LEFT]),
    new Coordinate(6, 2, [TOP_RIGHT, BOTTOM_LEFT]),
    new Coordinate(5, 3, [TOP_RIGHT]),
    new Coordinate(6, 4, [BOTTOM_RIGHT]),
    new Coordinate(10, 4, [RIGHT]),
    new Coordinate(12, 4, [RIGHT, LEFT]),
    new Coordinate(14, 4, [TOP_RIGHT, LEFT]),
    new Coordinate(7, 5, [BOTTOM_RIGHT, TOP_LEFT]),
    new Coordinate(8, 6, [BOTTOM_RIGHT, TOP_LEFT]),
    new Coordinate(9, 7, [BOTTOM_LEFT, TOP_LEFT])];

  export const BASE_3_4_EXP_TB_SCEN_CAR_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5)];
  export const BASE_3_4_EXP_TB_SCEN_CAR_OASIS_COORDINATES = [
    new Coordinate(5, 3)];

  export const EXT_5_6_EXP_TB_SCEN_CAR_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(3, 3),
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
    new Coordinate(11, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7)];
  export const EXT_5_6_EXP_TB_SCEN_CAR_OASIS_COORDINATES = [
    new Coordinate(5, 3),
    new Coordinate(9, 5)];

  export const EXT_7_8_EXP_TB_SCEN_CAR_PRODUCING_TERRAIN_COORDINATES = [
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
  export const EXT_7_8_EXP_TB_SCEN_CAR_OASIS_COORDINATES = [
    new Coordinate(5, 3),
    new Coordinate(11, 5)];

  export const BASE_3_4_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5)];
  export const BASE_3_4_EXP_TB_SCEN_TB_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(1, 3),
    new Coordinate(7, 5)];

  export const EXT_5_6_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_COORDINATES = [
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
  export const EXT_5_6_EXP_TB_SCEN_TB_CASTLE_TERRAIN_COORDINATES = [
    new Coordinate(8, 4)];
  export const EXT_5_6_EXP_TB_SCEN_TB_GLASSWORKS_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(14, 4),
    new Coordinate(5, 7)];
  export const EXT_5_6_EXP_TB_SCEN_TB_QUARRY_TERRAIN_COORDINATES = [
    new Coordinate(11, 1),
    new Coordinate(2, 4),
    new Coordinate(11, 7)];
  export const EXT_5_6_EXP_TB_SCEN_TB_HARBOR_COORDINATES = [
    new Coordinate(4, 0, [BOTTOM_RIGHT]),
    new Coordinate(8, 0, [BOTTOM_LEFT]),
    new Coordinate(13, 1, [BOTTOM_LEFT]),
    new Coordinate(1, 3, [RIGHT]),
    new Coordinate(16, 4, [LEFT]),
    new Coordinate(1, 5, [TOP_RIGHT]),
    new Coordinate(2, 6, [RIGHT]),
    new Coordinate(14, 6, [TOP_LEFT]),
    new Coordinate(13, 7, [LEFT]),
    new Coordinate(4, 8, [TOP_RIGHT]),
    new Coordinate(10, 8, [TOP_LEFT])];
  export const EXT_5_6_EXP_TB_SCEN_TB_FISHERY_COORDINATES = [
    new Coordinate(6, 0, [BOTTOM_RIGHT, BOTTOM_LEFT]),
    new Coordinate(11, 1, [TOP_LEFT, TOP_RIGHT]),
    new Coordinate(4, 2, [LEFT, TOP_LEFT]),
    new Coordinate(15, 3, [BOTTOM_LEFT, LEFT]),
    new Coordinate(2, 4, [LEFT, TOP_LEFT]),
    new Coordinate(12, 6, [RIGHT, BOTTOM_RIGHT]),
    new Coordinate(3, 7, [TOP_RIGHT, RIGHT]),
    new Coordinate(8, 8, [TOP_LEFT, TOP_RIGHT])];
// }
