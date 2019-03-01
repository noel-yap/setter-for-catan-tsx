import {Chits} from "./Chit";
import {Coordinates} from "./Coordinates";
import {Tiles} from "./Tiles";

export module ConfiguredTiles {
  export class ConfiguredTile {
    constructor(public type: Tiles.Type, public coordinate: Coordinates.Coordinate, public chits: Chits.Chits) {
      this.validateConfiguration(type, coordinate, chits);
    }
    
    validateConfiguration(type: Tiles.Type, coordinate: Coordinates.Coordinate, chits: Chits.Chits) {
      if (Tiles.numberOfEdges(type) !== coordinate.positions.length) {
        throw new Error(`Invalid configuration: Coordinate \`${coordinate}\` is not appropriate for the tile \`${type}\``);
      }
    }
  }
}