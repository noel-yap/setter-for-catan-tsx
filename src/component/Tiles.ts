// export module Tiles {
  export enum Type {
    ANY_PORT,
    BRICK_PORT,
    ORE_PORT,
    SHEEP_PORT,
    WHEAT_PORT,
    WOOD_PORT,

    SEA = 8,
    LAKE,
    FISHERY,

    DESERT = 16,
    FIELD,
    FOREST,
    GOLD,
    HILL,
    MOUNTAIN,
    PASTURE
  }

  export class Tile {
    constructor(public type: Type) {}

    edgeCount(): number {
      switch (this.type) {
        case Type.ANY_PORT:
        case Type.BRICK_PORT:
        case Type.ORE_PORT:
        case Type.SHEEP_PORT:
        case Type.WHEAT_PORT:
        case Type.WOOD_PORT: {
          return 1;
        }

        case Type.FISHERY: {
          return 2;
        }

        case Type.SEA:
        case Type.LAKE:
        case Type.DESERT:
        case Type.FIELD:
        case Type.FOREST:
        case Type.GOLD:
        case Type.HILL:
        case Type.MOUNTAIN:
        case Type.PASTURE: {
          return 6;
        }
      }
    }
  }

  export const ANY_PORT = new Tile(Type.ANY_PORT);
  export const BRICK_PORT = new Tile(Type.BRICK_PORT);
  export const ORE_PORT = new Tile(Type.ORE_PORT);
  export const SHEEP_PORT = new Tile(Type.SHEEP_PORT);
  export const WHEAT_PORT = new Tile(Type.WHEAT_PORT);
  export const WOOD_PORT = new Tile(Type.WOOD_PORT);

  export const DESERT_TERRAIN = new Tile(Type.DESERT);
  export const FIELD_TERRAIN = new Tile(Type.FIELD);
  export const FOREST_TERRAIN = new Tile(Type.FOREST);
  export const PASTURE_TERRAIN = new Tile(Type.PASTURE);
  export const HILL_TERRAIN = new Tile(Type.HILL);
  export const MOUNTAIN_TERRAIN = new Tile(Type.MOUNTAIN);

  export const BASE_PRODUCING_TERRAIN_TILES = new Array(4).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));

  export const BASE_PORT_TILE_SET = new Array(4).fill(ANY_PORT)
      .concat([
        WHEAT_PORT,
        WOOD_PORT,
        SHEEP_PORT,
        BRICK_PORT,
        ORE_PORT]);
// }
