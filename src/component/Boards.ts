import * as _ from 'underscore';

import * as Configurations from "./Configurations";
import * as ConfiguredTiles from "./ConfiguredTiles";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module Boards {
  export class Board {
    private _terrainTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private _portTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];
    private _fisheryTilesLayout: ConfiguredTiles.ConfiguredTile[] = [];

    constructor(settings: ConfiguredTiles.ConfiguredTile[]) {
      console.log(`Boards.Board.constructor: settings = ${JSON.stringify(settings)}`);

      const groupedSettings = _.groupBy(settings, (setting) => setting.coordinate.positions.length);
      console.log(`Boards.Board.constructor: groupedSettings = ${JSON.stringify(groupedSettings)}`);

      this._portTilesLayout = groupedSettings['1'] || [];
      this._fisheryTilesLayout = groupedSettings['2'] || [];
      this._terrainTilesLayout = groupedSettings['6'] || [];
    }

    get terrainTilesLayout(): ConfiguredTiles.ConfiguredTile[] {
      return this._terrainTilesLayout;
    }

    get portTilesLayout(): ConfiguredTiles.ConfiguredTile[] {
      return this._portTilesLayout;
    }

    get fisheryTilesLayout(): ConfiguredTiles.ConfiguredTile[] {
      return this._fisheryTilesLayout;
    }

    isEmpty(): boolean {
      return this._terrainTilesLayout.length === 0 && this._portTilesLayout.length === 0 && this._fisheryTilesLayout.length === 0;
    }
  }

  export class BoardGenerator {
    constructor(public configuration: Configurations.Configuration) {}

    generateBoard(): Board {
      let result;
      let count = 0;
      let validBoard;

      do {
        result = new Board(
            this.configuration.settings.flatMap((configuration: [Coordinates.Coordinate[], Configurations.TileChitBag[]]) => {
              return _.zip(_.shuffle(configuration[0]), _.shuffle(configuration[1].flatMap((tcb: Configurations.TileChitBag) => {
                console.log(`Boards.BoardGenerator.generateBoard: tiles = ${JSON.stringify(tcb.tiles)}, chits = ${JSON.stringify(tcb.chits)}`);

                return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.chits));
              })));
            }).map(([coordinate, [tile, chits]]) => {
              console.log(`Boards.BoardGenerator.generateBoard: tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

              return new ConfiguredTiles.ConfiguredTile(tile, coordinate, chits);
            }));

        validBoard = BoardGenerator.verifyBoard(
            result,
            count < 216
                ? [
                  [0, 6],
                  [3, 9],
                  [6, 12]]
                : count < 2 * 216
                ? [
                  [0, 6],
                  [2, 10],
                  [5, 13]]
                : count < 4 * 216
                ? [
                  [0, 6],
                  [2, 10],
                  [4, 14]]
                : [
                  [0, 6],
                  [1, 11],
                  [3, 15]]);

        console.log(`Boards.BoardGenerator.generateBoard: count = ${count}, validBoard = ${validBoard}`);
      } while (!validBoard && ++count < 6 * 216);

      return result;
    }

    static verifyBoard(board: Board, validOddsRanges: number[][]): boolean {
      function key(x: number, y: number): string {
        return `(${x},${y})`;
      }
      function odds(contributingTiles: ConfiguredTiles.ConfiguredTile[], vertex: number): number {
        return contributingTiles
            .filter((ct) => {
              return ct.coordinate.positions.some((p) => {
                return p === vertex || p === (vertex + 5) % 6;
              });
            })
            .reduce((sum, ct) => {
              return ct.chits.odds();
            }, 0);
      }
      function oddsWithinValidRange(contributors: [ConfiguredTiles.ConfiguredTile[], number][]) {
        if (contributors.length === 0) {
          return true;
        }
        const validRange = validOddsRanges[contributors.length - 1];

        const o = contributors
            .reduce((sum, c) => sum + odds(c[0], c[1]), 0);

        console.log(`Boards.BoardGenerator.verifyBoard: contributors = ${JSON.stringify(contributors)}, odds = ${o}, validRange = ${JSON.stringify(validRange)}`);

        return validRange[0] <= o && o <= validRange[1];
      }

      const producingConfiguredTiles = board.terrainTilesLayout
          .filter((ct) => {
            return ct.tile !== Tiles.SEA
          })
          .concat(board.fisheryTilesLayout);
      const coordinatesMap = _.groupBy(
          producingConfiguredTiles,
          (ct) => key(ct.coordinate.x, ct.coordinate.y));

      const xs: number[] = Object.keys(coordinatesMap)
          .map((c) => {
            return Number(c
                .substr(1, c.length - 1)
                .replace(/,.*/, ''));
          });
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);

      const ys: number[] = Object.keys(coordinatesMap)
          .map((c) => {
            return Number(c
                .substr(1, c.length - 2)
                .replace(/.*,/, ''));
          });
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      console.log(`Boards.BoardGenerator.verifyBoard: x ∈ [${minX}, ${maxX}], y ∈ [${minY}, ${maxY}]`);

      for (let x = minX - 1; x < maxX + 2; ++x) {
        for (let y = minY - 2; y < maxY + 1; ++y) {
          const topVertexContributors = <[ConfiguredTiles.ConfiguredTile[], number][]>[
            [coordinatesMap[key(x, y)], 0],
            [coordinatesMap[key(x - 1, y - 1)], 2],
            [coordinatesMap[key(x + 1, y - 1)], 4]]
              .filter((elt) => elt[0] !== undefined);
          if (!oddsWithinValidRange(topVertexContributors)) {
            return false;
          }

          const topRightVertexContributors = <[ConfiguredTiles.ConfiguredTile[], number][]>[
            [coordinatesMap[key(x, y)], 1],
            [coordinatesMap[key(x + 1, y - 1)], 3],
            [coordinatesMap[key(x + 2, y)], 5]]
              .filter((elt) => elt[0] !== undefined);
          if (!oddsWithinValidRange(topRightVertexContributors)) {
            return false;
          }
        }
      }

      return true;
    }
  }
// }
