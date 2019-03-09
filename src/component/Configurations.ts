import * as Chits from "./Chit";
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

  export const BASE_LAKE_TILE_CHIT_BAG = new TileChitBag(
      [Tiles.LAKE], [new Chits.Chits([2, 3, 11, 12])]);
  export const EXTENSION_5_6_LAKE_TILE_CHIT_BAG = new TileChitBag(
      new Array(2).fill(Tiles.LAKE),
      [new Chits.Chits([2, 3, 11, 12]), new Chits.Chits([4, 10])]);

  export const CONFIGURATION_3_4 = new Configuration([
    [Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILES, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_4_FISHERMEN = new Configuration([
    [Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      BASE_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILES, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]],
    [Coordinates.BASE_3_4_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.BASE_FISHERY_TILE_SET, Chits.BASE_FISHERY_CHIT_SET)
    ]]]);

  export const CONFIGURATION_5_6 = new Configuration([
    [Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_5_6_FISHERMEN = new Configuration([
    [Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]],
    [Coordinates.EXTENSION_5_6_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_FISHERY_TILE_SET, Chits.EXTENSION_5_6_FISHERY_CHIT_SET)
    ]]]);

  export const CONFIGURATION_7_8 = new Configuration([
    [Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_7_8_FISHERMEN = new Configuration([
    [Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      BASE_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]]]);

  export const CONFIGURATION_3_4_EXPANSION_TB_SCENARIO_TB = new Configuration([
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET, Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]]]);
  export const CONFIGURATION_3_4_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Configuration([
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET, Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]],
    [Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]],
    [Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]],
    [Coordinates.BASE_3_4_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.BASE_FISHERY_TILE_SET, Chits.BASE_FISHERY_CHIT_SET)]]]);
  export const CONFIGURATION_5_6_EXPANSION_TB_SCENARIO_TB = new Configuration(([
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]]]));
  export const CONFIGURATION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Configuration(([
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILES, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]],
    [Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]],
    [Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_FISHERY_TILE_SET, Chits.EXTENSION_5_6_FISHERY_CHIT_SET)]]]));
// }
