import * as Coordinates from './Coordinates';

// export module Markers {
export enum Type {
  GREAT_BRIDGE_SETTLEMENT_REQUIREMENT,
  GREAT_WALL_SETTLEMENTS_REQUIREMENT,
  SETUP_SETTLEMENTS_PROHIBITION,
}

export function markerTypeToInt(markerType: Type | string | number): number {
  return typeof markerType === 'string'
    ? Type[markerType as keyof typeof Type]
    : markerType;
}

export class Marker {
  constructor(
    public type: Type,
    public coordinates: Coordinates.Coordinate[]
  ) {}
}

export const GREAT_BRIDGE_SETTLEMENT_REQUIREMENT =
  Type.GREAT_BRIDGE_SETTLEMENT_REQUIREMENT;
export const GREAT_WALL_SETTLEMENTS_REQUIREMENT =
  Type.GREAT_WALL_SETTLEMENTS_REQUIREMENT;
export const SETUP_SETTLEMENTS_PROHIBITION = Type.SETUP_SETTLEMENTS_PROHIBITION;
// }
