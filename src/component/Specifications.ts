import * as _ from 'underscore';

import * as Chits from "./Chits";
import * as Configuration from "./Configuration";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module Specifications {
  export class TileChitBag {
    constructor(public tiles: Tiles.Tile[], public chits: Chits.Chits[] = []) {
      if (this.chits.length === 0) {
        this.chits = new Array(this.tiles.length).fill(Chits.NO_CHITS);
      }
    }
  }

  export class CoordinateTileChitBag {
    constructor(public coordinates: Coordinates.Coordinate[], public tileChitBag: TileChitBag[]) {
      this.validate();
    }

    validate() {
      if (this.coordinates.some((coordinate) => {
        return coordinate.positions.length !== this.coordinates[0].positions.length;
      })) {
        throw new Error(`Invalid configuration: Mixed coordinate types. configurations = ${JSON.stringify(this, null, 2)}`);
      }

      const coordinatesCount = this.coordinates.length;
      const tilesCount = this.tileChitBag.reduce((sum, tcb) => sum + tcb.tiles.length, 0);

      if (coordinatesCount !== tilesCount) {
        console.log(`Specifications.Configuration.validateConfiguration: coordinatesCount = ${coordinatesCount}, tilesCount = ${tilesCount}`);

        throw new Error(`Invalid configuration: Number of coordinates do not match number of tiles/chits. configurations = ${JSON.stringify(this, null, 2)}`);
      }

      if (this.tileChitBag.some((tc) => tc.tiles.length !== tc.chits.length)) {
        throw new Error(`Invalid configuration: Number of tiles do not match number of chits. configurations = ${JSON.stringify(this, null, 2)}`);
      }
    }
    
    toConfiguration(): Configuration.Configuration[] {
      return _.zip(
          _.shuffle(this.coordinates),
          _.shuffle(this.tileChitBag.flatMap((tcb: TileChitBag) => {
            console.log(`tiles = ${JSON.stringify(tcb.tiles)}, chits = ${JSON.stringify(tcb.chits)}`);

            return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.chits));
          })))
          .map(([coordinate, [tile, chits]]): Configuration.Configuration => {
            console.log(`Boards.BoardGenerator.generateBoard: tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

            return new Configuration.Configuration(tile, coordinate, chits);
          });
    }
  }

  export class TileCoordinateBag {
    constructor(public tiles: Tiles.Tile[], public coordinates: Coordinates.Coordinate[]) {}
  }

  export class ChitTileCoordinateBag {
    constructor(public chits: Chits.Chits[], public tileCoordinateBag: TileCoordinateBag[]) {
      this.validate();
    }

    validate() {
      const chitsCount = this.chits.length;
      const tilesCount = this.tileCoordinateBag.reduce((sum, tcb) => sum + tcb.tiles.length, 0);

      if (chitsCount !== tilesCount) {
        console.log(`Specifications.Configuration.validateConfiguration: chitsCount = ${chitsCount}, tilesCount = ${tilesCount}`);

        throw new Error(`Invalid configuration: Number of coordinates do not match number of tiles/chits. configurations = ${JSON.stringify(this, null, 2)}`);
      }

      if (this.tileCoordinateBag.some((tc) => tc.tiles.length !== tc.coordinates.length)) {
        throw new Error(`Invalid configuration: Number of tiles do not match number of chits. configurations = ${JSON.stringify(this, null, 2)}`);
      }
    }

    toConfiguration(): Configuration.Configuration[] {
      return _.zip(
          _.shuffle(this.chits),
          _.shuffle(this.tileCoordinateBag.flatMap((tcb: TileCoordinateBag) => {
            console.log(`tiles = ${JSON.stringify(tcb.tiles)}, coordinates = ${JSON.stringify(tcb.coordinates)}`);

            return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.coordinates));
          })))
          .map(([chits, [tile, coordinate]]): Configuration.Configuration => {
            console.log(`Boards.BoardGenerator.generateBoard: tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

            return new Configuration.Configuration(tile, coordinate, chits);
          });
    }
  }

  export class Specification {
    constructor(public settings: (CoordinateTileChitBag | ChitTileCoordinateBag)[]) {}
  }

  export const BASE_3_4_FISHERY_TILE_CHIT_BAG = new TileChitBag(
      Tiles.BASE_3_4_FISHERY_TILE_SET, Chits.BASE_3_4_FISHERY_CHIT_SET);
  export const BASE_3_4_LAKE_TILE_CHIT_BAG = new TileChitBag(
      [Tiles.LAKE], [Chits.CHITS_2_3_11_12]);
  export const EXTENSION_5_6_FISHERY_TILE_CHIT_BAG = new TileChitBag(
      Tiles.EXTENSION_5_6_FISHERY_TILE_SET, Chits.EXTENSION_5_6_FISHERY_CHIT_SET);
  export const EXTENSION_5_6_LAKE_TILE_CHIT_BAG = new TileChitBag(
      new Array(2).fill(Tiles.LAKE),
      [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9]);

  export const SPECIFICATION_3_4 = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)])]);
  export const SPECIFICATION_3_4_FISHERMEN = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_4_TERRAIN_COORDINATES, [
      BASE_3_4_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET, Chits.BASE_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG])]);

  export const SPECIFICATION_5_6 = new Specification([
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)])]);
  export const SPECIFICATION_5_6_FISHERMEN = new Specification([
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_FISHERY_COORDINATES, [EXTENSION_5_6_FISHERY_TILE_CHIT_BAG])]);

  export const SPECIFICATION_7_8 = new Specification([
    new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)])]);
  export const SPECIFICATION_7_8_FISHERMEN = new Specification([
    new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES, [
      BASE_3_4_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSIONS_7_8_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_FISHERY_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_7_8_FISHERY_TILE_SET, Chits.EXTENSION_7_8_FISHERY_CHIT_SET)])]);

  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, [
      new TileChitBag(
          Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET,
          Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
      new TileChitBag(
          Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
          Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
      new TileChitBag(new Array(5).fill(Tiles.SEA))]),
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_TILE_SET)])]);
  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.settings
      .concat([
        new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES, [
          new TileChitBag(
              Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_TILE_SET,
              Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERY_CHIT_SET)])]));

  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS = new Specification(SPECIFICATION_3_4.settings
      .concat([
        new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(4).fill(Tiles.SEA))])]));
  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(SPECIFICATION_3_4_FISHERMEN.settings
      .concat([
        new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(4).fill(Tiles.SEA))])]));

  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS = new Specification(SPECIFICATION_5_6.settings
      .map((setting) => setting as CoordinateTileChitBag)
      .filter((setting) => setting.coordinates === Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES)
      .map((setting) => {
        return new CoordinateTileChitBag(
            Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, setting.tileChitBag);
      })
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
          new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(4).fill(Tiles.SEA))])]));
  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(SPECIFICATION_5_6_FISHERMEN.settings
      .map((setting) => setting as CoordinateTileChitBag)
      .filter((setting) => setting.coordinates === Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES)
      .map((setting) => {
        return new CoordinateTileChitBag(
            Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, setting.tileChitBag);
      })
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
          new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(4).fill(Tiles.SEA))])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES, [
            EXTENSION_5_6_FISHERY_TILE_CHIT_BAG])]));

  export const SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS = new Specification(SPECIFICATION_7_8.settings
      .map((setting) => setting as CoordinateTileChitBag)
      .filter((setting) => setting.coordinates === Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES)
      .map((setting) => {
        return new CoordinateTileChitBag(
            Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, setting.tileChitBag);
      })
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
            new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(10).fill(Tiles.SEA))])]));
  export const SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(SPECIFICATION_7_8_FISHERMEN.settings
      .map((setting) => setting as CoordinateTileChitBag)
      .filter((setting) => setting.coordinates === Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES)
      .map((setting) => {
        return new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES, setting.tileChitBag);
      })
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES, [
            new TileChitBag(Tiles.EXTENSION_7_8_HARBOR_TILE_SET)])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES, [
            EXTENSION_5_6_FISHERY_TILE_CHIT_BAG])])
      .concat([
        new CoordinateTileChitBag(Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES, [
          new TileChitBag(
              Tiles.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
              Chits.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET),
          new TileChitBag(new Array(10).fill(Tiles.SEA))])]));

  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES, [
        new TileChitBag(
            Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
            Chits.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES,
      [new TileChitBag(Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_PRODUCING_TERRAIN_COORDINATES,
      [new TileChitBag(new Array(12).fill(Tiles.UNKNOWN))])]);
  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.settings
      .concat([
        new CoordinateTileChitBag(Coordinates.BASE_3_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG])]));

  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES, [
        new TileChitBag(
            Tiles.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
            Chits.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES,
      [new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_PRODUCING_TERRAIN_COORDINATES,
      [new TileChitBag(new Array(12).fill(Tiles.UNKNOWN))])]);
  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.settings
      .concat([
        new CoordinateTileChitBag(Coordinates.BASE_4_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG])]));

  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI = new Specification([
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES, [
        new TileChitBag([Tiles.DESERT_TERRAIN]),
        new TileChitBag(
            Tiles.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
            Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_GOLD_TERRAIN_COORDINATES,
      [new TileChitBag(new Array(2).fill(Tiles.GOLD_TERRAIN), Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_GOLD_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES,
      [new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_UNKNOWN_COORDINATES, [
        new TileChitBag(new Array(25).fill(Tiles.UNKNOWN))])]);
  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.settings
      .concat([
          new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES, [
              EXTENSION_5_6_FISHERY_TILE_CHIT_BAG])]));

  export const SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET, Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)])]);
  export const SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Specification([
    new CoordinateTileChitBag(Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(
          Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET,
          Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.BASE_3_4_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.BASE_3_4_FISHERY_COORDINATES, [BASE_3_4_FISHERY_TILE_CHIT_BAG])]);
  export const SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB = new Specification(([
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(2).fill(Tiles.DESERT_TERRAIN)),
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)])]));
  export const SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Specification(([
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES, [
      EXTENSION_5_6_LAKE_TILE_CHIT_BAG,
      new TileChitBag(Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET, Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.CASTLE_TERRAIN])]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.GLASSWORKS_TERRAIN))]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES, [
      new TileChitBag(new Array(3).fill(Tiles.QUARRY_TERRAIN))]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES, [
      new TileChitBag(Tiles.EXTENSION_5_6_HARBOR_TILE_SET)]),
    new CoordinateTileChitBag(Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES, [EXTENSION_5_6_FISHERY_TILE_CHIT_BAG])]));
// }
