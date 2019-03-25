import * as _ from 'underscore';

import * as Chits from "./Chits";
import * as Configuration from "./Configuration";
import * as Coordinates from "./Coordinates";
import * as Tiles from "./Tiles";

// export module SPECs {
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
          throw new Error(`Invalid SPEC: ${missingFromArtifactsTilesMap} not referenced in ${artifact}TilesMap.`);
        }

        const missingFromArtifacts = artifactsKeys
            .filter((key) => artifactsKeys.indexOf(key) === -1);
        if (missingFromArtifacts.length !== 0) {
          throw new Error(`Invalid SPEC: ${missingFromArtifacts} not referenced in ${artifact}.`);
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
              return `Invalid SPEC: ${artifactsCount} ${artifact} do not match ${tilesCount} tiles. ${artifact}Name = ${artifactsName}; tilesNames = ${tilesNames}`;
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

  function oneToOne(...names: string[]): any {
    return names.reduce((result, name) => Object.assign(result, {[name]: [name]}), {});
  }

  export const SPEC_3_4 = new Specification(
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
      Object.assign(oneToOne('harbor'), {
        'terrain': ['producing-terrain', 'desert']
      }),
      oneToOne('producing-terrain'));
  export const SPEC_3_4_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_3_4.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_3_4.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_3_4.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_3_4.coordinatesTilesMap},
          oneToOne('fishery'), {
            'terrain': ['producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_3_4.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_5_6 = new Specification(
      {
        'producing-terrain': Tiles.EXT_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'harbor': Tiles.EXT_5_6_HARBOR_TILE_SET
      },
      {
        'terrain': Coordinates.EXT_5_6_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_5_6_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXT_5_6_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('harbor'), {
        'terrain': ['producing-terrain', 'desert']
      }),
      oneToOne('producing-terrain'));
  export const SPEC_5_6_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_5_6.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXT_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_5_6.coordinates}, {
        'fishery': Coordinates.EXT_5_6_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_5_6.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXT_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_5_6.coordinatesTilesMap},
          oneToOne('fishery'), {
            'terrain': ['producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_5_6.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_7_8 = new Specification(
      {
        'producing-terrain': Tiles.EXT_7_8_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'harbor': Tiles.EXT_7_8_HARBOR_TILE_SET
      },
      {
        'terrain': Coordinates.EXT_7_8_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_7_8_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXT_7_8_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('harbor'), {
        'terrain': ['producing-terrain', 'desert']
      }),
      oneToOne('producing-terrain'));
  export const SPEC_7_8_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_7_8.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.EXT_7_8_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_7_8.coordinates}, {
        'fishery': Coordinates.EXT_7_8_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_7_8.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.EXT_7_8_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_7_8.coordinatesTilesMap},
          oneToOne('fishery'), {
            'terrain': ['producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_7_8.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_3_EXP_SEA_SCEN_HFNS = new Specification(
    {
      'big-island-terrain': Tiles.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_PRODUCING_TERRAIN_TILE_SET,
      'small-island-producing-terrain': Tiles.BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
      'sea': new Array(5).fill(Tiles.SEA),
      'harbor': Tiles.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_TILE_SET
    },
    {
      'big-island-terrain': Coordinates.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
      'small-island-terrain': Coordinates.BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
      'harbor': Coordinates.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES
    },
    {
      'big-island-terrain': Chits.BASE_3_EXP_SEA_SCEN_HFNS_PRODUCING_TERRAIN_CHIT_SET,
      'small-island-producing-terrain': Chits.BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
    },
    Object.assign(oneToOne('big-island-terrain', 'harbor'), {
      'small-island-terrain': ['small-island-producing-terrain', 'sea']
    }),
    oneToOne('big-island-terrain', 'small-island-producing-terrain'));
  export const SPEC_3_EXP_SEA_SCEN_HFNS_FISHERMEN = new Specification(
      Object.assign({...SPEC_3_EXP_SEA_SCEN_HFNS.tiles}, {
        'fishery': Tiles.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_HFNS.coordinates}, {
        'fishery': Coordinates.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_HFNS.chits}, {
        'fishery': Chits.BASE_3_EXP_SEA_SCEN_HFNS_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_HFNS.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_HFNS.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_4_EXP_SEA_SCEN_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.BASE_3_4_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'small-island-producing-terrain': Tiles.BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(4).fill(Tiles.SEA),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.BASE_3_4_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.BASE_3_4_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('harbor'), {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea']
      }),
      oneToOne('big-island-producing-terrain', 'small-island-producing-terrain'));
  export const SPEC_4_EXP_SEA_SCEN_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_4_EXP_SEA_SCEN_HFNS.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_HFNS.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_HFNS.coordinatesTilesMap},
          oneToOne('fishery'), {
        'big-island-terrain': ['big-island-producing-terrain', 'lake']
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_HFNS.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_5_6_EXP_SEA_SCEN_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.EXT_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'small-island-producing-terrain': Tiles.EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(4).fill(Tiles.SEA),
        'harbor': Tiles.EXT_5_6_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.EXT_5_6_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('harbor'), {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea']
      }),
      oneToOne('big-island-producing-terrain', 'small-island-producing-terrain'));
  export const SPEC_5_6_EXP_SEA_SCEN_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_5_6_EXP_SEA_SCEN_HFNS.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXT_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_HFNS.coordinates}, {
        'fishery': Coordinates.EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXT_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_HFNS.coordinatesTilesMap},
          oneToOne('fishery'), {
            'big-island-terrain': ['big-island-producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_HFNS.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_7_8_EXP_SEA_SCEN_HFNS = new Specification(
      {
        'big-island-producing-terrain': Tiles.EXT_7_8_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'small-island-producing-terrain': Tiles.EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_TILE_SET,
        'sea': new Array(10).fill(Tiles.SEA),
        'harbor': Tiles.EXT_7_8_HARBOR_TILE_SET
      },
      {
        'big-island-terrain': Coordinates.EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_TERRAIN_COORDINATES,
        'small-island-terrain': Coordinates.EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLAND_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_HARBOR_COORDINATES
      },
      {
        'big-island-producing-terrain': Chits.EXT_7_8_PRODUCING_TERRAIN_CHIT_SET,
        'small-island-producing-terrain': Chits.EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('harbor'), {
        'big-island-terrain': ['big-island-producing-terrain', 'desert'],
        'small-island-terrain': ['small-island-producing-terrain', 'sea']
      }),
      oneToOne('big-island-producing-terrain', 'small-island-producing-terrain'));
  export const SPEC_7_8_EXP_SEA_SCEN_HFNS_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_7_8_EXP_SEA_SCEN_HFNS.tiles, 'desert')}, {
        'lake': [Tiles.LAKE],
        'fishery': Tiles.EXT_7_8_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_7_8_EXP_SEA_SCEN_HFNS.coordinates}, {
        'fishery': Coordinates.EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_7_8_EXP_SEA_SCEN_HFNS.chits}, {
        'lake': [Chits.CHITS_2_3_11_12],
        'fishery': Chits.EXT_7_8_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_7_8_EXP_SEA_SCEN_HFNS.coordinatesTilesMap},
          oneToOne('fishery'), {
            'big-island-terrain': ['big-island-producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_7_8_EXP_SEA_SCEN_HFNS.chitsTilesMap},
          oneToOne('lake', 'fishery')));

  export const SPEC_3_EXP_SEA_SCEN_FI = new Specification(
      {
        'face-up-terrain': Tiles.BASE_3_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'face-down-terrain': new Array(12).fill(Tiles.UNKNOWN),
        'harbor': Tiles.BASE_3_EXP_SEA_SCEN_FI_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.BASE_3_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.BASE_3_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES,
        'harbor': Coordinates.BASE_3_EXP_SEA_SCEN_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.BASE_3_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET
      },
      oneToOne('face-up-terrain', 'face-down-terrain', 'harbor'),
      oneToOne('face-up-terrain'));
  export const SPEC_3_EXP_SEA_SCEN_FI_FISHERMEN = new Specification(
      Object.assign({...SPEC_3_EXP_SEA_SCEN_FI.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_FI.coordinates}, {
        'fishery': Coordinates.BASE_3_EXP_SEA_SCENS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_FI.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_FI.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_3_EXP_SEA_SCEN_FI.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_4_EXP_SEA_SCEN_FI = new Specification(
      {
        'face-up-terrain': Tiles.BASE_4_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'face-down-terrain': new Array(12).fill(Tiles.UNKNOWN),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.BASE_4_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.BASE_4_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES,
        'harbor': Coordinates.BASE_4_EXP_SEA_SCEN_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.BASE_4_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET
      },
      oneToOne('face-up-terrain', 'face-down-terrain', 'harbor'),
      oneToOne('face-up-terrain'));
  export const SPEC_4_EXP_SEA_SCEN_FI_FISHERMEN = new Specification(
      Object.assign({...SPEC_4_EXP_SEA_SCEN_FI.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_FI.coordinates}, {
        'fishery': Coordinates.BASE_4_EXP_SEA_SCENS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_FI.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_FI.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_4_EXP_SEA_SCEN_FI.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_5_6_EXP_SEA_SCEN_FI = new Specification(
      {
        'face-up-terrain': Tiles.EXT_5_6_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_TILE_SET,
        'desert': [Tiles.DESERT_TERRAIN],
        'face-down-terrain': new Array(25).fill(Tiles.UNKNOWN),
        'gold': new Array(2).fill(Tiles.GOLD_TERRAIN),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'face-up-terrain': Coordinates.EXT_5_6_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_COORDINATES,
        'face-down-terrain': Coordinates.EXT_5_6_EXP_SEA_SCEN_FI_FACE_DOWN_COORDINATES,
        'gold': Coordinates.EXT_5_6_EXP_SEA_SCEN_FI_GOLD_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_5_6_EXP_SEA_SCEN_FI_HARBOR_COORDINATES
      },
      {
        'face-up-terrain': Chits.EXT_5_6_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET,
        'gold': Chits.EXT_5_6_EXP_SEA_SCEN_FI_GOLD_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('face-down-terrain', 'gold', 'harbor'), {
        'face-up-terrain': ['face-up-terrain', 'desert']
      }),
      oneToOne('face-up-terrain', 'gold'));
  export const SPEC_5_6_EXP_SEA_SCEN_FI_FISHERMEN = new Specification(
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_FI.tiles}, {
        'fishery': Tiles.EXT_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_FI.coordinates}, {
        'fishery': Coordinates.EXT_5_6_EXP_SEA_SCENS_FI_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_FI.chits}, {
        'fishery': Chits.EXT_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_FI.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_5_6_EXP_SEA_SCEN_FI.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_3_4_EXP_TB_SCEN_ROC = new Specification(
      {
        'non-river-terrain': Tiles.BASE_3_4_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET,
        'river-mountain': new Array(2).fill(Tiles.MOUNTAIN_TERRAIN),
        'river-hill': new Array(2).fill(Tiles.HILL_TERRAIN),
        'river-pasture': [Tiles.PASTURE_TERRAIN],
        'river-swamp': new Array(2).fill(Tiles.SWAMP_TERRAIN),
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET,
        'river': new Array(7).fill(Tiles.RIVER)
      },
      {
        'non-river-terrain': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES,
        'river-mountain': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES,
        'river-hill': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES,
        'river-pasture': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES,
        'river-swamp': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES,
        'river': Coordinates.BASE_3_4_EXP_TB_SCEN_ROC_RIVER_COORDINATES
      },
      {
        'producing-terrain': Chits.BASE_3_4_EXP_TB_SCEN_ROC_PRODUCING_TERRAIN_CHIT_SET
      },
      oneToOne(
          'non-river-terrain',
          'river-mountain',
          'river-hill',
          'river-pasture',
          'river-swamp',
          'harbor',
          'river'),
      {
        'producing-terrain': ['non-river-terrain', 'river-mountain', 'river-hill', 'river-pasture']
      }
  );
  export const SPEC_3_4_EXP_TB_SCEN_ROC_FISHERMEN = new Specification(
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_ROC.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_ROC.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_ROC.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_ROC.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_ROC.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_5_6_EXP_TB_SCEN_ROC = new Specification(
      {
        'non-river-terrain': Tiles.EXT_5_6_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET,
        'river-mountain': new Array(3).fill(Tiles.MOUNTAIN_TERRAIN),
        'river-hill': new Array(2).fill(Tiles.HILL_TERRAIN),
        'river-pasture': new Array(3).fill(Tiles.PASTURE_TERRAIN),
        'river-swamp': new Array(2).fill(Tiles.SWAMP_TERRAIN),
        'harbor': Tiles.EXT_5_6_HARBOR_TILE_SET,
        'river': new Array(10).fill(Tiles.RIVER)
      },
      {
        'non-river-terrain': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES,
        'river-mountain': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES,
        'river-hill': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES,
        'river-pasture': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES,
        'river-swamp': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_5_6_HARBOR_COORDINATES,
        'river': Coordinates.EXT_5_6_EXP_TB_SCEN_ROC_RIVER_COORDINATES
      },
      {
        'producing-terrain': Chits.EXT_5_6_PRODUCING_TERRAIN_CHIT_SET
      },
      oneToOne(
          'non-river-terrain',
          'river-mountain',
          'river-hill',
          'river-pasture',
          'river-swamp',
          'harbor',
          'river'),
      {
        'producing-terrain': ['non-river-terrain', 'river-mountain', 'river-hill', 'river-pasture']
      }
  );
  export const SPEC_5_6_EXP_TB_SCEN_ROC_FISHERMEN = new Specification(
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_ROC.tiles}, {
        'fishery': Tiles.EXT_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_ROC.coordinates}, {
        'fishery': Coordinates.EXT_5_6_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_ROC.chits}, {
        'fishery': Chits.EXT_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_ROC.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_ROC.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_7_8_EXP_TB_SCEN_ROC = new Specification(
      {
        'non-river-terrain': Tiles.EXT_7_8_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_TILE_SET,
        'river-mountain': new Array(3).fill(Tiles.MOUNTAIN_TERRAIN),
        'river-hill': new Array(2).fill(Tiles.HILL_TERRAIN),
        'river-pasture': new Array(3).fill(Tiles.PASTURE_TERRAIN),
        'river-swamp': new Array(2).fill(Tiles.SWAMP_TERRAIN),
        'harbor': Tiles.EXT_7_8_HARBOR_TILE_SET,
        'river': new Array(10).fill(Tiles.RIVER)
      },
      {
        'non-river-terrain': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_NON_RIVER_TERRAIN_COORDINATES,
        'river-mountain': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_RIVER_MOUNTAIN_TERRAIN_COORDINATES,
        'river-hill': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_RIVER_HILL_TERRAIN_COORDINATES,
        'river-pasture': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_RIVER_PASTURE_TERRAIN_COORDINATES,
        'river-swamp': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_RIVER_SWAMP_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_7_8_HARBOR_COORDINATES,
        'river': Coordinates.EXT_7_8_EXP_TB_SCEN_ROC_RIVER_COORDINATES
      },
      {
        'producing-terrain': Chits.EXT_7_8_EXP_TB_SCEN_ROC_PRODUCING_TERRAIN_CHIT_SET
      },
      oneToOne(
          'non-river-terrain',
          'river-mountain',
          'river-hill',
          'river-pasture',
          'river-swamp',
          'harbor',
          'river'),
      {
        'producing-terrain': ['non-river-terrain', 'river-mountain', 'river-hill', 'river-pasture']
      }
  );
  export const SPEC_7_8_EXP_TB_SCEN_ROC_FISHERMEN = new Specification(
      Object.assign({...SPEC_7_8_EXP_TB_SCEN_ROC.tiles}, {
        'fishery': Tiles.EXT_7_8_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_7_8_EXP_TB_SCEN_ROC.coordinates}, {
        'fishery': Coordinates.EXT_7_8_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_7_8_EXP_TB_SCEN_ROC.chits}, {
        'fishery': Chits.EXT_7_8_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_7_8_EXP_TB_SCEN_ROC.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_7_8_EXP_TB_SCEN_ROC.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_3_4_EXP_TB_SCEN_TB = new Specification(
      {
        'non-trade-terrain': Tiles.BASE_3_4_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_TILE_SET,
        'trade-terrain': Tiles.BASE_3_4_EXP_TB_SCEN_TB_TRADE_TERRAIN_TILE_SET,
        'harbor': Tiles.BASE_3_4_HARBOR_TILE_SET
      },
      {
        'non-trade-terrain': Coordinates.BASE_3_4_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_COORDINATES,
        'trade-terrain': Coordinates.BASE_3_4_EXP_TB_SCEN_TB_TRADE_TERRAIN_COORDINATES,
        'harbor': Coordinates.BASE_3_4_HARBOR_COORDINATES
      },
      {
        'non-trade-terrain': Chits.BASE_EXP_TB_SCEN_TB_TERRAIN_CHIT_SET
      },
      oneToOne('non-trade-terrain', 'trade-terrain', 'harbor'),
      oneToOne('non-trade-terrain')
  );
  export const SPEC_3_4_EXP_TB_SCEN_TB_FISHERMEN = new Specification(
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_TB.tiles}, {
        'fishery': Tiles.BASE_3_4_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_TB.coordinates}, {
        'fishery': Coordinates.BASE_3_4_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_TB.chits}, {
        'fishery': Chits.BASE_3_4_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_TB.coordinatesTilesMap},
          oneToOne('fishery')),
      Object.assign({...SPEC_3_4_EXP_TB_SCEN_TB.chitsTilesMap},
          oneToOne('fishery')));

  export const SPEC_5_6_EXP_TB_SCEN_TB = new Specification(
      {
        'producing-terrain': Tiles.EXT_5_6_PRODUCING_TERRAIN_TILE_SET,
        'desert': new Array(2).fill(Tiles.DESERT_TERRAIN),
        'castle': [Tiles.CASTLE_TERRAIN],
        'glassworks': new Array(3).fill(Tiles.GLASSWORKS_TERRAIN),
        'quarry': new Array(3).fill(Tiles.QUARRY_TERRAIN),
        'harbor': Tiles.EXT_5_6_HARBOR_TILE_SET
      },
      {
        'non-trade-terrain': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_NON_TRADE_TERRAIN_COORDINATES,
        'castle': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_CASTLE_TERRAIN_COORDINATES,
        'glassworks': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_GLASSWORKS_TERRAIN_COORDINATES,
        'quarry': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_QUARRY_TERRAIN_COORDINATES,
        'harbor': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_HARBOR_COORDINATES
      },
      {
        'producing-terrain': Chits.EXT_5_6_PRODUCING_TERRAIN_CHIT_SET
      },
      Object.assign(oneToOne('castle', 'glassworks', 'quarry', 'harbor'), {
        'non-trade-terrain': ['producing-terrain', 'desert']
      }),
      oneToOne('producing-terrain'));
  export const SPEC_5_6_EXP_TB_SCEN_TB_FISHERMEN = new Specification(
      Object.assign({..._.omit(SPEC_5_6_EXP_TB_SCEN_TB.tiles, 'desert')}, {
        'lake': new Array(2).fill(Tiles.LAKE),
        'fishery': Tiles.EXT_5_6_FISHERY_TILE_SET
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_TB.coordinates}, {
        'fishery': Coordinates.EXT_5_6_EXP_TB_SCEN_TB_FISHERY_COORDINATES
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_TB.chits}, {
        'lake': [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9],
        'fishery': Chits.EXT_5_6_FISHERY_CHIT_SET
      }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_TB.coordinatesTilesMap},
          oneToOne('fishery'), {
            'non-trade-terrain': ['producing-terrain', 'lake']
          }),
      Object.assign({...SPEC_5_6_EXP_TB_SCEN_TB.chitsTilesMap},
          oneToOne('lake', 'fishery')));
// }
