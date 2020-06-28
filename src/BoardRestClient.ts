import { Board } from "./component/Boards";
import * as Specifications from './component/Specifications';

import { useOktaAuth } from '@okta/okta-react';

export async function generateBoard(specification: Specifications.Specification): Promise<Board> {
  try {
    const { authState } = useOktaAuth();
    const accessToken = authState.accessToken;

    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(specification)
    };

    return await fetch('http://localhost:8080/setter-for-catan/generate-board', requestInit)
      .then((response) => response.json())
      .then((response) => response as Board);
  } catch (e) {
    console.log(e);

    return e;
  }
}
