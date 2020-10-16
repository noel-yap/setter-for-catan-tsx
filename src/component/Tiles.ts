import * as Coordinates from './Coordinates';

// export module Tiles {
export enum Type {
  GENERIC_HARBOR = 'Generic Harbor',
  BRICK_HARBOR = 'Brick Harbor',
  GRAIN_HARBOR = 'Grain Harbor',
  LUMBER_HARBOR = 'Lumber Harbor',
  ORE_HARBOR = 'Ore Harbor',
  WOOL_HARBOR = 'Wool Harbor',

  DESERT = 'Desert',
  FIELD = 'Field',
  FOREST = 'Forest',
  HILL = 'Hill',
  MOUNTAIN = 'Mountain',
  PASTURE = 'Pasture',

  SEA = 'Sea',
  LAKE = 'Lake',
  FISHERY = 'Fishery',
  RIVER = 'River',

  GOLD_FIELD = 'Gold Field',
  SWAMP = 'Swamp',
  OASIS = 'Oasis',
  CASTLE = 'Castle',
  GLASSWORKS = 'Glassworks',
  QUARRY = 'Quarry',

  DEVELOPMENT_CARD = 'Development Card',
  VICTORY_POINT = 'Victory Point',
  CHIT = 'Chit',
}

export function tileTypeFromString(description: string): Type {
  return Object.values(Type).filter(
    d => d.toUpperCase() === description.toUpperCase().replace('_', ' ')
  )[0];
}

export class Tile {
  constructor(
    public type: Type,
    public specialVertices: Coordinates.VertexPosition[] = []
  ) {}

  edgeCount(): [number, number] {
    switch (this.type) {
      case Type.CHIT: {
        return [0, 0];
      }

      case Type.GENERIC_HARBOR:
      case Type.BRICK_HARBOR:
      case Type.ORE_HARBOR:
      case Type.GRAIN_HARBOR:
      case Type.LUMBER_HARBOR:
      case Type.WOOL_HARBOR:
      case Type.VICTORY_POINT: {
        return [1, 1];
      }

      case Type.FISHERY:
      case Type.DEVELOPMENT_CARD: {
        return [2, 2];
      }

      case Type.SEA:
      case Type.LAKE:
      case Type.DESERT:
      case Type.FIELD:
      case Type.FOREST:
      case Type.GOLD_FIELD:
      case Type.HILL:
      case Type.MOUNTAIN:
      case Type.PASTURE:
      case Type.SWAMP:
      case Type.OASIS:
      case Type.CASTLE:
      case Type.GLASSWORKS:
      case Type.QUARRY: {
        return [6, 6];
      }

      case Type.RIVER: {
        return [1, 6];
      }
    }
  }
}

export const GENERIC_HARBOR = new Tile(Type.GENERIC_HARBOR);
export const BRICK_HARBOR = new Tile(Type.BRICK_HARBOR);
export const GRAIN_HARBOR = new Tile(Type.GRAIN_HARBOR);
export const LUMBER_HARBOR = new Tile(Type.LUMBER_HARBOR);
export const ORE_HARBOR = new Tile(Type.ORE_HARBOR);
export const WOOL_HARBOR = new Tile(Type.WOOL_HARBOR);

export const DESERT_TERRAIN = new Tile(Type.DESERT);
export const FIELD_TERRAIN = new Tile(Type.FIELD);
export const FOREST_TERRAIN = new Tile(Type.FOREST);
export const PASTURE_TERRAIN = new Tile(Type.PASTURE);
export const HILL_TERRAIN = new Tile(Type.HILL);
export const MOUNTAIN_TERRAIN = new Tile(Type.MOUNTAIN);

export const SEA = new Tile(Type.SEA);
export const LAKE = new Tile(Type.LAKE);
export const FISHERY = new Tile(Type.FISHERY);
export const RIVER = new Tile(Type.RIVER);

export const CHIT = new Tile(Type.CHIT);
// }
