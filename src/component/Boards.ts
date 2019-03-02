import * as _ from 'underscore';

import * as Configurations from "./Configurations";
import * as ConfiguredTiles from "./ConfiguredTiles";
import * as Coordinates from "./Coordinates";

// export module Boards {
  export class Board {
    private terrainTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private portTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private fisheryTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];

    constructor(settings: ConfiguredTiles.ConfiguredTile[]) {
      console.log(`Boards.Board.constructor: settings = ${JSON.stringify(settings)}`);

      const groupedSettings = _.groupBy(settings, (setting) => setting.coordinate.positions.length);
      console.log(`Boards.Board.constructor: groupedSettings = ${JSON.stringify(groupedSettings)}`);

      this.portTilesLayout = groupedSettings['1'];
      this.fisheryTilesLayout = groupedSettings['2'];
      this.terrainTilesLayout = groupedSettings['6'];
    }
  }

  export class BoardGenerator {
    constructor(public configuration: Configurations.Configuration) {}

    generateBoard(): Board {
      return new Board(
          this.configuration.settings.flatMap((configuration: [Coordinates.Coordinate[], Configurations.TileChitBag[]]) => {
            return _.zip(_.shuffle(configuration[0]), _.shuffle(configuration[1].flatMap((tcb: Configurations.TileChitBag) => {
              console.log(`Boards.BoardGenerator.generateBoard: tiles = ${JSON.stringify(tcb.tiles)}, chits = ${JSON.stringify(tcb.chits)}`);

              return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.chits));
            })));
          }).map(([coordinate, [tile, chits]]) => {
            console.log(`Boards.BoardGenerator.generateBoard: tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);
            return new ConfiguredTiles.ConfiguredTile(tile.type, coordinate, chits);
          }));
    }
  }
  //
  // export class BoardVerifier {
  //   constructor(public board: Board) {}
  //
  //   verifyBoard() {
  //
  //   }
  // }
// }
