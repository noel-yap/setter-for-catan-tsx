import * as _ from 'underscore';

import * as Configuration from './Configuration';
import * as Coordinates from './Coordinates';
import * as Specifications from './Specifications';
import * as Tiles from './Tiles';

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
      const steppedValidOddsRanges = [
        [[0, 6], [3, 9], [6, 12]],
        [[0, 6], [2, 10], [5, 13]],
        [[0, 6], [2, 10], [4, 14]],
        [[0, 6], [1, 11], [3, 15]],
        [[0, 6], [1, 11], [2, 16]],
        [[0, 6], [0, 12], [0, 18]],
        [[0, Number.MAX_SAFE_INTEGER], [0, Number.MAX_SAFE_INTEGER], [0, Number.MAX_SAFE_INTEGER]]];
      const attemptsPerStep = Math.pow(6, 3);

      return _.range(0, steppedValidOddsRanges.length * attemptsPerStep)
          .reduce((accum, count, _, range) => {
            const maxScore = accum['maxScore'];

            const validOddsRanges = steppedValidOddsRanges[Math.floor(count / attemptsPerStep)];
            const initialScore = validOddsRanges[0][0] + validOddsRanges[1][0] + validOddsRanges[2][0];

            if (maxScore >= initialScore) {
              // highest-scoring board has been found

              range.splice(1); // break out of iteration
            } else {
              const configurations = this.specification.toConfiguration();

              // TODO: Score configuration validation instead of having it be all-or-nothing.
              const configurationsValid = configurations.every((configuration) => {
                const result = this.specification.validateConfiguration(configuration);

                console.log(`${JSON.stringify(configuration)} ${result ? 'passes' : 'fails'} custom validation.`);

                return result;
              });
              if (configurationsValid) {
                const board = new Board(configurations);

                const boardPenalty = BoardGenerator.boardPenalty(board, validOddsRanges);
                const totalScore = initialScore - boardPenalty;
                if (totalScore > maxScore) {
                  return {'maxScore': totalScore, 'fairestBoard': board};
                }
              }
            }

            console.log(`count = ${count}, validOddsRange = ${JSON.stringify(validOddsRanges)}, score = ${maxScore}`);

            return accum;
          }, {'maxScore': 0, 'fairestBoard': new Board([])})['fairestBoard'];
    }

    static boardPenalty(board: Board, validOddsRanges: number[][]): number {
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

              return sum + ctOdds;
            }, 0);
      }
      function penaltyPoints(contributors: [Configuration.Configuration[], number][]): number {
        if (contributors.length === 0) {
          return 0;
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

        const result = totalOdds < validRange[0]
            ? validRange[0] - totalOdds
            : validRange[1] < totalOdds
            ? totalOdds - validRange[1]
            : 0;

        console.log(`contributors = ${JSON.stringify(contributors)}, odds = ${totalOdds}, contributorCount = ${contributorCount}, validRange = ${JSON.stringify(validRange)}, ${result === 0 ? 'pass' : 'fail'}`);

        return result;
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

      return _.range(minY - 1, maxY + 1)
          .reduce((sumOverYs, y) => {
            const xAdjustment = (minX + y) % 2;

            return sumOverYs + _.range(minX - 2 + xAdjustment, maxX + 2 - xAdjustment, 2)
                .reduce((sumOverXs, x) => {
                  const topVertexContributors = <[Configuration.Configuration[], number][]>[
                    [coordinatesMap[key(x, y)], Coordinates.VertexPosition.TOP],
                    [coordinatesMap[key(x - 1, y - 1)], Coordinates.VertexPosition.BOTTOM_RIGHT],
                    [coordinatesMap[key(x + 1, y - 1)], Coordinates.VertexPosition.BOTTOM_LEFT]];
                  const topRightVertexContributors = <[Configuration.Configuration[], number][]>[
                    [coordinatesMap[key(x, y)], Coordinates.VertexPosition.TOP_RIGHT],
                    [coordinatesMap[key(x + 1, y - 1)], Coordinates.VertexPosition.BOTTOM],
                    [coordinatesMap[key(x + 2, y)], Coordinates.VertexPosition.TOP_LEFT]];

                  console.log(`(x, y) = ${key(x, y)}, topVertexContributors = ${JSON.stringify(topVertexContributors)}, topRightVertexContributors = ${JSON.stringify(topRightVertexContributors)}`);

                  return sumOverXs + [topVertexContributors, topRightVertexContributors]
                      .reduce((sumOverContributors, contributors) => {
                        const eligibleContributors = contributors
                            .filter((elt) => elt[0] !== undefined)
                            .map((elt) => {
                              const eligibleConfiguration = elt[0]
                                  .filter((ct) => {
                                    return Tiles.SEA !== ct.tile
                                        && ct.coordinate.edgePositions.some((p) => {
                                          return p === elt[1] || p === (elt[1] + 5) % 6;
                                        });
                                  });
                              return [eligibleConfiguration, elt[1]] as [Configuration.Configuration[], number];
                            })
                            .filter((elt) => {
                              return elt[0].length > 0;
                            });

                        return sumOverContributors + penaltyPoints(eligibleContributors);
                      }, 0);
                }, 0);
          }, 0);
    }
  }
// }
