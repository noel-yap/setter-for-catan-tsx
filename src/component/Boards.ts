import * as _ from 'underscore';

import {Chits} from "./Chit";
import {Configurations} from "./Configurations";
import {ConfiguredTiles} from "./ConfiguredTiles";
import {Coordinates} from "./Coordinates";
import {Tiles} from "./Tiles";

export module Boards {
  import TileChitBag = Configurations.TileChitBag;

  export class Board {
    private terrainTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private portTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private fisheryTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];

    constructor(settings: ConfiguredTiles.ConfiguredTile[]) {
      const groupedConfigurations = _.groupBy(settings, (setting) => setting.coordinate.positions.length);

      this.portTilesLayout.concat(groupedConfigurations[1]);
      this.fisheryTilesLayout.concat(groupedConfigurations[2]);
      this.terrainTilesLayout.concat(groupedConfigurations[6]);
    }
  }

  export class BoardGenerator {
    constructor(public configuration: Configurations.Configuration) {}

    generateBoard(): Board {
      return new Board(
          this.configuration.settings.flatMap((configuration: [Coordinates.Coordinate[], TileChitBag[]]) => {
            return _.zip(_.shuffle(configuration[0]), _.shuffle(configuration[1].flatMap((tcb: Configurations.TileChitBag) => {
              return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.chits));
            })));
          }).map(([coordinate, tile, chits]) => {
            return new ConfiguredTiles.ConfiguredTile(tile.type, chits, coordinate);
          }));
    }
  }

  export class BoardVerifier {
    constructor(public board: Board) {}

    verifyBoard() {

    }
  }
}
