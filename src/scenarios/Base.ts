import * as Tiles from '../component/Tiles';
import {
  BRICK_HARBOR,
  FIELD_TERRAIN,
  FOREST_TERRAIN,
  GENERIC_HARBOR,
  GRAIN_HARBOR,
  HILL_TERRAIN,
  LUMBER_HARBOR,
  MOUNTAIN_TERRAIN,
  ORE_HARBOR,
  PASTURE_TERRAIN,
  WOOL_HARBOR,
} from '../component/Tiles';
import {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  Coordinate,
  HEXAGON_EDGE_POSITIONS,
  HEXAGON_VERTEX_POSITIONS,
  LEFT,
  RIGHT,
  TOP_LEFT,
  TOP_RIGHT,
} from '../component/Coordinates';
import {
  CHITS_10,
  CHITS_11,
  CHITS_12,
  CHITS_2,
  CHITS_3,
  CHITS_4,
  CHITS_5,
  CHITS_6,
  CHITS_8,
  CHITS_9,
} from '../component/Chits';
import {oneToOne, Specification} from '../component/Specifications';

const P3_P4_PRODUCING_TILES = new Array(4)
  .fill(FIELD_TERRAIN)
  .concat(new Array(4).fill(FOREST_TERRAIN))
  .concat(new Array(4).fill(PASTURE_TERRAIN))
  .concat(new Array(3).fill(HILL_TERRAIN))
  .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
const P3_P4_DESERT = [Tiles.DESERT_TERRAIN];
const P3_P4_HARBOR_TILES = new Array(4)
  .fill(GENERIC_HARBOR)
  .concat([GRAIN_HARBOR, LUMBER_HARBOR, WOOL_HARBOR, BRICK_HARBOR, ORE_HARBOR]);

const P3_P4_TERRAIN_COORDINATES = [
  new Coordinate(3, 1, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(5, 1, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(7, 1, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(2, 2, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(4, 2, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(6, 2, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(8, 2, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(1, 3, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(3, 3, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(5, 3, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(7, 3, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(9, 3, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(2, 4, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(4, 4, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(6, 4, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(8, 4, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(3, 5, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(5, 5, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
  new Coordinate(7, 5, HEXAGON_EDGE_POSITIONS, HEXAGON_VERTEX_POSITIONS),
];
const P3_P4_HARBOR_COORDINATES = [
  new Coordinate(
    2,
    0,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(BOTTOM_RIGHT),
  new Coordinate(
    6,
    0,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(BOTTOM_LEFT),
  new Coordinate(
    9,
    1,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(BOTTOM_LEFT),
  new Coordinate(
    0,
    2,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(RIGHT),
  new Coordinate(
    11,
    3,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(LEFT),
  new Coordinate(
    0,
    4,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(RIGHT),
  new Coordinate(
    9,
    5,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(TOP_LEFT),
  new Coordinate(
    6,
    6,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(TOP_LEFT),
  new Coordinate(
    2,
    6,
    HEXAGON_EDGE_POSITIONS,
    HEXAGON_VERTEX_POSITIONS
  ).onEdges(TOP_RIGHT),
];

const P3_P4_PRODUCING_CHITS = [CHITS_2, CHITS_12]
  .concat(new Array(2).fill(CHITS_3))
  .concat(new Array(2).fill(CHITS_11))
  .concat(new Array(2).fill(CHITS_4))
  .concat(new Array(2).fill(CHITS_10))
  .concat(new Array(2).fill(CHITS_5))
  .concat(new Array(2).fill(CHITS_9))
  .concat(new Array(2).fill(CHITS_6))
  .concat(new Array(2).fill(CHITS_8));

export const P3_P4_SPECIFICATION = new Specification(
  {
    producing: P3_P4_PRODUCING_TILES,
    desert: P3_P4_DESERT,
    harbor: P3_P4_HARBOR_TILES,
  },
  {
    terrain: P3_P4_TERRAIN_COORDINATES,
    harbor: P3_P4_HARBOR_COORDINATES,
  },
  {
    producing: P3_P4_PRODUCING_CHITS,
  },
  Object.assign(oneToOne('harbor'), {
    terrain: ['producing', 'desert'],
  }),
  oneToOne('producing')
);
