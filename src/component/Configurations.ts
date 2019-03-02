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
        return configuration[0].length !== configuration[1].reduce((sum, tcb) => sum + tcb.tiles.length, 0);
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

  export const BASE_CONFIGURATION = new Configuration([
    [Coordinates.BASE_TERRAIN_COORDINATES, [
      new TileChitBag([Tiles.DESERT_TERRAIN]),
      new TileChitBag(Tiles.BASE_PRODUCING_TERRAIN_TILES, Chits.BASE_CHIT_SET)]],
    [Coordinates.BASE_PORT_COORDINATES, [
      new TileChitBag(Tiles.BASE_PORT_TILE_SET)]]]);
// }
