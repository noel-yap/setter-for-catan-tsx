import * as _ from 'underscore';

import * as Specifications from "./Specifications";
import * as Configuration from "./Configuration";
import * as Tiles from "./Tiles";
import * as Coordinates from "./Coordinates";

// export module Boards {
  export class Board {
    private _terrainTilesLayout: Configuration.Configuration[] = [];
    private _portTilesLayout: Configuration.Configuration[] = [];
    private _fisheryTilesLayout: Configuration.Configuration[] = [];
    private _riverLayout: Configuration.Configuration[] = [];

    constructor(configurations: Configuration.Configuration[]) {
      console.log(`configuration = ${JSON.stringify(configurations)}`);

      const riverNotRiver = _.groupBy(configurations, (configuration) => configuration.tile.type === Tiles.Type.RIVER ? 0 : 1);
      const groupedSettings = _.groupBy(riverNotRiver[1], (configuration) => configuration.coordinate.edgePositions.length);

      this._portTilesLayout = groupedSettings['1'] || [];
      this._fisheryTilesLayout = groupedSettings['2'] || [];
      this._terrainTilesLayout = groupedSettings['6'] || [];
      this._riverLayout = riverNotRiver[0] || [];
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

    get riverLayout(): Configuration.Configuration[] {
      return this._riverLayout;
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
              return ct.coordinate.edgePositions.some((p) => {
                return p === vertex || p === (vertex + 5) % 6;
              });
            })
            .reduce((sum, ct) => {
              const ctOdds = ct.chits.odds();

              console.log(`ct = ${JSON.stringify(ct)}, ctOdds = ${ctOdds}`);

              return sum + ctOdds;
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
            .reduce((sum, contributor) => {
              const contributorOdds = odds(contributor[0], contributor[1]);

              console.log(`contributor = ${JSON.stringify(contributor)}, odds = ${contributorOdds}`);

              return sum + contributorOdds;
            }, 0);

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

      for (let y = minY; y < maxY + 1; ++y) {
        for (let x = minX - 2 + (minX + minY) % 2; x < maxX + 2; x += 2) {
          const topVertexContributors = <[Configuration.Configuration[], number][]>[
            [coordinatesMap[key(x, y)], Coordinates.VertexPosition.TOP],
            [coordinatesMap[key(x - 1, y - 1)], Coordinates.VertexPosition.BOTTOM_RIGHT],
            [coordinatesMap[key(x + 1, y - 1)], Coordinates.VertexPosition.BOTTOM_LEFT]];
          const topRightVertexContributors = <[Configuration.Configuration[], number][]>[
            [coordinatesMap[key(x, y)], Coordinates.VertexPosition.TOP_RIGHT],
            [coordinatesMap[key(x + 1, y - 1)], Coordinates.VertexPosition.BOTTOM],
            [coordinatesMap[key(x + 2, y)], Coordinates.VertexPosition.TOP_LEFT]];

          console.log(`(x, y) = ${key(x, y)}, topVertexContributors = ${JSON.stringify(topVertexContributors)}, topRightVertexContributors = ${JSON.stringify(topRightVertexContributors)}`);

          const invalid = [topVertexContributors, topRightVertexContributors].some((contributors) => {
            const eligibleContributors = contributors
                .filter((elt) => elt[0] !== undefined)
                .map((elt) => {
                  const eligibleConfiguration = elt[0]
                      .filter((ct) => {
                        return [Tiles.SEA, Tiles.UNKNOWN].every((t) => t !== ct.tile)
                            && ct.coordinate.edgePositions.some((p) => {
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
