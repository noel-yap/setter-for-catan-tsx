// export module Tiles {
  export enum Type {
    GENERIC_HARBOR,
    BRICK_HARBOR,
    GRAIN_HARBOR,
    LUMBER_HARBOR,
    ORE_HARBOR,
    WOOL_HARBOR,

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
        case Type.GENERIC_HARBOR:
        case Type.BRICK_HARBOR:
        case Type.ORE_HARBOR:
        case Type.GRAIN_HARBOR:
        case Type.LUMBER_HARBOR:
        case Type.WOOL_HARBOR: {
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

  export const GENERIC_HARBOR = new Tile(Type.GENERIC_HARBOR);
  export const BRICK_HARBOR = new Tile(Type.BRICK_HARBOR);
  export const GRAIN_HARBOR = new Tile(Type.GRAIN_HARBOR);
  export const LUMBER_HARBOR = new Tile(Type.LUMBER_HARBOR);
  export const ORE_HARBOR = new Tile(Type.ORE_HARBOR);
  export const WOOL_HARBOR = new Tile(Type.WOOL_HARBOR);

  export const DESERT_TERRAIN = new Tile(Type.DESERT);
  export const FIELD_TERRAIN = new Tile(Type.FIELD);
  export const FOREST_TERRAIN = new Tile(Type.FOREST);
  export const PASTURE_TERRAIN = new Tile(Type.PASTURE);
  export const HILL_TERRAIN = new Tile(Type.HILL);
  export const MOUNTAIN_TERRAIN = new Tile(Type.MOUNTAIN);

  export const LAKE = new Tile(Type.LAKE);
  export const FISHERY = new Tile(Type.FISHERY);

  export const BASE_PRODUCING_TERRAIN_TILES = new Array(4).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
  export const EXTENSION_5_6_PRODUCING_TERRAIN_TILES = BASE_PRODUCING_TERRAIN_TILES
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const BASE_HARBOR_TILE_SET = new Array(4).fill(GENERIC_HARBOR)
      .concat([
        GRAIN_HARBOR,
        LUMBER_HARBOR,
        WOOL_HARBOR,
        BRICK_HARBOR,
        ORE_HARBOR]);
  export const EXTENSION_5_6_HARBOR_TILE_SET = BASE_HARBOR_TILE_SET
      .concat([GENERIC_HARBOR, WOOL_HARBOR]);

  export const BASE_FISHERY_TILE_SET = new Array(6).fill(FISHERY);
  export const EXTENSION_5_6_FISHERY_TILE_SET = new Array(8).fill(FISHERY);
// }
