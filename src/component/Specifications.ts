import * as _ from 'underscore';

import * as Chits from './Chits';
import * as Configuration from './Configuration';
import * as Coordinates from './Coordinates';
import * as Markers from './Markers';
import * as Tiles from './Tiles';

// export module Specifications {
export class Specification {
  constructor(
    public tiles: {[name: string]: Tiles.Tile[]},
    public coordinates: {[name: string]: Coordinates.Coordinate[]},
    public chits: {[name: string]: Chits.Chits[]},
    public coordinatesTilesMap: {[coordinatesName: string]: string[]} = {},
    public chitsTilesMap: {[chitsName: string]: string[]} = {},
    public markers: Markers.Marker[] = [],
    public validateConfiguration = (
      _: Configuration.Configuration
    ): boolean => {
      return true;
    },
    public filterConfigurationScorer = (
      _: Configuration.Configuration
    ): boolean => {
      return true;
    }
  ) {
    this.validate();
  }

  withMarkers(...markers: Markers.Marker[]) {
    return new Specification(
      this.tiles,
      this.coordinates,
      this.chits,
      this.coordinatesTilesMap,
      this.chitsTilesMap,
      markers,
      this.validateConfiguration,
      this.filterConfigurationScorer
    );
  }

  withConfigurationValidator(
    configurationValidator: (_: Configuration.Configuration) => boolean
  ): Specification {
    return new Specification(
      this.tiles,
      this.coordinates,
      this.chits,
      this.coordinatesTilesMap,
      this.chitsTilesMap,
      this.markers,
      configurationValidator,
      this.filterConfigurationScorer
    );
  }

  withConfigurationScorerFilter(
    configurationScorerFilter: (_: Configuration.Configuration) => boolean
  ): Specification {
    return new Specification(
      this.tiles,
      this.coordinates,
      this.chits,
      this.coordinatesTilesMap,
      this.chitsTilesMap,
      this.markers,
      this.validateConfiguration,
      configurationScorerFilter
    );
  }

