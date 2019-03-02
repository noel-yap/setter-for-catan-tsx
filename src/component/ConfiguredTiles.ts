import * as Chits from "./Chit";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module ConfiguredTiles {
  export class ConfiguredTile {
    constructor(public type: Tiles.Type, public coordinate: Coordinates.Coordinate, public chits: Chits.Chits) {
      this.validateConfiguration(type, coordinate, chits);
    }
    
    validateConfiguration(type: Tiles.Type, coordinate: Coordinates.Coordinate, chits: Chits.Chits) {
      console.log(`ConfiguredTile.validateConfiguration: type = ${JSON.stringify(type)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

      if (Tiles.numberOfEdges(type) !== coordinate.positions.length) {
        throw new Error(`Invalid configuration: Coordinate \`${JSON.stringify(coordinate)}\` is not appropriate for the tile \`${type}\``);
      }
    }
  }
// }