import {Board} from './component/Boards';
import {Specification} from './component/Specifications';
import {Schema} from './component/Schema';

export async function generateBoardFromSchema(
  accessToken: any,
  scenarioName: string,
  playerCount: number,
  fishermenOfCatan: boolean
): Promise<[Specification, Board]> {
  const scenario: number = scenarioName === 'Base' ? 0 : 13;

  console.log(
    `###################################### scenario = ${scenario}, playerCount = ${playerCount}, fishermenOfCatan = ${fishermenOfCatan}`
  );

  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new Schema(scenario, playerCount, fishermenOfCatan)),
  };

  // TODO(nyap): Handle errors.
  return fetch(
    'http://localhost:8081/setter-for-catan/generate-board',
    requestInit
  )
    .then(response => response.json())
    .then(response => response as [Specification, Board]);
}

export async function generateBoardFromSpecification(
  accessToken: any,
  specification: Specification
): Promise<[Specification, Board]> {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(specification),
  };

  return fetch(
    'http://localhost:8081/setter-for-catan/generate-board',
    requestInit
  )
    .then(response => response.json())
    .then(response => response as [Specification, Board]);
}
