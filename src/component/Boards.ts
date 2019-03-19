import * as _ from 'underscore';

import * as Specifications from "./Specifications";
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
    constructor(public configuration: Specifications.Specification) {}

    generateBoard(): Board {
      let result;
      let count = 0;
      let validBoard;

      do {
        result = new Board(
            this.configuration.settings.flatMap((configuration: [Coordinates.Coordinate[], Specifications.TileChitBag[]]) => {
              return _.zip(_.shuffle(configuration[0]), _.shuffle(configuration[1].flatMap((tcb: Specifications.TileChitBag) => {
                console.log(`Boards.BoardGenerator.generateBoard: tiles = ${JSON.stringify(tcb.tiles)}, chits = ${JSON.stringify(tcb.chits)}`);

                return _.zip(_.shuffle(tcb.tiles), _.shuffle(tcb.chits));
              })));
            }).map(([coordinate, [tile, chits]]) => {
              console.log(`Boards.BoardGenerator.generateBoard: tile = ${JSON.stringify(tile)}, coordinate = ${JSON.stringify(coordinate)}, chits = ${JSON.stringify(chits)}`);

              return new ConfiguredTiles.ConfiguredTile(tile, coordinate, chits);
            }));

        const validOddsRanges = count < 216
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
              [3, 15]];
        validBoard = BoardGenerator.verifyBoard(result, validOddsRanges);

        console.log(`Boards.BoardGenerator.generateBoard: count = ${count}, validOddsRange = ${JSON.stringify(validOddsRanges)}, validBoard = ${validBoard}`);
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

        const contributorCount = contributors.reduce((sum, c) => sum + c[0].length, 0);
        const validRange = validOddsRanges[contributorCount - 1];

        const totalOdds = contributors
            .reduce((sum, c) => sum + odds(c[0], c[1]), 0);

        console.log(`Boards.BoardGenerator.verifyBoard: contributors = ${JSON.stringify(contributors)}, odds = ${totalOdds}, contributorCount = ${contributorCount}, validRange = ${JSON.stringify(validRange)}`);

        return validRange[0] <= totalOdds && totalOdds <= validRange[1];
      }

      const producingConfiguredTiles = board.terrainTilesLayout
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
            [coordinatesMap[key(x + 1, y - 1)], 4]];
          const topRightVertexContributors = <[ConfiguredTiles.ConfiguredTile[], number][]>[
            [coordinatesMap[key(x, y)], 1],
            [coordinatesMap[key(x + 1, y - 1)], 3],
            [coordinatesMap[key(x + 2, y)], 5]];

          const invalid = [topVertexContributors, topRightVertexContributors].some((contributors) => {
            const eligibleContributors = contributors
                .filter((elt) => elt[0] !== undefined)
                .map((elt) => {
                  const eligibleConfiguredTiles = elt[0]
                      .filter((ct) => {
                        return [Tiles.SEA, Tiles.UNKNOWN].every((t) => t !== ct.tile)
                            && ct.coordinate.positions.some((p) => {
                              return p === elt[1] || p === (elt[1] + 5) % 6;
                            });
                      });
                  return [eligibleConfiguredTiles, elt[1]] as [ConfiguredTiles.ConfiguredTile[], number];
                })
                .filter((elt) => {
                  return elt[0].length > 0;
                });

            return !oddsWithinValidRange(eligibleContributors);
          });
          if (invalid) {
            return false;
          }
        }
      }

      return true;
    }
  }
// }
