import * as Chits from "./Chits";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module Configurations {
  export class TileChitBag {
    constructor(public tiles: Tiles.Tile[], public chits: Chits.Chits[] = []) {
      if (this.chits.length === 0) {
        this.chits = new Array(this.tiles.length).fill(Chits.NO_CHITS);
      }
    }
  }
  
  export class Configuration {
    constructor(
        public settings: [Coordinates.Coordinate[], TileChitBag[]][]) {
      this.validateConfiguration(settings);
    }

    validateConfiguration(configurations: [Coordinates.Coordinate[], TileChitBag[]][]) {
      if (configurations.some((configuration) => {
        return configuration[0].some((coordinate) => {
          return coordinate.positions.length !== configuration[0][0].positions.length;
        });
      })) {
        throw new Error(`Invalid configuration: Mixed coordinate types. configurations = ${JSON.stringify(configurations, null, 2)}`);
      }

      if (configurations.some((configuration) => {
        const lhs = configuration[0].length;
        const rhs = configuration[1].reduce((sum, tcb) => sum + tcb.tiles.length, 0);

        console.log(`Configurations.Configuration.validateConfiguration: lhs = ${lhs}, rhs = ${rhs}`);

        return lhs !== rhs;
      })) {
        throw new Error(`Invalid configuration: Number of coordinates do not match number of tiles/chits. configurations = ${JSON.stringify(configurations, null, 2)}`);
      }

      if (configurations.some((configuration) => {
        return configuration[1].some((tc) => {
          return tc.tiles.length !== tc.chits.length;
        })
      })) {
        throw new Error(`Invalid configuration: Number of tiles do not match number of chits. configurations = ${JSON.stringify(configurations, null, 2)}`);
      }
    }
  }

  export const BASE_3_4_FISHERY_TILE_CHIT_BAG = new TileChitBag(Tiles.BASE_3_4_FISHERY_TILE_SET, Chits.BASE_3_4_FISHERY_CHIT_SET);
  export const BASE_3_4_LAKE_TILE_CHIT_BAG = new TileChitBag(
      [Tiles.LAKE], [Chits.CHITS_2_3_11_12]);
  export const EXTENSION_5_6_LAKE_TILE_CHIT_BAG = new TileChitBag(
      new Array(2).fill(Tiles.LAKE),
      [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9]);

  export const CONFIGURATION_3_4 = new Configuration([
    [Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_4_FISHERMEN = new Configuration([
    [Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      BASE_3_4_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]],
    [Coordinates.BASE_3_4_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG]]]);

  export const CONFIGURATION_5_6 = new Configuration([
    [Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]]]);
  export const EXTENSION_5_6_FISHERY_TILE_CHIT_BAG = new TileChitBag(Tiles.EXTENSION_5_6_FISHERY_TILE_SET, Chits.EXTENSION_5_6_FISHERY_CHIT_SET);
  export const CONFIGURATION_5_6_FISHERMEN = new Configuration([
    [Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]],
    [Coordinates.EXTENSION_5_6_FISHERY_COORDINATES, [EXTENSION_5_6_FISHERY_TILE_CHIT_BAG]]]);

  export const CONFIGURATION_7_8 = new Configuration([
    [Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_7_8_FISHERMEN = new Configuration([
    [Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      BASE_3_4_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]],
    [Coordinates.EXTENSION_7_8_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_FISHERY_TILE_SET, Chits.EXTENSION_7_8_FISHERY_CHIT_SET)]]]);

  export const CONFIGURATION_3_EXPANSION_SEA_SCENARIO_HFNS = new Configuration([
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
      new TileChitBag(new Array(5).fill(Tiles.SEA))]],
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Configuration(CONFIGURATION_3_EXPANSION_SEA_SCENARIO_HFNS.settings
      .concat([
        [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES, [
          new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_TILE_SET, Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERY_CHIT_SET)]]]));

  export const CONFIGURATION_4_EXPANSION_SEA_SCENARIO_HFNS = new Configuration(CONFIGURATION_3_4.settings
      .concat([
          [Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
            new TileChitBag(Tiles.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
            new TileChitBag(new Array(4).fill(Tiles.SEA))]]]));
  export const CONFIGURATION_4_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Configuration(CONFIGURATION_3_4_FISHERMEN.settings
      .concat([
        [Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(Tiles.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(4).fill(Tiles.SEA))]]]));

  export const CONFIGURATION_5_6_EXPANSION_SEA_SCENARIO_HFNS = new Configuration(CONFIGURATION_5_6.settings
      .filter((c) => c[0] === Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES)
      .map((c) => {
        return [Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, c[1]] as [Coordinates.Coordinate[], TileChitBag[]];
      })
      .concat([[Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
        new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]]])
      .concat([[Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
        new TileChitBag(Tiles.BASE_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
        new TileChitBag(new Array(4).fill(Tiles.SEA))]]]));
  export const CONFIGURATION_5_6_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Configuration(CONFIGURATION_5_6_FISHERMEN.settings
      .filter((c) => c[0] === Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES)
      .map((c) => {
        return [Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, c[1]] as [Coordinates.Coordinate[], TileChitBag[]];
      })
      .concat([[Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
        new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]]])
      .concat([[Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
        new TileChitBag(Tiles.BASE_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
        new TileChitBag(new Array(4).fill(Tiles.SEA))]]])
      .concat([[Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES, [EXTENSION_5_6_FISHERY_TILE_CHIT_BAG]]]));

  export const CONFIGURATION_3_EXPANSION_SEA_SCENARIO_FI = new Configuration([
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
      [new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_PRODUCING_TERRAIN_COORDINATES,
      [new TileChitBag(new Array(12).fill(Tiles.UNKNOWN))]],
    [Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES,
      [new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Configuration(CONFIGURATION_3_EXPANSION_SEA_SCENARIO_FI.settings
      .concat([
        [Coordinates.BASE_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG]]]));

  export const CONFIGURATION_3_4_EXPANSION_TB_SCENARIO_TB = new Configuration([
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET, Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_4_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Configuration([
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET, Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]],
    [Coordinates.BASE_3_4_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG]]]);
  export const CONFIGURATION_5_6_EXPANSION_TB_SCENARIO_TB = new Configuration(([
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]]]));
  export const CONFIGURATION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Configuration(([
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES, [EXTENSION_5_6_FISHERY_TILE_CHIT_BAG]]]));
// }
