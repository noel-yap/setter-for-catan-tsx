import * as Chits from './Chits';
import * as Coordinates from './Coordinates';
import * as Tiles from './Tiles';

// export module Configuration {
  export class Configuration {
    constructor(
        public tile: Tiles.Tile,
        public coordinate: Coordinates.Coordinate,
        public chits: Chits.Chits) {
      this.validateConfiguration();
    }
    
    validateConfiguration() {
      console.log(`tile = ${JSON.stringify(this.tile)}, coordinate = ${JSON.stringify(this.coordinate)}, chits = ${JSON.stringify(this.chits)}`);

      const tileEdgeCount = this.tile.edgeCount();
      if (this.coordinate.edges.length < tileEdgeCount[0] || tileEdgeCount[1] < this.coordinate.edges.length) {
        throw new Error(`Invalid configuration: Coordinate \`${JSON.stringify(this.coordinate)}\` is not appropriate for the tile \`${JSON.stringify(this.tile)}\` with edge count \`{this.tile.edgeCount()\``);
      }
    }
  }
// }