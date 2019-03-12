// export module Tiles {
  export enum Type {
    UNKNOWN,

    GENERIC_HARBOR = 8,
    BRICK_HARBOR,
    GRAIN_HARBOR,
    LUMBER_HARBOR,
    ORE_HARBOR,
    WOOL_HARBOR,

    DESERT = 16,
    FIELD,
    FOREST,
    HILL,
    MOUNTAIN,
    PASTURE,

    SEA = 24,
    LAKE,
    FISHERY,

    GOLD = 32,
    CASTLE,
    GLASSWORKS,
    QUARRY
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

        case Type.UNKNOWN:
        case Type.SEA:
        case Type.LAKE:
        case Type.DESERT:
        case Type.FIELD:
        case Type.FOREST:
        case Type.GOLD:
        case Type.HILL:
        case Type.MOUNTAIN:
        case Type.PASTURE:
        case Type.CASTLE:
        case Type.GLASSWORKS:
        case Type.QUARRY: {
          return 6;
        }
      }
    }
  }

  export const UNKNOWN = new Tile(Type.UNKNOWN);

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

  export const GOLD_TERRAIN = new Tile(Type.GOLD);

  export const CASTLE_TERRAIN = new Tile(Type.CASTLE);
  export const GLASSWORKS_TERRAIN = new Tile(Type.GLASSWORKS);
  export const QUARRY_TERRAIN = new Tile(Type.QUARRY);

  export const SEA = new Tile(Type.SEA);
  export const LAKE = new Tile(Type.LAKE);
  export const FISHERY = new Tile(Type.FISHERY);

  export const BASE_3_4_PRODUCING_TERRAIN_TILE_SET = new Array(4).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
  export const BASE_3_4_HARBOR_TILE_SET = new Array(4).fill(GENERIC_HARBOR)
      .concat([
        GRAIN_HARBOR,
        LUMBER_HARBOR,
        WOOL_HARBOR,
        BRICK_HARBOR,
        ORE_HARBOR]);
  export const BASE_FISHERY_TILE_SET = new Array(6).fill(FISHERY);

  export const EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));
  export const EXTENSION_5_6_HARBOR_TILE_SET = BASE_3_4_HARBOR_TILE_SET
      .concat([GENERIC_HARBOR, WOOL_HARBOR]);
  export const EXTENSION_5_6_FISHERY_TILE_SET = new Array(8).fill(FISHERY);

  export const EXTENSIONS_7_8_PRODUCING_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(BASE_3_4_PRODUCING_TERRAIN_TILE_SET);
  export const EXTENSION_7_8_HARBOR_TILE_SET = BASE_3_4_HARBOR_TILE_SET
      .concat([GRAIN_HARBOR, LUMBER_HARBOR, WOOL_HARBOR]);
  export const EXTENSION_7_8_FISHERY_TILE_SET = EXTENSION_5_6_FISHERY_TILE_SET;

  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET = new Array(3).fill(FIELD_TERRAIN)
      .concat(new Array(3).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_TILE_SET = new Array(3).fill(GENERIC_HARBOR)
      .concat([
        GRAIN_HARBOR,
        LUMBER_HARBOR,
        WOOL_HARBOR,
        BRICK_HARBOR,
        ORE_HARBOR]);
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_TILE_SET = new Array(4).fill(FISHERY);
  export const BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = [FIELD_TERRAIN, PASTURE_TERRAIN]
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET
      .concat([FOREST_TERRAIN]);

  export const BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET = new Array(3).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
  export const BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET = [CASTLE_TERRAIN, GLASSWORKS_TERRAIN, QUARRY_TERRAIN];
// }
