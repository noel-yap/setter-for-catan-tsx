import * as Chits from "./Chits";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module Configuration {
  export class Configuration {
    constructor(public tile: Tiles.Tile, public coordinate: Coordinates.Coordinate, public chits: Chits.Chits) {
      this.validateConfiguration(tile, coordinate, chits);
    }
    
    validateConfiguration(tile: Tiles.Tile, coordinate: Coordinates.Coordinate, chits: Chits.Chits) {
      console.log(`tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

      const tileEdgeCount = tile.edgeCount();
      if (coordinate.edgePositions.length < tileEdgeCount[0] || tileEdgeCount[1] < coordinate.edgePositions.length) {
        throw new Error(`Invalid configuration: Coordinate \`${JSON.stringify(coordinate)}\` is not appropriate for the tile \`${JSON.stringify(tile)}\` with edge count \`{tile.edgeCount()\``);
      }
    }
  }
// }