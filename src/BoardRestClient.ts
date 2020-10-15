import {Board} from './component/Boards';
import {Specification} from './component/Specifications';
import {Configuration} from './component/Configuration';
import {Chits} from './component/Chits';
import {Coordinate, facePositionToInt} from './component/Coordinates';
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
      try {
        console.log(`response json = ${JSON.stringify(json)}`);

        const success = json.success;
        console.log(`board = ${JSON.stringify(success.board)}`);
        console.log(
          `configurations = ${JSON.stringify(success.board.configurations)}`
        );
        console.log(`markers = ${JSON.stringify(success.board.markers)}`);

        const board = new Board(
          success.board.configurations.map((c: Configuration) => {
            const tileJson = c.tile;
            const tileType = tileTypeFromString(tileJson.type);
            const tile = new Tile(tileType, tileJson.specialVertices);

            const coordinateJson = c.coordinate;
            const coordinates = new Coordinate(
              coordinateJson.x,
              coordinateJson.y,
              coordinateJson.edgePositions,
              coordinateJson.vertexPositions,
              facePositionToInt(coordinateJson.facePosition)
            );

            const chitJson = c.chit;
            const chits = new Chits(chitJson.values);

            console.log(
              `tile = ${JSON.stringify(c.tile)}, ${JSON.stringify(tile)}`
            );
            console.log(
              `coordinates = ${JSON.stringify(c.coordinate)}, ${JSON.stringify(
                coordinates
              )}`
            );
            console.log(
              `chits = ${JSON.stringify(c.chit)}, ${JSON.stringify(chits)}`
            );

            const configuration = new Configuration(tile, coordinates, chits);

            console.log(`configuration = ${JSON.stringify(configuration)}`);

            return configuration;
          }),
          success.board.markers
        );

        return [json.success.specification, board] as [Specification, Board];
      } catch (e) {
        console.log(e);

        return [json.success.specification, null as unknown] as [
          Specification,
          Board
        ];
      }
    })
    .catch(error => {
      return error;
    });
}
