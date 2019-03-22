import * as _ from 'underscore';

import * as Specifications from "./Specifications";
import * as Configuration from "./Configuration";
import * as Tiles from "./Tiles";

// export module Boards {
  export class Board {
    private _terrainTilesLayout: Configuration.Configuration[] = [];
    private _portTilesLayout: Configuration.Configuration[] = [];
    private _fisheryTilesLayout: Configuration.Configuration[] = [];

    constructor(settings: Configuration.Configuration[]) {
      console.log(`Boards.Board.constructor: settings = ${JSON.stringify(settings)}`);

      const groupedSettings = _.groupBy(settings, (setting) => setting.coordinate.positions.length);
      console.log(`Boards.Board.constructor: groupedSettings = ${JSON.stringify(groupedSettings)}`);

      this._portTilesLayout = groupedSettings['1'] || [];
      this._fisheryTilesLayout = groupedSettings['2'] || [];
      this._terrainTilesLayout = groupedSettings['6'] || [];
    }

    get terrainTilesLayout(): Configuration.Configuration[] {
      return this._terrainTilesLayout;
    }

    get portTilesLayout(): Configuration.Configuration[] {
      return this._portTilesLayout;
    }

    get fisheryTilesLayout(): Configuration.Configuration[] {
      return this._fisheryTilesLayout;
    }

    isEmpty(): boolean {
      return this._terrainTilesLayout.length === 0 && this._portTilesLayout.length === 0 && this._fisheryTilesLayout.length === 0;
    }
  }

  export class BoardGenerator {
    constructor(public specification: Specifications.Specification) {}

    generateBoard(): Board {
      let result;
      let count = 0;
      let validBoard;

      do {
        result = new Board(this.specification.toConfiguration());

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

        console.log(`count = ${count}, validOddsRange = ${JSON.stringify(validOddsRanges)}, validBoard = ${validBoard}`);
      } while (!validBoard && ++count < 6 * 216);

      return result;
    }

    static verifyBoard(board: Board, validOddsRanges: number[][]): boolean {
      function key(x: number, y: number): string {
        return `(${x},${y})`;
      }
      function odds(contributingTiles: Configuration.Configuration[], vertex: number): number {
        return contributingTiles
            .filter((ct) => {
              return ct.coordinate.positions.some((p) => {
                return p === vertex || p === (vertex + 5) % 6;
              });
            })
            .reduce((sum, ct) => {
              console.log(`ct = ${JSON.stringify(ct)}`);

              return ct.chits.odds();
            }, 0);
      }
      function oddsWithinValidRange(contributors: [Configuration.Configuration[], number][]) {
        if (contributors.length === 0) {
          return true;
        }

        const contributorCount = contributors.reduce((sum, c) => sum + c[0].length, 0);
        const validRange = validOddsRanges[contributorCount - 1];

        if (validRange === undefined) {
          throw new Error(`Invalid configuration: ${contributorCount} tiles contributing to coordinate. contributors = ${JSON.stringify(contributors)}`);
        }

        const totalOdds = contributors
            .reduce((sum, c) => sum + odds(c[0], c[1]), 0);

        console.log(`contributors = ${JSON.stringify(contributors)}, odds = ${totalOdds}, contributorCount = ${contributorCount}, validRange = ${JSON.stringify(validRange)}`);

        return validRange[0] <= totalOdds && totalOdds <= validRange[1];
      }

      const producingConfiguration = board.terrainTilesLayout
          .concat(board.fisheryTilesLayout);
      const coordinatesMap = _.groupBy(
          producingConfiguration,
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

      console.log(`x ∈ [${minX}, ${maxX}], y ∈ [${minY}, ${maxY}]`);

      for (let x = minX - 1; x < maxX + 2; ++x) {
        for (let y = minY - 2; y < maxY + 1; ++y) {
          const topVertexContributors = <[Configuration.Configuration[], number][]>[
            [coordinatesMap[key(x, y)], 0],
            [coordinatesMap[key(x - 1, y - 1)], 2],
            [coordinatesMap[key(x + 1, y - 1)], 4]];
          const topRightVertexContributors = <[Configuration.Configuration[], number][]>[
            [coordinatesMap[key(x, y)], 1],
            [coordinatesMap[key(x + 1, y - 1)], 3],
            [coordinatesMap[key(x + 2, y)], 5]];

          const invalid = [topVertexContributors, topRightVertexContributors].some((contributors) => {
            const eligibleContributors = contributors
                .filter((elt) => elt[0] !== undefined)
                .map((elt) => {
                  const eligibleConfiguration = elt[0]
                      .filter((ct) => {
                        return [Tiles.SEA, Tiles.UNKNOWN].every((t) => t !== ct.tile)
                            && ct.coordinate.positions.some((p) => {
                              return p === elt[1] || p === (elt[1] + 5) % 6;
                            });
                      });
                  return [eligibleConfiguration, elt[1]] as [Configuration.Configuration[], number];
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
