import * as Coordinates from './Coordinates';

// export module Tiles {
  export enum Type {
    GENERIC_HARBOR = 'Generic Harbor',
    BRICK_HARBOR = 'Brick Harbor',
    GRAIN_HARBOR = 'Grain Harbor',
    LUMBER_HARBOR = 'Lumber Harbor',
    ORE_HARBOR = 'Ore Harbor',
    WOOL_HARBOR = 'Wool Harbor',

    DESERT = 'Desert',
    FIELD = 'Field',
    FOREST = 'Forest',
    HILL = 'Hill',
    MOUNTAIN = 'Mountain',
    PASTURE = 'Pasture',

    SEA = 'Sea',
    LAKE = 'Lake',
    FISHERY = 'Fishery',
    RIVER = 'River',

    GOLD = 'Gold Field',
    SWAMP = 'Swamp',
    OASIS = 'Oasis',
    CASTLE = 'Castle',
    GLASSWORKS = 'Glassworks',
    QUARRY = 'Quarry',

    DEVELOPMENT_CARD = 'Development Card',
    VICTORY_POINT = 'Victory Point',
    CHIT = 'Chit'
  }

  export class Tile {
    constructor(public type: Type, public specialVertices: Coordinates.VertexPosition[] = []) {}

    edgeCount(): [number, number] {
      switch (this.type) {
        case Type.CHIT: {
          return [0, 0];
        }

        case Type.GENERIC_HARBOR:
        case Type.BRICK_HARBOR:
        case Type.ORE_HARBOR:
        case Type.GRAIN_HARBOR:
        case Type.LUMBER_HARBOR:
        case Type.WOOL_HARBOR:
        case Type.VICTORY_POINT: {
          return [1, 1];
        }

        case Type.FISHERY:
        case Type.DEVELOPMENT_CARD: {
          return [2, 2];
        }

        case Type.SEA:
        case Type.LAKE:
        case Type.DESERT:
        case Type.FIELD:
        case Type.FOREST:
        case Type.GOLD:
        case Type.HILL:
        case Type.MOUNTAIN:
        case Type.PASTURE:
        case Type.SWAMP:
        case Type.OASIS:
        case Type.CASTLE:
        case Type.GLASSWORKS:
        case Type.QUARRY: {
          return [6, 6];
        }

        case Type.RIVER: {
          return [1, 6];
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

  export const GOLD_TERRAIN = new Tile(Type.GOLD);

  export const OASIS_TERRAIN = new Tile(Type.OASIS, [
      Coordinates.VertexPosition.TOP_RIGHT, Coordinates.VertexPosition.BOTTOM, Coordinates.VertexPosition.TOP_LEFT]);
  export const CASTLE_TERRAIN = new Tile(Type.CASTLE);
  export const GLASSWORKS_TERRAIN = new Tile(Type.GLASSWORKS);
  export const QUARRY_TERRAIN = new Tile(Type.QUARRY);

  export const SEA = new Tile(Type.SEA);
  export const LAKE = new Tile(Type.LAKE);
  export const FISHERY = new Tile(Type.FISHERY);
  export const SWAMP_TERRAIN = new Tile(Type.SWAMP);
  export const RIVER = new Tile(Type.RIVER);

  export const DEVELOPMENT_CARD = new Tile(Type.DEVELOPMENT_CARD);
  export const VICTORY_POINT = new Tile(Type.VICTORY_POINT);
  export const CHIT = new Tile(Type.CHIT);

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

  export const EXT_5_6_PRODUCING_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));
  export const EXT_5_6_HARBOR_TILE_SET = BASE_3_4_HARBOR_TILE_SET
      .concat([GENERIC_HARBOR, WOOL_HARBOR]);

  export const EXT_7_8_PRODUCING_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(BASE_3_4_PRODUCING_TERRAIN_TILE_SET);
  export const EXT_7_8_HARBOR_TILE_SET = BASE_3_4_HARBOR_TILE_SET
      .concat([GRAIN_HARBOR, LUMBER_HARBOR, WOOL_HARBOR]);

  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET = new Array(3).fill(FIELD_TERRAIN)
      .concat(new Array(3).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));
  export const BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_TILE_SET = new Array(3).fill(GENERIC_HARBOR)
      .concat([
        GRAIN_HARBOR,
        LUMBER_HARBOR,
        WOOL_HARBOR,
        BRICK_HARBOR,
        ORE_HARBOR]);
  export const BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = [FIELD_TERRAIN, PASTURE_TERRAIN]
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET
      .concat([FOREST_TERRAIN]);

  export const EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = [FIELD_TERRAIN, FOREST_TERRAIN, PASTURE_TERRAIN]
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(3).fill(GOLD_TERRAIN));

  export const EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET = EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET
      .concat(EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET);

  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat([HILL_TERRAIN, MOUNTAIN_TERRAIN]);

  export const BASE_4_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_TILE_SET = BASE_3_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_TILE_SET
      .concat([FIELD_TERRAIN, PASTURE_TERRAIN, FOREST_TERRAIN]);

  export const EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_TERRAIN_TILE_SET = new Array(6).fill(FIELD_TERRAIN)
      .concat(new Array(6).fill(HILL_TERRAIN))
      .concat(new Array(6).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(7).fill(PASTURE_TERRAIN))
      .concat(new Array(7).fill(FOREST_TERRAIN));

  export const EXT_7_8_EXP_SEA_SCEN_8_ISLANDS_TERRAIN_TILE_SET = new Array(8).fill(HILL_TERRAIN)
      .concat(new Array(8).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(8).fill(PASTURE_TERRAIN))
      .concat(new Array(9).fill(FIELD_TERRAIN))
      .concat(new Array(9).fill(FOREST_TERRAIN));

  export const BASE_3_EXP_SEA_SCEN_OC_FACE_UP_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FIELD_TERRAIN)
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN));
  export const BASE_3_EXP_SEA_SCEN_OC_HARBOR_TILE_SET = new Array(3).fill(GENERIC_HARBOR)
      .concat(BRICK_HARBOR, GRAIN_HARBOR, LUMBER_HARBOR, ORE_HARBOR, WOOL_HARBOR);
  export const BASE_3_EXP_SEA_SCEN_OC_FACE_DOWN_PRODUCING_TERRAIN_TILE_SET = [PASTURE_TERRAIN, FOREST_TERRAIN]
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const BASE_4_EXP_SEA_SCEN_OC_FACE_UP_PRODUCING_TERRAIN_TILE_SET = new Array(3).fill(FIELD_TERRAIN)
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN));
  export const BASE_4_EXP_SEA_SCEN_OC_FACE_DOWN_PRODUCING_TERRAIN_TILE_SET = BASE_3_EXP_SEA_SCEN_OC_FACE_DOWN_PRODUCING_TERRAIN_TILE_SET;

  export const EXT_5_6_EXP_SEA_SCEN_OC_FACE_UP_TERRAIN_TILE_SET = new Array(4).fill(MOUNTAIN_TERRAIN)
      .concat(new Array(5).fill(FOREST_TERRAIN))
      .concat(new Array(5).fill(FIELD_TERRAIN))
      .concat(new Array(5).fill(HILL_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_OC_FACE_DOWN_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FIELD_TERRAIN)
      .concat(new Array(2).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN))
    .concat(new Array(3).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(3).fill(GOLD_TERRAIN));

  export const EXT_7_8_EXP_SEA_SCEN_OC_FACE_UP_PRODUCING_TERRAIN_TILE_SET = new Array(5).fill(MOUNTAIN_TERRAIN)
      .concat(new Array(6).fill(FOREST_TERRAIN))
      .concat(new Array(6).fill(PASTURE_TERRAIN))
      .concat(new Array(7).fill(FIELD_TERRAIN))
      .concat(new Array(7).fill(HILL_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_OC_FACE_DOWN_PRODUCING_TERRAIN_TILE_SET = new Array(4).fill(GOLD_TERRAIN)
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN))
      .concat(new Array(5).fill(FOREST_TERRAIN));

  export const BASE_3_EXP_SEA_SCEN_TD_INDIGENOUS_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FIELD_TERRAIN)
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN));
  export const BASE_3_EXP_SEA_SCEN_TD_INDIGENOUS_HARBOR_TILE_SET = new Array(3).fill(GENERIC_HARBOR)
      .concat([BRICK_HARBOR, GRAIN_HARBOR, LUMBER_HARBOR, ORE_HARBOR, WOOL_HARBOR]);
  export const BASE_3_EXP_SEA_SCEN_TD_FOREIGN_PRODUCING_TERRAIN_TILE_SET = [PASTURE_TERRAIN, FOREST_TERRAIN]
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const BASE_4_EXP_SEA_SCEN_TD_INDIGENOUS_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FIELD_TERRAIN)
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(4).fill(HILL_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(5).fill(FOREST_TERRAIN));
  export const BASE_4_EXP_SEA_SCEN_TD_FOREIGN_PRODUCING_TERRAIN_TILE_SET = [PASTURE_TERRAIN, HILL_TERRAIN]
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(3).fill(FIELD_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));

  export const EXT_5_6_EXP_SEA_SCEN_TD_INDIGENOUS_PRODUCING_TERRAIN_TILE_SET = new Array(4).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(5).fill(HILL_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_TD_FOREIGN_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(HILL_TERRAIN)
      .concat(new Array(3).fill(FIELD_TERRAIN))
      .concat(new Array(3).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(GOLD_TERRAIN));

  export const EXT_7_8_EXP_SEA_SCEN_TD_INDIGENOUS_PRODUCING_TERRAIN_TILE_SET = new Array(5).fill(FIELD_TERRAIN)
      .concat(new Array(5).fill(FOREST_TERRAIN))
      .concat(new Array(5).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN))
      .concat(new Array(6).fill(HILL_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_TD_FOREIGN_PRODUCING_TERRAIN_TILE_SET = new Array(4).fill(HILL_TERRAIN)
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(5).fill(FIELD_TERRAIN))
      .concat(new Array(5).fill(FOREST_TERRAIN))
      .concat(new Array(5).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(5).fill(GOLD_TERRAIN));

  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_TILE_SET = [FIELD_TERRAIN, FOREST_TERRAIN, PASTURE_TERRAIN]
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(2).fill(GOLD_TERRAIN))
      .concat(new Array(3).fill(DESERT_TERRAIN));
  export const BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_TILE_SET = [
    GENERIC_HARBOR, GRAIN_HARBOR, LUMBER_HARBOR, WOOL_HARBOR, BRICK_HARBOR, ORE_HARBOR];

  export const EXT_5_6_EXP_SEA_SCEN_FT_MAIN_ISLAND_TERRAIN_TILE_SET = new Array(5).fill(MOUNTAIN_TERRAIN)
      .concat(new Array(5).fill(PASTURE_TERRAIN))
      .concat(new Array(6).fill(FIELD_TERRAIN))
      .concat(new Array(6).fill(HILL_TERRAIN))
      .concat(new Array(7).fill(FOREST_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_TILE_SET = [
    FIELD_TERRAIN, HILL_TERRAIN, MOUNTAIN_TERRAIN]
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(GOLD_TERRAIN))
      .concat(new Array(4).fill(DESERT_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_TILE_SET = BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_TILE_SET
      .concat(new Array(2).fill(GENERIC_HARBOR));

  export const EXT_7_8_EXP_SEA_SCEN_FT_MAIN_ISLAND_TERRAIN_TILE_SET = new Array(6).fill(PASTURE_TERRAIN)
      .concat(new Array(7).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(8).fill(FIELD_TERRAIN))
      .concat(new Array(9).fill(HILL_TERRAIN))
      .concat(new Array(10).fill(FOREST_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_TERRAIN_TILE_SET = [
    FIELD_TERRAIN, HILL_TERRAIN, MOUNTAIN_TERRAIN]
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(GOLD_TERRAIN))
      .concat(new Array(4).fill(DESERT_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_TILE_SET = BASE_3_4_EXP_SEA_SCEN_FT_SMALL_ISLAND_HARBOR_TILE_SET
      .concat(new Array(4).fill(GENERIC_HARBOR));

  export const BASE_3_4_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_TILE_SET = new Array(3).fill(HILL_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(4).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(4).fill(PASTURE_TERRAIN))
      .concat(new Array(5).fill(FIELD_TERRAIN));
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_TILE_SET = new Array(2).fill(DESERT_TERRAIN)
      .concat(new Array(2).fill(GOLD_TERRAIN));
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_3_11_CHIT_TILE_SET = new Array(2).fill(CHIT);
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_TILE_SET = new Array(2).fill(CHIT);
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_TILE_SET = new Array(2).fill(CHIT);
  export const BASE_3_4_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_TILE_SET = new Array(2).fill(CHIT);

  export const EXT_5_6_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_TILE_SET = new Array(4).fill(HILL_TERRAIN)
      .concat(new Array(5).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN))
      .concat(new Array(6).fill(FIELD_TERRAIN))
      .concat(new Array(6).fill(FOREST_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_CFC_MAIN_ISLAND_HARBOR_TILE_SET = [
    BRICK_HARBOR, GRAIN_HARBOR, ORE_HARBOR, WOOL_HARBOR]
      .concat(new Array(2).fill(LUMBER_HARBOR))
      .concat(new Array(5).fill(GENERIC_HARBOR));
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_TILE_SET = new Array(2).fill(GOLD_TERRAIN)
      .concat(new Array(4).fill(DESERT_TERRAIN));
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_2_12_CHIT_TILE_SET = new Array(2).fill(CHIT);
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_TILE_SET = new Array(4).fill(CHIT);
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_TILE_SET = new Array(4).fill(CHIT);
  export const EXT_5_6_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_TILE_SET = new Array(2).fill(CHIT);

  export const EXT_7_8_EXP_SEA_SCEN_CFC_MAIN_ISLAND_TERRAIN_TILE_SET = new Array(6).fill(HILL_TERRAIN)
      .concat(new Array(6).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(6).fill(PASTURE_TERRAIN))
      .concat(new Array(6).fill(FIELD_TERRAIN))
      .concat(new Array(8).fill(FOREST_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_TERRAIN_TILE_SET = new Array(2).fill(GOLD_TERRAIN)
      .concat(new Array(6).fill(DESERT_TERRAIN));
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_2_12_CHIT_TILE_SET = new Array(4).fill(CHIT);
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_4_10_CHIT_TILE_SET = new Array(4).fill(CHIT);
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_5_9_CHIT_TILE_SET = new Array(4).fill(CHIT);
  export const EXT_7_8_EXP_SEA_SCEN_CFC_SMALL_ISLAND_6_8_CHIT_TILE_SET = new Array(4).fill(CHIT);

  export const BASE_3_4_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET = [HILL_TERRAIN, MOUNTAIN_TERRAIN]
      .concat(new Array(4).fill(FIELD_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN));

  export const EXT_5_6_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET = new Array(6).fill(FIELD_TERRAIN)
      .concat(new Array(6).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const EXT_7_8_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET = new Array(7).fill(FIELD_TERRAIN)
      .concat(new Array(8).fill(FOREST_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN))
      .concat(new Array(4).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));

  export const EXT_7_8_EXP_TB_SCEN_CAR_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(new Array(4).fill(FIELD_TERRAIN))
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));

  export const BASE_3_4_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_TILE_SET = [MOUNTAIN_TERRAIN]
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(FOREST_TERRAIN))
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN));
  export const BASE_3_4_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_TILE_SET = [FOREST_TERRAIN, HILL_TERRAIN, PASTURE_TERRAIN]
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN));

  export const EXT_5_6_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FIELD_TERRAIN)
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(2).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(FOREST_TERRAIN));
  export const EXT_5_6_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(FOREST_TERRAIN)
      .concat(new Array(2).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(4).fill(FIELD_TERRAIN));

  export const EXT_7_8_EXP_TB_SCEN_BA_OUTER_PRODUCING_TERRAIN_TILE_SET = [PASTURE_TERRAIN]
      .concat(new Array(2).fill(FIELD_TERRAIN))
      .concat(new Array(3).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
  export const EXT_7_8_EXP_TB_SCEN_BA_INNER_PRODUCING_TERRAIN_TILE_SET = new Array(2).fill(HILL_TERRAIN)
      .concat(new Array(2).fill(MOUNTAIN_TERRAIN))
      .concat(new Array(5).fill(FOREST_TERRAIN))
      .concat(new Array(5).fill(FIELD_TERRAIN))
      .concat(new Array(5).fill(PASTURE_TERRAIN));

  export const BASE_3_4_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_TILE_SET = new Array(3).fill(FIELD_TERRAIN)
      .concat(new Array(4).fill(FOREST_TERRAIN))
      .concat(new Array(3).fill(PASTURE_TERRAIN))
      .concat(new Array(3).fill(HILL_TERRAIN))
      .concat(new Array(3).fill(MOUNTAIN_TERRAIN));
  export const BASE_3_4_EXP_TB_SCEN_TB_TRADE_TERRAIN_TILE_SET = [CASTLE_TERRAIN, GLASSWORKS_TERRAIN, QUARRY_TERRAIN];

  export const EXT_7_8_TB_SCEN_TB_NON_TRADE_TERRAIN_TILE_SET = BASE_3_4_PRODUCING_TERRAIN_TILE_SET
      .concat(BASE_3_4_PRODUCING_TERRAIN_TILE_SET)
      .concat(BASE_3_4_PRODUCING_TERRAIN_TILE_SET);
  export const EXT_7_8_TB_SCEN_TB_HARBOR_TILE_SET = BASE_3_4_HARBOR_TILE_SET
      .concat([
        GENERIC_HARBOR,
        GRAIN_HARBOR,
        LUMBER_HARBOR,
        WOOL_HARBOR,
        BRICK_HARBOR,
        ORE_HARBOR]);
// }