  validate() {
    const checkForNotReferencedErrors = (
      artifact: string,
      artifacts: {
        [artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[];
      },
      artifactsTilesMap: {[artifactName: string]: string[]}
    ) => {
      const artifactsKeys = Object.keys(artifacts);
      const artifactsTilesMapKeys = Object.keys(artifactsTilesMap);

      const missingFromArtifactsTilesMap = artifactsKeys.filter(
        key => artifactsTilesMapKeys.indexOf(key) === -1
      );
      if (missingFromArtifactsTilesMap.length !== 0) {
        throw new Error(
          `Invalid SPEC: ${missingFromArtifactsTilesMap} not referenced in ${artifact}TilesMap.`
        );
      }

      const missingFromArtifacts = artifactsTilesMapKeys.filter(
        key => artifactsKeys.indexOf(key) === -1
      );
      if (missingFromArtifacts.length !== 0) {
        throw new Error(
          `Invalid SPEC: ${missingFromArtifacts} not referenced in ${artifact}.`
        );
      }
    };
    checkForNotReferencedErrors(
      'coordinates',
      this.coordinates,
      this.coordinatesTilesMap
    );
    checkForNotReferencedErrors('chits', this.chits, this.chitsTilesMap);

    // TODO: Ensure all tiles are mapped exactly once to coordinates.

    const mismatchError = (
      artifact: string,
      artifacts: {
        [artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[];
      },
      artifactsTilesMap: {[artifactName: string]: string[]}
    ) => {
      return Object.keys(artifactsTilesMap)
        .map(artifactsName => {
          const artifactsCount = artifacts[artifactsName].length;
          const tilesNames = artifactsTilesMap[artifactsName];
          const tilesCount = tilesNames.reduce(
            (count, tilesName) => count + this.tiles[tilesName].length,
            0
          );

          return [artifactsName, artifactsCount, tilesNames, tilesCount];
        })
        .filter(
          ([artifactsName, artifactsCount, tilesNames, tilesCount]) =>
            artifactsCount !== tilesCount
        )
        .map(([artifactsName, artifactsCount, tilesNames, tilesCount]) => {
          return `Invalid SPEC: ${artifactsCount} ${artifact} do not match ${tilesCount} tiles. ${artifact}Name = ${artifactsName}; tilesNames = ${tilesNames}`;
        });
    };
    const mismatchErrors = mismatchError(
      'coordinates',
      this.coordinates,
      this.coordinatesTilesMap
    ).concat(mismatchError('chits', this.chits, this.chitsTilesMap));
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
      artifactMap: {
        [artifactName: string]: (Coordinates.Coordinate | Chits.Chits)[];
      }
    ) => {
      return Object.keys(artifactsTilesMap)
        .flatMap(artifactName => {
          // TODO: Handle scenario in which `artifactName` isn't in `artifactsTilesMap` or `this.tiles`.
          const tilesNames: string[] = artifactsTilesMap[artifactName];
          const tileIds: string[] = tilesNames.flatMap(tileName => {
            console.log(
              `tileName = ${tileName}, tiles = ${JSON.stringify(this.tiles)}`
            );

            const tiles = this.tiles[tileName];

            if (tiles === undefined) {
              throw new Error(`${tileName} not in ${tiles}`);
            }

            return tiles.map((tile, index) => tileId(tileName, index));
          });
          const artifacts = artifactMap[artifactName];

          if (artifacts === undefined) {
            throw new Error(`${artifactName} not in ${artifactMap}`);
          }

          return _.zip(tileIds, _.shuffle(artifacts));
        })
        .reduce((object, pair) => {
          return Object.assign(object, {[pair[0]]: pair[1]});
        }, {});
    };

    // IDEA: Allow specification not to shuffle (eg for face-down tiles and sets of like tiles).
    const tileCoordinateMap = (tileArtifactMap(
      this.coordinatesTilesMap,
      this.coordinates
    ) as unknown) as {[tileId: string]: Coordinates.Coordinate};
    const tileChitsMap = (tileArtifactMap(
      this.chitsTilesMap,
      this.chits
    ) as unknown) as {[tileId: string]: Chits.Chits};

    return Object.keys(tileCoordinateMap).map(tileId => {
      const delimiterIndex = tileId.indexOf('[');
      const tileName = tileId.substring(0, delimiterIndex);
      const index = parseInt(
        tileId.substring(delimiterIndex + 1, tileId.indexOf(']'))
      );

      return new Configuration.Configuration(
        this.tiles[tileName][index],
        tileCoordinateMap[tileId],
        tileChitsMap[tileId] || Chits.NO_CHITS
      );
    });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function oneToOne(...names: string[]): any {
  return names.reduce(
    (result, name) => Object.assign(result, {[name]: [name]}),
    {}
  );
}

export function withFisheries(
  specification: Specification,
  fisheryCoordinates: Coordinates.Coordinate[]
) {
  const fisheryChits = [
    Chits.CHITS_4,
    Chits.CHITS_10,
    Chits.CHITS_5,
    Chits.CHITS_9,
    Chits.CHITS_6,
    Chits.CHITS_8,
    Chits.CHITS_5,
    Chits.CHITS_9,
  ];

  const desertCount = Object.prototype.hasOwnProperty.call(
    specification.tiles,
    'desert-or-lake'
  )
    ? specification.tiles['desert-or-lake'].length
    : 0;
  const fisheryCount = fisheryCoordinates.length;

  const tiles = Object.assign(
    {..._.omit(specification.tiles, 'desert-or-lake')},
    {
      lake: new Array(desertCount).fill(Tiles.LAKE),
      fishery: new Array(fisheryCount).fill(Tiles.FISHERY),
    }
  );
  const coordinates = Object.assign(
    {...specification.coordinates},
    {
      fishery: fisheryCoordinates,
    }
  );
  const coordinatesTilesMap = Object.assign(
    {...specification.coordinatesTilesMap},
    oneToOne('fishery'),
    Object.keys(specification.coordinatesTilesMap).reduce((object, key) => {
      return Object.assign(object, {
        [key]: specification.coordinatesTilesMap[key].map(tilesName => {
          return tilesName === 'desert-or-lake' ? 'lake' : tilesName;
        }),
      });
    }, {})
  );
  const chits = Object.assign(
    {...specification.chits},
    {
      lake: [Chits.CHITS_2_3_11_12, Chits.CHITS_4_9].slice(0, desertCount),
      fishery: fisheryChits.slice(0, fisheryCount),
    }
  );
  const chitsTilesMap = Object.assign(
    {...specification.chitsTilesMap},
    oneToOne('lake', 'fishery')
  );

  console.log(`tiles = ${JSON.stringify(tiles)}`);
  console.log(`coordinates = ${JSON.stringify(coordinates)}`);
  console.log(`coordinatesTilesMap = ${JSON.stringify(coordinatesTilesMap)}`);
  console.log(`chits = ${JSON.stringify(chits)}`);
  console.log(`chitsTilesMap = ${JSON.stringify(chitsTilesMap)}`);

  return new Specification(
    tiles,
    coordinates,
    chits,
    coordinatesTilesMap,
    chitsTilesMap,
    specification.markers,
    specification.validateConfiguration,
    specification.filterConfigurationScorer
  );
}
// }
