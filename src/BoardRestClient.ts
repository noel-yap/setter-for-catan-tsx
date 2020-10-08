import {Board} from './component/Boards';
import {Specification} from './component/Specifications';
import {Configuration} from './component/Configuration';
import {Chits} from './component/Chits';
import {
  Coordinate,
  EdgePosition,
  VertexPosition,
} from './component/Coordinates';
import {Tile, tileTypeFromString} from './component/Tiles';

export async function generateBoardFromSchema(
  scenarioIndex: number,
  playerCount: number,
  fishermenOfCatan: boolean
): Promise<[Specification, Board]> {
  const body = JSON.stringify({
    schema: {
      scenario: scenarioIndex,
      player_count: playerCount,
      fishermen_of_catan: fishermenOfCatan,
    },
    graders: [1],
  });

  // TODO(nyap): Handle errors.
  return await fetch('http://localhost:8081/setter-for-catan/generate-board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body,
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      const success = json.success;
      const board = new Board(
        success.board.configurations.map((c: Configuration) => {
          const chitJson = c.chit;

          const tileJson = c.tile;
          const tileType = tileTypeFromString(tileJson.type);
          const tile = new Tile(tileType);

          const coordinateJson = c.coordinate;
          const edgePositions: EdgePosition[] = coordinateJson.edgePositions.map(
            ep => {
              return ep;
            }
          );
          const vertexPositions: VertexPosition[] = coordinateJson.vertexPositions.map(
            vp => {
              return vp;
            }
          );

          return new Configuration(
            tile,
            new Coordinate(
              coordinateJson.x,
              coordinateJson.y,
              edgePositions,
              vertexPositions
            ),
            new Chits(chitJson.values)
          );
        })
      );

      return [json.success.specification, board] as [Specification, Board];
    })
    .catch(error => {
      return error;
    });
}
