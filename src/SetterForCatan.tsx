import React, {ChangeEvent, useState} from 'react';
import {
  Button,
  Chip,
  FormControlLabel,
  FormLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
} from '@material-ui/core';

import {GeneratedBoard} from './GeneratedBoard';
import * as BoardRestClient from './BoardRestClient';
import * as Boards from './component/Boards';
import {Board} from './component/Boards';
import * as Coordinates from './component/Coordinates';
import {Coordinate} from './component/Coordinates';
import * as Specifications from './component/Specifications';
import {Specification} from './component/Specifications';
import {useOktaAuth} from '@okta/okta-react';
import {P3_P4_SPECIFICATION} from './scenarios/Base';

interface BoardSpecifications {
  [key: string]: {
    [key: string]: [Specifications.Specification, Coordinates.Coordinate[]];
  };
}

export function SetterForCatan() {
  const {authState} = useOktaAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const [scenarioName, setScenarioName] = useState('Base');

  const playerCounts = Object.keys(boardSpecifications[scenarioName]);
  const initialPlayerCount = playerCounts[0];
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  if (!playerCounts.includes(playerCount)) {
    setPlayerCount(initialPlayerCount);
  }

  const [useFishermenOfCatanVariant, setUseFishermenOfCatanVariant] = useState(
    false
  );

  const [board, setBoard] = useState(new Boards.Board([]));

  const scenarios = Object.keys(boardSpecifications);

  const generateBoard = async (
    boardSpecifications: BoardSpecifications,
    scenarioName: string,
    playerCount: string,
    useFishermenOfCatanVariant: boolean
  ) => {
    console.log(`scenarioName = ${scenarioName}`);

    if (authState.isAuthenticated) {
      // TODO(nyap): Use proto so index in `boardSpecifications` order doesn't have to be maintained to match
      const scenarioIndex = Object.keys(boardSpecifications).indexOf(
        scenarioName
      );

      // TODO(nyap): Use `useEffect`. https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/
      await BoardRestClient.generateBoardFromSchema(
        scenarioIndex,
        parseInt(playerCount.charAt(0), 10),
        useFishermenOfCatanVariant
      ).then(t2 => {
        const specification: Specification = t2[0];
        const board: Board = t2[1];

        console.log(`specification = ${JSON.stringify(specification)}`);
        console.log(`board = ${JSON.stringify(board)}`);

        setBoard(board);
      });
    } else {
      console.log(
        `scenarioName = ${scenarioName}, playerCount = ${playerCount}, useFishermenOfCatanVariant = ${useFishermenOfCatanVariant}`
      );

      const noFishSpecification =
        boardSpecifications[scenarioName][playerCount][0];
      const withFishSpecification = Specifications.withFisheries(
        noFishSpecification,
        boardSpecifications[scenarioName][playerCount][1]
      );
      const specification = useFishermenOfCatanVariant
        ? withFishSpecification
        : boardSpecifications[scenarioName][playerCount][0];
      const boardGenerator = new Boards.BoardGenerator(specification);
      const board = boardGenerator.generateBoard();

      console.log(`specification = ${JSON.stringify(specification)}`);
      console.log(`board = ${JSON.stringify(board)}`);

      setBoard(board);
    }
  };

  return (
    <div className="App">
      <header className="App-body">
        <Typography id="title" variant="h3" color="textPrimary">
          Setter for Catan
        </Typography>
        <Typography color="textSecondary">
          <FormLabel>Number of Players</FormLabel>
          <RadioGroup
            id="player-counts"
            aria-label="number-of-players"
            name="number-of-players"
            value={playerCount}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPlayerCount(event.target.value);
            }}
            row
          >
            {playerCounts.map(playerCount => {
              return (
                <Tooltip
                  title={
                    !authState.isAuthenticated && playerCount !== '3-4'
                      ? 'Log in to enable this feature'
                      : ''
                  }
                >
                  <FormControlLabel
                    disabled={
                      !authState.isAuthenticated && playerCount !== '3-4'
                    }
                    key={playerCount}
                    value={playerCount}
                    label={playerCount}
                    control={<Radio color="primary" />}
                  />
                </Tooltip>
              );
            })}
          </RadioGroup>
        </Typography>
        <Tooltip
          title={
            !authState.isAuthenticated ? 'Log in to enable this feature' : ''
          }
        >
          <div>
            <Chip
              disabled={!authState.isAuthenticated}
              variant={useFishermenOfCatanVariant ? 'default' : 'outlined'}
              label="Fishermen of Catan"
              color={useFishermenOfCatanVariant ? 'primary' : 'secondary'}
              onClick={() => {
                setUseFishermenOfCatanVariant(!useFishermenOfCatanVariant);
              }}
            />
          </div>
        </Tooltip>
        <br />
        <Tooltip title="Right click to change configuration.">
          <Button
            id="generate-board-button"
            variant="contained"
            color="primary"
            onClick={() => {
              generateBoard(
                boardSpecifications,
                scenarioName,
                playerCount,
                useFishermenOfCatanVariant
              );
            }}
            onContextMenu={event => {
              event.preventDefault();
              setOpenMenu(true);
            }}
          >
            <Typography variant="h4">Generate {scenarioName}</Typography>
          </Button>
        </Tooltip>
        <Menu
          id="scenarios"
          anchorEl={document.getElementById('generate-board-button')}
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
        >
          {scenarios.map(scenarioName => (
            <Tooltip
              title={
                !authState.isAuthenticated && scenarioName !== 'Base'
                  ? 'Log in to enable this feature'
                  : ''
              }
            >
              <div>
                <MenuItem
                  key={scenarioName}
                  disabled={
                    !authState.isAuthenticated && scenarioName !== 'Base'
                  }
                  onClick={() => {
                    setOpenMenu(false);
                    setScenarioName(scenarioName);
                  }}
                >
                  {scenarioName}
                </MenuItem>
              </div>
            </Tooltip>
          ))}
        </Menu>
        <GeneratedBoard board={board} />
      </header>
    </div>
  );
}

const menuPlaceholder = (undefined as unknown) as [Specification, Coordinate[]];
const boardSpecifications: BoardSpecifications = {
  Base: {
    '3-4': [P3_P4_SPECIFICATION, []],
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: Heading for New Shores': {
    '3': menuPlaceholder,
    '4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: The Four/Six/Eight Islands': {
    '3': menuPlaceholder,
    '4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: Oceania': {
    '3': menuPlaceholder,
    '4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: Through the Desert': {
    '3': menuPlaceholder,
    '4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: The Forgotten Tribe': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: Cloth for Catan': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Seafarers: Wonders of Catan': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Traders and Barbarians: Rivers of Catan': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Traders and Barbarians: The Caravans': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Traders and Barbarians: Barbarian Attack': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
  'Traders and Barbarians: Traders and Barbarians': {
    '3-4': menuPlaceholder,
    '5-6': menuPlaceholder,
    '7-8': menuPlaceholder,
  },
};

export default SetterForCatan;
