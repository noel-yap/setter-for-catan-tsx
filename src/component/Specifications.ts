import * as _ from 'underscore';

import * as Chits from "./Chits";
import * as Configuration from "./Configuration";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module Specifications {
  export class Specification {
    constructor(
        public tiles: {[name: string]: Tiles.Tile[]},
        public coordinates: {[name: string]: Coordinates.Coordinate[]},
        public chits: {[name: string]: Chits.Chits[]},
        public coordinatesTilesMap: {[coordinatesName: string]: string[]} = {},
        public chitsTilesMap: {[chitsName: string]: string[]} = {}) {
      this.validate();
    }

    validate() {
      const checkForNotReferencedErrors = (artifact: string, artifacts: {[artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[]}, artifactsTilesMap: {[artifactName: string]: string[]}) => {
        const artifactsKeys = Object.keys(artifacts);
        const artifactsTilesMapKeys = Object.keys(artifactsTilesMap);

        const missingFromArtifactsTilesMap = artifactsKeys
            .filter((key) => artifactsTilesMapKeys.indexOf(key) === -1);
        if (missingFromArtifactsTilesMap.length !== 0) {
          throw new Error(`Invalid specification: ${missingFromArtifactsTilesMap} not referenced in ${artifact}TilesMap.`);
        }

        const missingFromArtifacts = artifactsKeys
            .filter((key) => artifactsKeys.indexOf(key) === -1);
        if (missingFromArtifacts.length !== 0) {
          throw new Error(`Invalid specification: ${missingFromArtifacts} not referenced in ${artifact}.`);
        }
      };
      checkForNotReferencedErrors('coordinates', this.coordinates, this.coordinatesTilesMap);
      checkForNotReferencedErrors('chits', this.chits, this.chitsTilesMap);

      // TODO: Ensure all tiles are mapped exactly once to coordinates.

      const mismatchError = (artifact: string, artifacts: {[artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[]}, artifactsTilesMap: {[artifactName: string]: string[]}) => {
        return Object.keys(artifactsTilesMap)
            .map((artifactsName) => {
              const artifactsCount = artifacts[artifactsName].length;
              const tilesNames = artifactsTilesMap[artifactsName];
              const tilesCount = tilesNames.reduce((count, tilesName) => count + this.tiles[tilesName].length, 0);

              return [artifactsName, artifactsCount, tilesNames, tilesCount];
            })
            .filter(([artifactsName, artifactsCount, tilesNames, tilesCount]) => artifactsCount !== tilesCount)
            .map(([artifactsName, artifactsCount, tilesNames, tilesCount]) => {
              return `Invalid specification: ${artifactsCount} ${artifact} do not match ${tilesCount} tiles. ${artifact}Name = ${artifactsName}; tilesNames = ${tilesNames}`;
            });
      };
      const mismatchErrors = mismatchError('coordinates', this.coordinates, this.coordinatesTilesMap)
          .concat(mismatchError('chits', this.chits, this.chitsTilesMap));
      if (mismatchErrors.length !== 0) {
        throw new Error(mismatchErrors.join('.\n'));
      }
    }

    toConfiguration(): Configuration.Configuration[] {
      const tileId = (tileName: string, index: number) => {
        return `${tileName}[${index}]`;
      };
      const tileArtifactMap = (
          artifactsTilesMap: {[artifactName: string]: string[]},
          artifactMap: {[artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[]}) => {
        return Object.keys(artifactsTilesMap)
            .flatMap((artifactName) => {
              const tilesNames: string[] = artifactsTilesMap[artifactName];
              const tileIds: string[] = tilesNames
                  .flatMap((tileName) => {
                    console.log(`tileName = ${tileName}, tiles = ${JSON.stringify(this.tiles)}`);

                    return this.tiles[tileName].map((tile, index) => tileId(tileName, index));
                  });
              const artifacts = artifactMap[artifactName];

              return _.zip(tileIds, _.shuffle(artifacts));
            })
            .reduce((object, pair) => {
              return Object.assign(object, {[pair[0]]: pair[1]});
            }, {})
      };

      const tileCoordinateMap = tileArtifactMap(this.coordinatesTilesMap, this.coordinates);
      const tileChitsMap = tileArtifactMap(this.chitsTilesMap, this.chits);

      return Object.keys(tileCoordinateMap).map((tileId) => {
        const delimiterIndex = tileId.indexOf('[');
        const tileName = tileId.substring(0, delimiterIndex);
        const index = parseInt(tileId.substring(delimiterIndex + 1, tileId.indexOf(']')));

        return new Configuration.Configuration(this.tiles[tileName][index], tileCoordinateMap[tileId], tileChitsMap[tileId] || Chits.NO_CHITS);
      });
    }
  }

  export const SPECIFICATION_3_4 = new Specification(
      {
        'producing-terrain': Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'terrain': Coordinates.BASE_3_4_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.BASE_3_4_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'terrain': ['producing-terrain', 'desert'],
        'harbor': ['harbor']
      },
      {
        'producing-terrain': ['producing-terrain']
      });
  export const SPECIFICATION_3_4_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_3_4.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_3_4.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_3_4.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_3_4.coordinatesTilesMap}, {
        'terrain': ['producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_3_4.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_5_6 = new Specification(
      {
        'producing-terrain': Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'harbor': Tiles.EXTENSION_5_6_HARBOR_TILE_SET
      },
      {
        'terrain': Coordinates.EXTENSION_5_6_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_5_6_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'terrain': ['producing-terrain', 'desert'],
        'harbor': ['harbor']
      },
      {
        'producing-terrain': ['producing-terrain']
      });
  export const SPECIFICATION_5_6_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_5_6.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXTENSION_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_5_6.coordinates}, {
        'fishery': Coordinates.EXTENSION_5_6_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_5_6.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXTENSION_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_5_6.coordinatesTilesMap}, {
        'terrain': ['producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_5_6.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_7_8 = new Specification(
      {
        'producing-terrain': Tiles.EXTENSION_7_8_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'harbor': Tiles.EXTENSION_7_8_HARBOR_TILE_SET
      },
      {
        'terrain': Coordinates.EXTENSION_7_8_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_7_8_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'terrain': ['producing-terrain', 'desert'],
        'harbor': ['harbor']
      },
      {
        'producing-terrain': ['producing-terrain']
      });
  export const SPECIFICATION_7_8_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_7_8.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.EXTENSION_7_8_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_7_8.coordinates}, {
        'fishery': Coordinates.EXTENSION_7_8_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_7_8.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.EXTENSION_7_8_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_7_8.coordinatesTilesMap}, {
        'terrain': ['producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_7_8.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS = new Specification(
    {
      'big-island-producing-terrain': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET,
      'small-island-producing-terrain': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
      'sea': new Array(5).fill(Tiles.SEA),
      'harbor': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_TILE_SET
    },
    {
      'big-island-terrain': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
      'small-island-terrain': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
      'harbor': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES
    },
    {
      'big-island-producing-terrain': Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_PRODUCING_TERRAIN_CHIT_SET,
      'small-island-producing-terrain': Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
    },
    {
      'big-island-terrain': ['big-island-producing-terrain'],
      'small-island-terrain': ['small-island-producing-terrain', 'sea'],
      'harbor': ['harbor']
    },
    {
      'big-island-producing-terrain': ['big-island-producing-terrain'],
      'small-island-producing-terrain': ['small-island-producing-terrain']
    });
  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.tiles}, {
        'fishery': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.coordinates}, {
        'fishery': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.chits}, {
        'fishery': Chits.BASE_3_EXPANSION_SEA_SCENARIO_HFNS_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.coordinatesTilesMap}, {
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_HFNS.chitsTilesMap}, {
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'small-island-producing-terrain': Tiles.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(4).fill(Tiles.SEA),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.BASE_3_4_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.BASE_3_4_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.BASE_4_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea'],
        'harbor': ['harbor']
      },
      {
        'big-island-producing-terrain': ['big-island-producing-terrain'],
        'small-island-producing-terrain': ['small-island-producing-terrain']
      });
  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS.coordinatesTilesMap}, {
        'big-island-terrain': ['big-island-producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_HFNS.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'small-island-producing-terrain': Tiles.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(4).fill(Tiles.SEA),
        'harbor': Tiles.EXTENSION_5_6_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea'],
        'harbor': ['harbor']
      },
      {
        'big-island-producing-terrain': ['big-island-producing-terrain'],
        'small-island-producing-terrain': ['small-island-producing-terrain']
      });
  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXTENSION_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS.coordinates}, {
        'fishery': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXTENSION_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS.coordinatesTilesMap}, {
        'big-island-terrain': ['big-island-producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_HFNS.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.EXTENSION_7_8_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'small-island-producing-terrain': Tiles.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(10).fill(Tiles.SEA),
        'harbor': Tiles.EXTENSION_7_8_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.EXTENSION_7_8_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea'],
        'harbor': ['harbor']
      },
      {
        'big-island-producing-terrain': ['big-island-producing-terrain'],
        'small-island-producing-terrain': ['small-island-producing-terrain']
      });
  export const SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.EXTENSION_7_8_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS.coordinates}, {
        'fishery': Coordinates.EXTENSION_7_8_EXPANSION_SEA_SCENARIO_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.EXTENSION_7_8_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS.coordinatesTilesMap}, {
        'big-island-terrain': ['big-island-producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_7_8_EXPANSION_SEA_SCENARIO_HFNS.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI = new Specification(
      {
        'face-up-terrain': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'face-down-terrain': new Array(12).fill(Tiles.UNKNOWN),
        'harbor': Tiles.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_COORDINATES,
        'harbor': Coordinates.BASE_3_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.BASE_3_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'face-up-terrain': ['face-up-terrain'],
        'face-down-terrain': ['face-down-terrain'],
        'harbor': ['harbor']
      },
      {
        'face-up-terrain': ['face-up-terrain']
      });
  export const SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.coordinates}, {
        'fishery': Coordinates.BASE_3_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.coordinatesTilesMap}, {
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_3_EXPANSION_SEA_SCENARIO_FI.chitsTilesMap}, {
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI = new Specification(
      {
        'face-up-terrain': Tiles.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'face-down-terrain': new Array(12).fill(Tiles.UNKNOWN),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_COORDINATES,
        'harbor': Coordinates.BASE_4_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.BASE_4_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'face-up-terrain': ['face-up-terrain'],
        'face-down-terrain': ['face-down-terrain'],
        'harbor': ['harbor']
      },
      {
        'face-up-terrain': ['face-up-terrain']
      });
  export const SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.coordinates}, {
        'fishery': Coordinates.BASE_4_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.coordinatesTilesMap}, {
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_4_EXPANSION_SEA_SCENARIO_FI.chitsTilesMap}, {
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI = new Specification(
      {
        'face-up-terrain': Tiles.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'face-down-terrain': new Array(25).fill(Tiles.UNKNOWN),
        'gold': new Array(2).fill(Tiles.GOLD_TERRAIN),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_DOWN_COORDINATES,
        'gold': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_GOLD_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET,
        'gold': Chits.EXTENSION_5_6_EXPANSION_SEA_SCENARIO_FI_GOLD_TERRAIN_CHIT_SET
      },
      {
        'face-up-terrain': ['face-up-terrain', 'desert'],
        'face-down-terrain': ['face-down-terrain'],
        'gold': ['gold'],
        'harbor': ['harbor']
      },
      {
        'face-up-terrain': ['face-up-terrain'],
        'gold': ['gold']
      });
  export const SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI_FISHERMEN = new Specification(
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.tiles}, {
        'fishery': Tiles.EXTENSION_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.coordinates}, {
        'fishery': Coordinates.EXTENSION_5_6_EXPANSION_SEA_SCENARIOS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.chits}, {
        'fishery': Chits.EXTENSION_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.coordinatesTilesMap}, {
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_SEA_SCENARIO_FI.chitsTilesMap}, {
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB = new Specification(
      {
        'non-trade-terrain': Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_TILE_SET,
        'trade-terrain': Tiles.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_TILE_SET,
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'non-trade-terrain': Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES,
        'trade-terrain': Coordinates.BASE_3_4_EXPANSION_TB_SCENARIO_TB_TRADE_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES
      },
      {
        'non-trade-terrain': Chits.BASE_EXPANSION_TB_SCENARIO_TB_TERRAIN_CHIT_SET
      },
      {
        'non-trade-terrain': ['non-trade-terrain'],
        'trade-terrain': ['trade-terrain'],
        'harbor': ['harbor']
      },
      {
        'non-trade-terrain': ['non-trade-terrain']
      }
  );
  export const SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Specification(
      Object.assign({...SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB.coordinatesTilesMap}, {
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_3_4_EXPANSION_TB_SCENARIO_TB.chitsTilesMap}, {
        'fishery': ['fishery']
      }));

  export const SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB = new Specification(
      {
        'producing-terrain': Tiles.EXTENSION_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'castle': [Tiles.CASTLE_TERRAIN],
        'glassworks': new Array(3).fill(Tiles.GLASSWORKS_TERRAIN),
        'quarry': new Array(3).fill(Tiles.QUARRY_TERRAIN),
        'harbor': Tiles.EXTENSION_5_6_HARBOR_TILE_SET
      },
      {
        'non-trade-terrain': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_NON_TRADE_TERRAIN_COORDINATES,
        'castle': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_CASTLE_TERRAIN_COORDINATES,
        'glassworks': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_GLASSWORKS_TERRAIN_COORDINATES,
        'quarry': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_QUARRY_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXTENSION_5_6_PRODUCING_TERRAIN_CHIT_SET
      },
      {
        'non-trade-terrain': ['producing-terrain', 'desert'],
        'castle': ['castle'],
        'glassworks': ['glassworks'],
        'quarry': ['quarry'],
        'harbor': ['harbor']
      },
      {
        'producing-terrain': ['producing-terrain']
      }
  );
  export const SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXTENSION_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB.coordinates}, {
        'fishery': Coordinates.EXTENSION_5_6_EXPANSION_TB_SCENARIO_TB_FISHERY_COORDINATES
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXTENSION_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB.coordinatesTilesMap}, {
        'non-trade-terrain': ['producing-terrain', 'lake'],
        'fishery': ['fishery']
      }),
      Object.assign({...SPECIFICATION_5_6_EXPANSION_TB_SCENARIO_TB.chitsTilesMap}, {
        'lake': ['lake'],
        'fishery': ['fishery']
      }));
// }
