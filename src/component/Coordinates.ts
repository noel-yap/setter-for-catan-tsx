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

  export enum FacePosition {
    FACE_UP,
    FACE_DOWN
  }

  export class Coordinate {
    constructor(
        public x: number,
        public y: number,
        public edges: EdgePosition[] = HEXAGON_EDGE_POSITIONS,
        public vertices: VertexPosition[] = HEXAGON_VERTEX_POSITIONS,
        public facePosition: FacePosition = FacePosition.FACE_UP) {}

    onEdges(...edges: EdgePosition[]): Coordinate {
      // TODO: Set vertices based on edges.
      return new Coordinate(
          this.x,
          this.y,
          edges,
          [],
          this.facePosition);
    }
    
    onVertices(...vertices: VertexPosition[]): Coordinate {
      // TODO: Set edges based on vertices.
      return new Coordinate(
          this.x,
          this.y,
          [],
          vertices,
          this.facePosition);
    }
    
    asFaceDown(): Coordinate {
      return new Coordinate(
          this.x,
          this.y,
          this.edges,
          this.vertices,
          FacePosition.FACE_DOWN);
    }
    
    asFaceUp(): Coordinate {
      return new Coordinate(
          this.x,
          this.y,
          this.edges,
          this.vertices,
          FacePosition.FACE_UP);
    }
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

  const HEXAGON_VERTEX_POSITIONS: VertexPosition[] = [
    VertexPosition.TOP,
    VertexPosition.TOP_RIGHT,
    VertexPosition.BOTTOM_RIGHT,
    VertexPosition.BOTTOM,
    VertexPosition.BOTTOM_LEFT,
    VertexPosition.TOP_LEFT];

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
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(6, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(9, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(11, 3).onEdges(LEFT),
    new Coordinate(0, 4).onEdges(RIGHT),
    new Coordinate(9, 5).onEdges(TOP_LEFT),
    new Coordinate(6, 6).onEdges(TOP_LEFT),
    new Coordinate(2, 6).onEdges(TOP_RIGHT)];
  export const BASE_3_4_FISHERY_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(10, 2).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(10, 4).onEdges(LEFT, TOP_LEFT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(4, 6).onEdges(TOP_LEFT, TOP_RIGHT)];

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
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(11, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(1, 3).onEdges(RIGHT),
    new Coordinate(14, 4).onEdges(LEFT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT),
    new Coordinate(2, 6).onEdges(RIGHT),
    new Coordinate(12, 6).onEdges(TOP_LEFT),
    new Coordinate(11, 7).onEdges(LEFT),
    new Coordinate(8, 8).onEdges(TOP_LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT)];
  export const EXT_5_6_FISHERY_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(4, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(11, 3).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(3, 5).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(13, 5).onEdges(LEFT, TOP_LEFT),
    new Coordinate(10, 6).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(3, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(6, 8).onEdges(TOP_LEFT, TOP_RIGHT)];

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
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(10, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(1, 3).onEdges(RIGHT),
    new Coordinate(16, 4).onEdges(LEFT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT),
    new Coordinate(2, 6).onEdges(RIGHT),
    new Coordinate(14, 6).onEdges(TOP_LEFT),
    new Coordinate(13, 7).onEdges(LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT)];
  export const EXT_7_8_FISHERY_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(11, 1).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(2, 2).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(13, 3).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(3, 5).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(15, 5).onEdges(LEFT, TOP_LEFT),
    new Coordinate(11, 7).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(6, 8).onEdges(TOP_LEFT, TOP_RIGHT)];

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
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(1, 1).onEdges(RIGHT),
    new Coordinate(7, 1).onEdges(LEFT),
    new Coordinate(0, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 4).onEdges(TOP_RIGHT),
    new Coordinate(8, 4).onEdges(TOP_LEFT),
    new Coordinate(1, 5).onEdges(RIGHT),
    new Coordinate(7, 5).onEdges(LEFT)];
  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(2, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(8, 2).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(6, 4).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(4, 6).onEdges(TOP_LEFT, TOP_RIGHT)];
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
      .map((c) => new Coordinate(c.x + 2, c.y, c.edges));
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(4, 2).onEdges(RIGHT),
    new Coordinate(3, 3).onEdges(BOTTOM_RIGHT),
    new Coordinate(15, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(3, 5).onEdges(RIGHT),
    new Coordinate(15, 5).onEdges(LEFT),
    new Coordinate(5, 7).onEdges(TOP_RIGHT),
    new Coordinate(13, 7).onEdges(TOP_LEFT),
    new Coordinate(8, 8).onEdges(TOP_RIGHT)];
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = [
    new Coordinate(5, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(14, 2).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(5, 3).onEdges(LEFT, TOP_LEFT),
    new Coordinate(4, 4).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(14, 4).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(14, 6).onEdges(LEFT, TOP_LEFT),
    new Coordinate(4, 6).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(11, 7).onEdges(RIGHT, BOTTOM_RIGHT)];
  export const EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(16, 2),
    new Coordinate(1, 3),
    new Coordinate(17, 3),
    new Coordinate(1, 5),
    new Coordinate(17, 5),
    new Coordinate(2, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(15, 7)];

  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES = EXT_7_8_TERRAIN_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edges));
  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES = EXT_7_8_HARBOR_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edges));
  export const EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES = EXT_7_8_FISHERY_COORDINATES
      .map((c) => new Coordinate(c.x + 3, c.y + 1, c.edges));
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
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(1, 1).onEdges(BOTTOM_RIGHT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(6, 2).onEdges(TOP_LEFT),
    new Coordinate(5, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(11, 3).onEdges(TOP_RIGHT),
    new Coordinate(8, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(13, 5).onEdges(TOP_LEFT),
    new Coordinate(2, 6).onEdges(TOP_RIGHT)];
  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_FISHERY_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(3, 3).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(11, 3).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(10, 6).onEdges(TOP_LEFT, TOP_RIGHT)];

  export const BASE_4_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_COORDINATES = [
    new Coordinate(4, 0),
    new Coordinate(8, 0),
    new Coordinate(10, 0),
    new Coordinate(3, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(7, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(11, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(10, 6)];
  export const BASE_4_EXP_SEA_SCEN_4_ISLANDS_HARBOR_COORDINATES = [
    new Coordinate(12, 0).onEdges(LEFT),
    new Coordinate(1, 1).onEdges(BOTTOM_RIGHT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(8, 2).onEdges(TOP_RIGHT),
    new Coordinate(3, 3).onEdges(TOP_LEFT),
    new Coordinate(11, 3).onEdges(BOTTOM_RIGHT),
    new Coordinate(2, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 4).onEdges(TOP_LEFT),
    new Coordinate(13, 5).onEdges(LEFT)];
  export const BASE_4_EXP_SEA_SCEN_4_ISLANDS_FISHERY_COORDINATES = [
    new Coordinate(2, 0).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(2, 2).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(4, 2).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(10, 4).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(12, 4).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(12, 6).onEdges(LEFT, TOP_LEFT)];

  export const EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(14, 2),
    new Coordinate(16, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(15, 3),
    new Coordinate(3, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(9, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_HARBOR_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(11, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(12, 2).onEdges(TOP_RIGHT),
    new Coordinate(18, 2).onEdges(LEFT),
    new Coordinate(16, 4).onEdges(BOTTOM_LEFT),
    new Coordinate(5, 5).onEdges(BOTTOM_LEFT),
    new Coordinate(13, 5).onEdges(BOTTOM_RIGHT),
    new Coordinate(2, 8).onEdges(TOP_RIGHT),
    new Coordinate(8, 8).onEdges(TOP_RIGHT),
    new Coordinate(14, 8).onEdges(TOP_RIGHT)];
  export const EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_FISHERY_COORDINATES = [
    new Coordinate(14, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(3, 1).onEdges(LEFT, TOP_LEFT),
    new Coordinate(17, 1).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(16, 6).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(4, 8).onEdges(TOP_LEFT, TOP_RIGHT)];

  export const EXT_7_8_EXP_SEA_SCEN_8_ISLANDS_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(15, 1),
    new Coordinate(17, 1),
    new Coordinate(23, 1),
    new Coordinate(25, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(14, 2),
    new Coordinate(16, 2),
    new Coordinate(18, 2),
    new Coordinate(22, 2),
    new Coordinate(24, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(23, 3),
    new Coordinate(3, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(23, 5),
    new Coordinate(25, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(16, 6),
    new Coordinate(18, 6),
    new Coordinate(22, 6),
    new Coordinate(24, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(17, 7),
    new Coordinate(21, 7),
    new Coordinate(23, 7)];
  export const EXT_7_8_EXP_SEA_SCEN_8_ISLANDS_HARBOR_COORDINATES = [
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(16, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(26, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(26, 2).onEdges(LEFT),
    new Coordinate(0, 6).onEdges(RIGHT),
    new Coordinate(26, 6).onEdges(LEFT),
    new Coordinate(2, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT),
    new Coordinate(16, 8).onEdges(TOP_RIGHT),
    new Coordinate(24, 8).onEdges(TOP_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_8_ISLANDS_FISHERY_COORDINATES = [
    new Coordinate(24, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(15, 1).onEdges(LEFT, TOP_LEFT),
    new Coordinate(25, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(11, 7).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(25, 7).onEdges(LEFT, TOP_LEFT),
    new Coordinate(4, 8).onEdges(TOP_LEFT, TOP_RIGHT)];

  export const BASE_3_EXP_SEA_SCEN_OC_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
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
  export const BASE_3_EXP_SEA_SCEN_OC_HARBOR_COORDINATES = [
    new Coordinate(3, 1).onEdges(RIGHT),
    new Coordinate(7, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(2, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(1, 3).onEdges(BOTTOM_RIGHT),
    new Coordinate(14, 4).onEdges(LEFT),
    new Coordinate(14, 6).onEdges(TOP_LEFT),
    new Coordinate(13, 7).onEdges(LEFT),
    new Coordinate(10, 8).onEdges(TOP_LEFT)];
  export const BASE_3_EXP_SEA_SCEN_OC_FISHERY_COORDINATES = [
    new Coordinate(4, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(12, 6).onEdges(RIGHT, BOTTOM_RIGHT)];
  export const BASE_3_EXP_SEA_SCEN_OC_FACE_DOWN_COORDINATES = [
    new Coordinate(9, 1).asFaceDown(),
    new Coordinate(11, 1).asFaceDown(),
    new Coordinate(10, 2).asFaceDown(),
    new Coordinate(12, 2).asFaceDown(),
    new Coordinate(9, 3).asFaceDown(),
    new Coordinate(8, 4).asFaceDown(),
    new Coordinate(7, 5).asFaceDown(),
    new Coordinate(2, 6).asFaceDown(),
    new Coordinate(4, 6).asFaceDown(),
    new Coordinate(6, 6).asFaceDown(),
    new Coordinate(3, 7).asFaceDown(),
    new Coordinate(5, 7).asFaceDown()];

  export const BASE_4_EXP_SEA_SCEN_OC_FACE_UP_PRODUCING_TERRAIN_COORDINATES = [
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
  export const BASE_4_EXP_SEA_SCEN_OC_HARBOR_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(1, 1).onEdges(RIGHT),
    new Coordinate(0, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 4).onEdges(RIGHT),
    new Coordinate(14, 4).onEdges(TOP_LEFT),
    new Coordinate(14, 6).onEdges(TOP_LEFT),
    new Coordinate(13, 7).onEdges(LEFT),
    new Coordinate(8, 8).onEdges(TOP_LEFT),
    new Coordinate(10, 8).onEdges(TOP_RIGHT)];
  export const BASE_4_EXP_SEA_SCEN_OC_FISHERY_COORDINATES = [
    new Coordinate(2, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(1, 3).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(13, 5).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(9, 7).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT)];
  export const BASE_4_EXP_SEA_SCEN_OC_FACE_DOWN_COORDINATES = [
    new Coordinate(9, 1).asFaceDown(),
    new Coordinate(11, 1).asFaceDown(),
    new Coordinate(8, 2).asFaceDown(),
    new Coordinate(10, 2).asFaceDown(),
    new Coordinate(7, 3).asFaceDown(),
    new Coordinate(9, 3).asFaceDown(),
    new Coordinate(6, 4).asFaceDown(),
    new Coordinate(8, 4).asFaceDown(),
    new Coordinate(5, 5).asFaceDown(),
    new Coordinate(2, 6).asFaceDown(),
    new Coordinate(4, 6).asFaceDown(),
    new Coordinate(3, 7).asFaceDown()];

  export const EXT_5_6_EXP_SEA_SCEN_OC_FACE_UP_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(16, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(15, 3),
    new Coordinate(17, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(14, 4),
    new Coordinate(16, 4),
    new Coordinate(1, 5),
    new Coordinate(3, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(2, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_OC_HARBOR_COORDINATES = [
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(6, 2).onEdges(TOP_LEFT),
    new Coordinate(14, 2).onEdges(RIGHT),
    new Coordinate(18, 2).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 4).onEdges(RIGHT),
    new Coordinate(18, 4).onEdges(TOP_LEFT),
    new Coordinate(5, 5).onEdges(LEFT),
    new Coordinate(13, 5).onEdges(BOTTOM_RIGHT),
    new Coordinate(18, 6).onEdges(TOP_LEFT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT),
    new Coordinate(14, 8).onEdges(TOP_LEFT)];
  export const EXT_5_6_EXP_SEA_SCEN_OC_FISHERY_COORDINATES = [
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(17, 1).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(1, 3).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(17, 5).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(0, 6).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(17, 7).onEdges(LEFT, TOP_LEFT)];
  export const EXT_5_6_EXP_SEA_SCEN_OC_FACE_DOWN_COORDINATES = [
    new Coordinate(9, 1).asFaceDown(),
    new Coordinate(11, 1).asFaceDown(),
    new Coordinate(8, 2).asFaceDown(),
    new Coordinate(10, 2).asFaceDown(),
    new Coordinate(12, 2).asFaceDown(),
    new Coordinate(7, 3).asFaceDown(),
    new Coordinate(9, 3).asFaceDown(),
    new Coordinate(11, 3).asFaceDown(),
    new Coordinate(8, 4).asFaceDown(),
    new Coordinate(10, 4).asFaceDown(),
    new Coordinate(7, 5).asFaceDown(),
    new Coordinate(9, 5).asFaceDown(),
    new Coordinate(11, 5).asFaceDown(),
    new Coordinate(6, 6).asFaceDown(),
    new Coordinate(8, 6).asFaceDown(),
    new Coordinate(10, 6).asFaceDown(),
    new Coordinate(7, 7).asFaceDown(),
    new Coordinate(9, 7).asFaceDown()];

  export const EXT_7_8_EXP_SEA_SCEN_OC_FACE_UP_TERRAIN_COORDINATES = [
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(1, 5),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(14, 8),
    new Coordinate(16, 8),
    new Coordinate(18, 8),
    new Coordinate(20, 8),
    new Coordinate(22, 8),
    new Coordinate(13, 9),
    new Coordinate(15, 9),
    new Coordinate(17, 9),
    new Coordinate(19, 9),
    new Coordinate(21, 9),
    new Coordinate(12, 10),
    new Coordinate(14, 10),
    new Coordinate(11, 11),
    new Coordinate(13, 11),
    new Coordinate(10, 12),
    new Coordinate(12, 12)];
  export const EXT_7_8_EXP_SEA_SCEN_OC_HARBOR_COORDINATES = [
    new Coordinate(14, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(10, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(3, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(7, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(23, 9).onEdges(TOP_LEFT),
    new Coordinate(16, 10).onEdges(TOP_RIGHT),
    new Coordinate(20, 10).onEdges(TOP_RIGHT),
    new Coordinate(15, 11).onEdges(TOP_LEFT),
    new Coordinate(9, 13).onEdges(TOP_RIGHT),
    new Coordinate(13, 13).onEdges(TOP_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_OC_FACE_DOWN_COORDINATES = [
    new Coordinate(16, 2).asFaceDown(),
    new Coordinate(18, 2).asFaceDown(),
    new Coordinate(15, 3).asFaceDown(),
    new Coordinate(17, 3).asFaceDown(),
    new Coordinate(19, 3).asFaceDown(),
    new Coordinate(14, 4).asFaceDown(),
    new Coordinate(16, 4).asFaceDown(),
    new Coordinate(18, 4).asFaceDown(),
    new Coordinate(20, 4).asFaceDown(),
    new Coordinate(13, 5).asFaceDown(),
    new Coordinate(15, 5).asFaceDown(),
    new Coordinate(17, 5).asFaceDown(),
    new Coordinate(19, 5).asFaceDown(),
    new Coordinate(21, 5).asFaceDown(),
    new Coordinate(12, 6).asFaceDown(),
    new Coordinate(14, 6).asFaceDown(),
    new Coordinate(16, 6).asFaceDown(),
    new Coordinate(18, 6).asFaceDown(),
    new Coordinate(20, 6).asFaceDown(),
    new Coordinate(3, 7).asFaceDown(),
    new Coordinate(5, 7).asFaceDown(),
    new Coordinate(7, 7).asFaceDown(),
    new Coordinate(9, 7).asFaceDown(),
    new Coordinate(11, 7).asFaceDown(),
    new Coordinate(2, 8).asFaceDown(),
    new Coordinate(4, 8).asFaceDown(),
    new Coordinate(6, 8).asFaceDown(),
    new Coordinate(8, 8).asFaceDown(),
    new Coordinate(10, 8).asFaceDown(),
    new Coordinate(3, 9).asFaceDown(),
    new Coordinate(5, 9).asFaceDown(),
    new Coordinate(7, 9).asFaceDown(),
    new Coordinate(9, 9).asFaceDown(),
    new Coordinate(4, 10).asFaceDown(),
    new Coordinate(6, 10).asFaceDown(),
    new Coordinate(8, 10).asFaceDown(),
    new Coordinate(5, 11).asFaceDown(),
    new Coordinate(7, 11).asFaceDown()];
  export const EXT_7_8_EXP_SEA_SCEN_OC_FISHERY_COORDINATES = [
    new Coordinate(12, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(10, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(2, 4).onEdges(LEFT, TOP_LEFT),
    new Coordinate(5, 3).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(21, 9).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(18, 10).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(13, 11).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(11, 13).onEdges(TOP_LEFT, TOP_RIGHT)];

  export const BASE_3_EXP_SEA_SCEN_TD_INDIGENOUS_TERRAIN_COORDINATES = [
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(3, 5)];
  export const BASE_3_EXP_SEA_SCEN_TD_INDIGENOUS_DESERT_COORDINATES = [
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5)];
  export const BASE_3_EXP_SEA_SCEN_TD_INDIGENOUS_HARBOR_COORDINATES = [
    new Coordinate(3, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(5, 1).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 2).onEdges(LEFT),
    new Coordinate(0, 4).onEdges(TOP_RIGHT),
    new Coordinate(12, 4).onEdges(LEFT),
    new Coordinate(1, 5).onEdges(RIGHT),
    new Coordinate(5, 5).onEdges(TOP_LEFT)];
  export const BASE_3_EXP_SEA_SCEN_TD_FOREIGN_TERRAIN_COORDINATES = [
    new Coordinate(4, 0),
    new Coordinate(6, 0),
    new Coordinate(8, 0),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(12, 2),
    new Coordinate(13, 3),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6)];
  export const BASE_3_EXP_SEA_SCEN_TD_FISHERY_COORDINATES = [
    new Coordinate(2, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(2, 4).onEdges(BOTTOM_LEFT, LEFT)];

  export const BASE_4_EXP_SEA_SCEN_TD_INDIGENOUS_TERRAIN_COORDINATES = [
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
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
    new Coordinate(13, 5),
    new Coordinate(4, 6)];
  export const BASE_4_EXP_SEA_SCEN_TD_INDIGENOUS_DESERT_COORDINATES = [
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6)];
  export const BASE_4_EXP_SEA_SCEN_TD_INDIGENOUS_HARBOR_COORDINATES = [
    new Coordinate(4, 2).onEdges(BOTTOM_LEFT),
    new Coordinate(6, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(1, 3).onEdges(RIGHT),
    new Coordinate(13, 3).onEdges(LEFT),
    new Coordinate(2, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(14, 4).onEdges(BOTTOM_LEFT),
    new Coordinate(2, 6).onEdges(TOP_RIGHT),
    new Coordinate(6, 6).onEdges(TOP_RIGHT)];
  export const BASE_4_EXP_SEA_SCEN_TD_FOREIGN_TERRAIN_COORDINATES = [
    new Coordinate(6, 0),
    new Coordinate(8, 0),
    new Coordinate(10, 0),
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(14, 2),
    new Coordinate(15, 3),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];
  export const BASE_4_EXP_SEA_SCEN_TD_FISHERY_COORDINATES = [
    new Coordinate(13, 5).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(4, 6).onEdges(BOTTOM_LEFT, LEFT)];

  export const EXT_5_6_EXP_SEA_SCEN_TD_INDIGENOUS_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(1, 3),
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
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5)];
  export const EXT_5_6_EXP_SEA_SCEN_TD_INDIGENOUS_DESERT_COORDINATES = [
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(14, 6)];
  export const EXT_5_6_EXP_SEA_SCEN_TD_INDIGENOUS_HARBOR_COORDINATES = [
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(5, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(6, 2).onEdges(BOTTOM_LEFT),
    new Coordinate(8, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(12, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(15, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 4).onEdges(TOP_RIGHT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT),
    new Coordinate(5, 5).onEdges(TOP_RIGHT),
    new Coordinate(15, 5).onEdges(LEFT)];
  export const EXT_5_6_EXP_SEA_SCEN_TD_FOREIGN_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(17, 1),
    new Coordinate(16, 2),
    new Coordinate(18, 2),
    new Coordinate(19, 3),
    new Coordinate(18, 4),
    new Coordinate(19, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(18, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_TD_FISHERY_COORDINATES = [
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(1, 3).onEdges(LEFT, TOP_LEFT)];

  export const EXT_7_8_EXP_SEA_SCEN_TD_INDIGENOUS_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(15, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(16, 4),
    new Coordinate(18, 4),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5)];
  export const EXT_7_8_EXP_SEA_SCEN_TD_INDIGENOUS_DESERT_COORDINATES = [
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(18, 6)];
  export const EXT_7_8_EXP_SEA_SCEN_TD_INDIGENOUS_HARBOR_COORDINATES = [
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(5, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(6, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 2).onEdges(BOTTOM_LEFT),
    new Coordinate(12, 2).onEdges(BOTTOM_RIGHT),
    new Coordinate(16, 2).onEdges(BOTTOM_LEFT),
    new Coordinate(17, 3).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 4).onEdges(TOP_RIGHT),
    new Coordinate(3, 5).onEdges(TOP_LEFT),
    new Coordinate(5, 5).onEdges(TOP_RIGHT),
    new Coordinate(19, 5).onEdges(TOP_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_TD_FOREIGN_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(17, 1),
    new Coordinate(19, 1),
    new Coordinate(21, 1),
    new Coordinate(20, 2),
    new Coordinate(22, 2),
    new Coordinate(24, 2),
    new Coordinate(23, 3),
    new Coordinate(25, 3),
    new Coordinate(22, 4),
    new Coordinate(24, 4),
    new Coordinate(23, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(22, 6),
    new Coordinate(24, 6),
    new Coordinate(1, 7),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7),
    new Coordinate(19, 7),
    new Coordinate(21, 7),
    new Coordinate(0, 8),
    new Coordinate(6, 8),
    new Coordinate(12, 8),
    new Coordinate(18, 8),
    new Coordinate(24, 8)];
  export const EXT_7_8_EXP_SEA_SCEN_TD_FISHERY_COORDINATES = EXT_5_6_EXP_SEA_SCEN_TD_FISHERY_COORDINATES;

  export const BASE_3_4_EXP_SEA_SCEN_FT_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(1, 3),
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
    new Coordinate(1, 5),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5)];
  export const BASE_3_4_EXP_SEA_SCEN_FT_FISHERY_COORDINATES = [
    new Coordinate(1, 3).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(1, 5).onEdges(LEFT, TOP_LEFT)];
  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 3),
    new Coordinate(15, 5),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7)];
  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(16, 2).onEdges(BOTTOM_LEFT).asFaceDown(),
    new Coordinate(2, 8).onEdges(TOP_RIGHT).asFaceDown(),
    new Coordinate(10, 8).onEdges(TOP_LEFT).asFaceDown(),
    new Coordinate(16, 6).onEdges(TOP_LEFT).asFaceDown()];
  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_DEVELOPMENT_CARD_COORDINATES = [
    new Coordinate(1, 1).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(15, 1).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(1, 7).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(15, 7).onEdges(RIGHT, LEFT).asFaceDown()];
  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_VICTORY_POINT_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(14, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(17, 3).onEdges(LEFT),
    new Coordinate(17, 5).onEdges(LEFT),
    new Coordinate(4, 8).onEdges(TOP_LEFT),
    new Coordinate(8, 8).onEdges(TOP_RIGHT),
    new Coordinate(14, 8).onEdges(TOP_LEFT)];

  export const EXT_5_6_EXP_SEA_SCEN_FT_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(1, 3),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(15, 3),
    new Coordinate(17, 3),
    new Coordinate(19, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(16, 4),
    new Coordinate(18, 4),
    new Coordinate(1, 5),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(19, 5)];
  export const EXT_5_6_EXP_SEA_SCEN_FT_FISHERY_COORDINATES = BASE_3_4_EXP_SEA_SCEN_FT_FISHERY_COORDINATES
      .concat([
        new Coordinate(19, 3).onEdges(RIGHT, BOTTOM_RIGHT),
        new Coordinate(19, 5).onEdges(TOP_RIGHT, RIGHT)
      ]);
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(15, 1),
    new Coordinate(17, 1),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_LEFT).asFaceDown(),
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(14, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(18, 0).onEdges(BOTTOM_LEFT).asFaceDown(),
    new Coordinate(2, 8).onEdges(TOP_RIGHT).asFaceDown(),
    new Coordinate(4, 8).onEdges(TOP_RIGHT).asFaceDown(),
    new Coordinate(12, 8).onEdges(TOP_LEFT).asFaceDown(),
    new Coordinate(14, 8).onEdges(TOP_RIGHT).asFaceDown()];
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_DEVELOPMENT_CARD_COORDINATES = [
    new Coordinate(12, 0).onEdges(TOP_RIGHT, BOTTOM_LEFT).asFaceDown(),
    new Coordinate(1, 1).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(19, 1).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(1, 7).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(19, 7).onEdges(RIGHT, LEFT).asFaceDown(),
    new Coordinate(8, 8).onEdges(TOP_RIGHT, BOTTOM_LEFT).asFaceDown()];
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_VICTORY_POINT_COORDINATES = [
    new Coordinate(2, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(16, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(6, 8).onEdges(TOP_LEFT),
    new Coordinate(10, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT),
    new Coordinate(16, 8).onEdges(TOP_LEFT),
    new Coordinate(18, 8).onEdges(TOP_LEFT)];
  
  export const EXT_7_8_EXP_SEA_SCEN_FT_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(15, 3),
    new Coordinate(17, 3),
    new Coordinate(19, 3),
    new Coordinate(21, 3),
    new Coordinate(23, 3),
    new Coordinate(25, 3),
    new Coordinate(27, 3),
    new Coordinate(2, 4),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(16, 4),
    new Coordinate(18, 4),
    new Coordinate(20, 4),
    new Coordinate(22, 4),
    new Coordinate(24, 4),
    new Coordinate(26, 4),
    new Coordinate(28, 4),
    new Coordinate(3, 5),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(19, 5),
    new Coordinate(21, 5),
    new Coordinate(23, 5),
    new Coordinate(25, 5),
    new Coordinate(27, 5)];
  export const EXT_7_8_EXP_SEA_SCEN_FT_FISHERY_COORDINATES = [
    new Coordinate(1, 3).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(29, 3).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(29, 5).onEdges(LEFT, TOP_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(9, 1),
    new Coordinate(13, 1),
    new Coordinate(17, 1),
    new Coordinate(21, 1),
    new Coordinate(25, 1),
    new Coordinate(5, 7),
    new Coordinate(9, 7),
    new Coordinate(13, 7),
    new Coordinate(17, 7),
    new Coordinate(21, 7),
    new Coordinate(25, 7)];
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT).asFaceDown(),
    new Coordinate(12, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(20, 0).onEdges(BOTTOM_RIGHT).asFaceDown(),
    new Coordinate(26, 0).onEdges(BOTTOM_LEFT).asFaceDown(),
    new Coordinate(6, 8).onEdges(TOP_LEFT).asFaceDown(),
    new Coordinate(8, 8).onEdges(TOP_RIGHT).asFaceDown(),
    new Coordinate(16, 8).onEdges(TOP_RIGHT).asFaceDown(),
    new Coordinate(22, 8).onEdges(TOP_LEFT).asFaceDown(),
    new Coordinate(24, 8).onEdges(TOP_RIGHT).asFaceDown()];
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_DEVELOPMENT_CARD_COORDINATES = [
    new Coordinate(3, 1).onEdges(RIGHT, LEFT),
    new Coordinate(11, 1).onEdges(RIGHT, LEFT),
    new Coordinate(19, 1).onEdges(RIGHT, LEFT),
    new Coordinate(27, 1).onEdges(RIGHT, LEFT),
    new Coordinate(3, 7).onEdges(RIGHT, LEFT),
    new Coordinate(11, 7).onEdges(RIGHT, LEFT),
    new Coordinate(19, 7).onEdges(RIGHT, LEFT),
    new Coordinate(27, 7).onEdges(RIGHT, LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_VICTORY_POINT_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(14, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(16, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(22, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(24, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT),
    new Coordinate(12, 8).onEdges(TOP_RIGHT),
    new Coordinate(18, 8).onEdges(TOP_LEFT),
    new Coordinate(20, 8).onEdges(TOP_RIGHT),
    new Coordinate(26, 8).onEdges(TOP_LEFT)];

  export const BASE_3_4_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(1, 3),
    new Coordinate(13, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_MAIN_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(14, 2).onEdges(LEFT),
    new Coordinate(15, 5).onEdges(LEFT),
    new Coordinate(0, 6).onEdges(RIGHT),
    new Coordinate(13, 7).onEdges(TOP_LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(1, 3).onEdges(LEFT, TOP_LEFT),
    new Coordinate(14, 6).onEdges(LEFT, TOP_LEFT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(8, 8).onEdges(TOP_LEFT, TOP_RIGHT)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(7, 3),
    new Coordinate(4, 4),
    new Coordinate(10, 4),
    new Coordinate(7, 5)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_3_11_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.TOP),
    new Coordinate(7, 5).onVertices(VertexPosition.BOTTOM)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_COORDINATES = [
    new Coordinate(4, 4).onVertices(VertexPosition.BOTTOM),
    new Coordinate(10, 4).onVertices(VertexPosition.BOTTOM)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_COORDINATES = [
    new Coordinate(4, 4).onVertices(VertexPosition.TOP),
    new Coordinate(10, 4).onVertices(VertexPosition.TOP)];
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.BOTTOM),
    new Coordinate(7, 5).onVertices(VertexPosition.TOP)];

  export const EXT_5_6_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(14, 2),
    new Coordinate(16, 2),
    new Coordinate(1, 3),
    new Coordinate(17, 3),
    new Coordinate(1, 5),
    new Coordinate(17, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_MAIN_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(12, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(18, 2).onEdges(LEFT),
    new Coordinate(19, 5).onEdges(LEFT),
    new Coordinate(0, 6).onEdges(RIGHT),
    new Coordinate(17, 7).onEdges(TOP_LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(8, 8).onEdges(TOP_LEFT),
    new Coordinate(14, 8).onEdges(TOP_LEFT)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(10, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(17, 1).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(18, 6).onEdges(LEFT, TOP_LEFT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(6, 8).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(12, 8).onEdges(TOP_LEFT, TOP_RIGHT)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(7, 3),
    new Coordinate(11, 3),
    new Coordinate(4, 4),
    new Coordinate(14, 4),
    new Coordinate(7, 5),
    new Coordinate(11, 5)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_2_12_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.TOP),
    new Coordinate(7, 5).onVertices(VertexPosition.BOTTOM)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_COORDINATES = [
    new Coordinate(11, 3).onVertices(VertexPosition.TOP),
    new Coordinate(4, 4).onVertices(VertexPosition.TOP),
    new Coordinate(14, 4).onVertices(VertexPosition.TOP),
    new Coordinate(11, 5).onVertices(VertexPosition.BOTTOM)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.BOTTOM),
    new Coordinate(4, 4).onVertices(VertexPosition.BOTTOM),
    new Coordinate(14, 4).onVertices(VertexPosition.BOTTOM),
    new Coordinate(11, 5).onVertices(VertexPosition.TOP)];
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_COORDINATES = [
    new Coordinate(11, 3).onVertices(VertexPosition.BOTTOM),
    new Coordinate(7, 5).onVertices(VertexPosition.TOP)];

  export const EXT_7_8_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(15, 1),
    new Coordinate(17, 1),
    new Coordinate(19, 1),
    new Coordinate(21, 1),
    new Coordinate(2, 2),
    new Coordinate(4, 2),
    new Coordinate(20, 2),
    new Coordinate(22, 2),
    new Coordinate(1, 3),
    new Coordinate(23, 3),
    new Coordinate(1, 5),
    new Coordinate(23, 5),
    new Coordinate(2, 6),
    new Coordinate(4, 6),
    new Coordinate(20, 6),
    new Coordinate(22, 6),
    new Coordinate(3, 7),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7),
    new Coordinate(19, 7),
    new Coordinate(21, 7)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_MAIN_ISLAND_HARBOR_COORDINATES = [
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(14, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(20, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(0, 2).onEdges(RIGHT),
    new Coordinate(24, 2).onEdges(LEFT),
    new Coordinate(0, 6).onEdges(RIGHT),
    new Coordinate(24, 6).onEdges(LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT),
    new Coordinate(14, 8).onEdges(TOP_RIGHT),
    new Coordinate(20, 8).onEdges(TOP_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES = [
    new Coordinate(8, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(16, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(1, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(23, 1).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(1, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(23, 7).onEdges(LEFT, TOP_LEFT),
    new Coordinate(8, 8).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(16, 8).onEdges(TOP_LEFT, TOP_RIGHT)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_COORDINATES = [
    new Coordinate(7, 3),
    new Coordinate(17, 3),
    new Coordinate(4, 4),
    new Coordinate(10, 4),
    new Coordinate(14, 4),
    new Coordinate(20, 4),
    new Coordinate(7, 5),
    new Coordinate(17, 5)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_2_12_CHIT_COORDINATES = [
    new Coordinate(4, 4).onVertices(VertexPosition.TOP),
    new Coordinate(4, 4).onVertices(VertexPosition.BOTTOM),
    new Coordinate(20, 4).onVertices(VertexPosition.TOP),
    new Coordinate(20, 4).onVertices(VertexPosition.BOTTOM)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.TOP_RIGHT),
    new Coordinate(17, 3).onVertices(VertexPosition.TOP_LEFT),
    new Coordinate(7, 5).onVertices(VertexPosition.TOP_LEFT),
    new Coordinate(17, 5).onVertices(VertexPosition.TOP_RIGHT)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_COORDINATES = [
    new Coordinate(7, 3).onVertices(VertexPosition.BOTTOM_LEFT),
    new Coordinate(17, 3).onVertices(VertexPosition.BOTTOM_RIGHT),
    new Coordinate(7, 5).onVertices(VertexPosition.BOTTOM_RIGHT),
    new Coordinate(17, 5).onVertices(VertexPosition.BOTTOM_LEFT)];
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_COORDINATES = [
    new Coordinate(10, 4).onVertices(VertexPosition.TOP),
    new Coordinate(10, 4).onVertices(VertexPosition.BOTTOM),
    new Coordinate(14, 4).onVertices(VertexPosition.TOP),
    new Coordinate(14, 4).onVertices(VertexPosition.BOTTOM)];

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
    new Coordinate(2, 2).onEdges(RIGHT, TOP_LEFT),
    new Coordinate(4, 2).onEdges(RIGHT, LEFT),
    new Coordinate(6, 2).onEdges(RIGHT, LEFT),
    new Coordinate(8, 2).onEdges(LEFT),
    new Coordinate(2, 4).onEdges(RIGHT, BOTTOM_LEFT),
    new Coordinate(4, 4).onEdges(RIGHT, LEFT),
    new Coordinate(6, 4).onEdges(LEFT)];

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
    new Coordinate(7, 1).onEdges(BOTTOM_LEFT, TOP_LEFT),
    new Coordinate(6, 2).onEdges(TOP_RIGHT, BOTTOM_LEFT),
    new Coordinate(5, 3).onEdges(TOP_RIGHT),
    new Coordinate(4, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 4).onEdges(RIGHT),
    new Coordinate(10, 4).onEdges(RIGHT, LEFT),
    new Coordinate(12, 4).onEdges(TOP_RIGHT, LEFT),
    new Coordinate(5, 5).onEdges(BOTTOM_RIGHT, TOP_LEFT),
    new Coordinate(6, 6).onEdges(BOTTOM_RIGHT, TOP_LEFT),
    new Coordinate(7, 7).onEdges(BOTTOM_LEFT, TOP_LEFT)];

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
    new Coordinate(7, 1).onEdges(BOTTOM_LEFT, TOP_LEFT),
    new Coordinate(6, 2).onEdges(TOP_RIGHT, BOTTOM_LEFT),
    new Coordinate(5, 3).onEdges(TOP_RIGHT),
    new Coordinate(6, 4).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 4).onEdges(RIGHT),
    new Coordinate(12, 4).onEdges(RIGHT, LEFT),
    new Coordinate(14, 4).onEdges(TOP_RIGHT, LEFT),
    new Coordinate(7, 5).onEdges(BOTTOM_RIGHT, TOP_LEFT),
    new Coordinate(8, 6).onEdges(BOTTOM_RIGHT, TOP_LEFT),
    new Coordinate(9, 7).onEdges(BOTTOM_LEFT, TOP_LEFT)];

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

  export const BASE_3_4_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(3, 1),
    new Coordinate(5, 1),
    new Coordinate(2, 2),
    new Coordinate(8, 2),
    new Coordinate(1, 3),
    new Coordinate(9, 3),
    new Coordinate(2, 4),
    new Coordinate(8, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5)];
  export const BASE_3_4_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(4, 2),
    new Coordinate(6, 2),
    new Coordinate(3, 3),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4)];

  export const EXT_5_6_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(4, 2),
    new Coordinate(10, 2),
    new Coordinate(3, 3),
    new Coordinate(11, 5),
    new Coordinate(4, 6),
    new Coordinate(10, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7)
  ];
  export const EXT_5_6_EXP_TB_SCEN_BA_OUTER_DESERT_TERRAIN_COORDINATES = [
    new Coordinate(11, 3),
    new Coordinate(3, 5)
  ];
  export const EXT_5_6_EXP_TB_SCEN_BA_OUTER_CASTLE_TERRAIN_COORDINATES = [
    new Coordinate(2, 4),
    new Coordinate(12, 4)
  ];
  export const EXT_5_6_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(6, 6),
    new Coordinate(8, 6)
  ];

  export const EXT_7_8_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(12, 2),
    new Coordinate(3, 3),
    new Coordinate(2, 4),
    new Coordinate(3, 5),
    new Coordinate(13, 5),
    new Coordinate(4, 6),
    new Coordinate(12, 6),
    new Coordinate(9, 7),
    new Coordinate(11, 7)];
  export const EXT_7_8_EXP_TB_SCEN_BA_OUTER_DESERT_TERRAIN_COORDINATES = [
    new Coordinate(4, 2),
    new Coordinate(13, 3),
    new Coordinate(7, 7)];
  export const EXT_7_8_EXP_TB_SCEN_BA_OUTER_CASTLE_TERRAIN_COORDINATES = [
    new Coordinate(5, 1),
    new Coordinate(14, 4),
    new Coordinate(5, 7)];
  export const EXT_7_8_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_COORDINATES = [
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(11, 5),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6)];

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
    new Coordinate(4, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(8, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(13, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(1, 3).onEdges(RIGHT),
    new Coordinate(16, 4).onEdges(LEFT),
    new Coordinate(1, 5).onEdges(TOP_RIGHT),
    new Coordinate(2, 6).onEdges(RIGHT),
    new Coordinate(14, 6).onEdges(TOP_LEFT),
    new Coordinate(13, 7).onEdges(LEFT),
    new Coordinate(4, 8).onEdges(TOP_RIGHT),
    new Coordinate(10, 8).onEdges(TOP_LEFT)];
  export const EXT_5_6_EXP_TB_SCEN_TB_FISHERY_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT),
    new Coordinate(11, 1).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(4, 2).onEdges(LEFT, TOP_LEFT),
    new Coordinate(15, 3).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(2, 4).onEdges(LEFT, TOP_LEFT),
    new Coordinate(12, 6).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(3, 7).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(8, 8).onEdges(TOP_LEFT, TOP_RIGHT)];

  export const EXT_7_8_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_COORDINATES = [
    new Coordinate(9, 1),
    new Coordinate(11, 1),
    new Coordinate(13, 1),
    new Coordinate(6, 2),
    new Coordinate(8, 2),
    new Coordinate(10, 2),
    new Coordinate(12, 2),
    new Coordinate(14, 2),
    new Coordinate(16, 2),
    new Coordinate(5, 3),
    new Coordinate(7, 3),
    new Coordinate(9, 3),
    new Coordinate(11, 3),
    new Coordinate(13, 3),
    new Coordinate(15, 3),
    new Coordinate(17, 3),
    new Coordinate(4, 4),
    new Coordinate(6, 4),
    new Coordinate(8, 4),
    new Coordinate(10, 4),
    new Coordinate(12, 4),
    new Coordinate(14, 4),
    new Coordinate(16, 4),
    new Coordinate(18, 4),
    new Coordinate(5, 5),
    new Coordinate(7, 5),
    new Coordinate(9, 5),
    new Coordinate(13, 5),
    new Coordinate(15, 5),
    new Coordinate(17, 5),
    new Coordinate(4, 6),
    new Coordinate(6, 6),
    new Coordinate(8, 6),
    new Coordinate(10, 6),
    new Coordinate(12, 6),
    new Coordinate(14, 6),
    new Coordinate(16, 6),
    new Coordinate(18, 6),
    new Coordinate(5, 7),
    new Coordinate(7, 7),
    new Coordinate(9, 7),
    new Coordinate(11, 7),
    new Coordinate(13, 7),
    new Coordinate(15, 7),
    new Coordinate(17, 7),
    new Coordinate(6, 8),
    new Coordinate(8, 8),
    new Coordinate(10, 8),
    new Coordinate(12, 8),
    new Coordinate(14, 8),
    new Coordinate(16, 8),
    new Coordinate(9, 9),
    new Coordinate(11, 9),
    new Coordinate(13, 9)];
  export const EXT_7_8_EXP_TB_SCEN_TB_CASTLE_TERRAIN_COORDINATES = [
    new Coordinate(11, 5)];
  export const EXT_7_8_EXP_TB_SCEN_TB_GLASSWORKS_TERRAIN_COORDINATES = [
    new Coordinate(7, 1),
    new Coordinate(19, 5),
    new Coordinate(7, 9)];
  export const EXT_7_8_EXP_TB_SCEN_TB_QUARRY_TERRAIN_COORDINATES = [
    new Coordinate(15, 1),
    new Coordinate(3, 5),
    new Coordinate(15, 9)];
  export const EXT_7_8_EXP_TB_SCEN_TB_HARBOR_COORDINATES = [
    new Coordinate(6, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(10, 0).onEdges(BOTTOM_LEFT),
    new Coordinate(14, 0).onEdges(BOTTOM_RIGHT),
    new Coordinate(17, 1).onEdges(BOTTOM_LEFT),
    new Coordinate(4, 2).onEdges(RIGHT),
    new Coordinate(19, 3).onEdges(BOTTOM_LEFT),
    new Coordinate(2, 4).onEdges(RIGHT),
    new Coordinate(21, 5).onEdges(LEFT),
    new Coordinate(2, 6).onEdges(RIGHT),
    new Coordinate(19, 7).onEdges(TOP_LEFT),
    new Coordinate(4, 8).onEdges(RIGHT),
    new Coordinate(17, 9).onEdges(LEFT),
    new Coordinate(6, 10).onEdges(TOP_RIGHT),
    new Coordinate(10, 10).onEdges(TOP_LEFT),
    new Coordinate(14, 10).onEdges(TOP_LEFT)];
  export const EXT_7_8_EXP_TB_SCEN_TB_FISHERY_COORDINATES = [
    new Coordinate(5, 1).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(11, 1).onEdges(TOP_LEFT, TOP_RIGHT),
    new Coordinate(18, 2).onEdges(BOTTOM_LEFT, LEFT),
    new Coordinate(3, 5).onEdges(LEFT, TOP_LEFT),
    new Coordinate(20, 6).onEdges(LEFT, TOP_LEFT),
    new Coordinate(16, 8).onEdges(RIGHT, BOTTOM_RIGHT),
    new Coordinate(5, 9).onEdges(TOP_RIGHT, RIGHT),
    new Coordinate(11, 9).onEdges(BOTTOM_RIGHT, BOTTOM_LEFT)];
// }
