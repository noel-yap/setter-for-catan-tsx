import React from 'react';
import {
  Button,
  Chip,
  FormLabel,
  FormControlLabel,
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
import * as Coordinates from './component/Coordinates';
import * as Specifications from './component/Specifications';
import {Board} from './component/Boards';
import {Specification} from './component/Specifications';

/* eslint-disable @typescript-eslint/no-empty-interface */
interface SetterForCatanProps {}

interface SetterForCatanState {
  openMenu: boolean;
  playerCount: string;

  useFishermenOfCatanVariant: boolean;
  scenarioName: string;
  specification: Specifications.Specification;
  board: Boards.Board;
}

interface BoardSpecifications {
  [key: string]: {
    [key: string]: [Specifications.Specification, Coordinates.Coordinate[]];
  };
}

class SetterForCatan extends React.Component<
  SetterForCatanProps,
  SetterForCatanState
> {
  constructor(props: Readonly<{}>) {
    super(props);

    const initialScenarioName = 'Base';
    const initialPlayerCount = '3';
    const initialUseFishermenOfCatanVariant = false;

    const initialSpecification =
      boardSpecifications[initialScenarioName][initialPlayerCount][0];

    this.state = {
      openMenu: false,

      playerCount: initialPlayerCount,
      useFishermenOfCatanVariant: initialUseFishermenOfCatanVariant,
      scenarioName: initialScenarioName,

      specification: initialSpecification,
      board: new Boards.Board([]),
    };
  }

  render(): JSX.Element {
    const scenarios = Object.keys(boardSpecifications);
    const playerCounts = Object.keys(boardSpecifications['Base']);

    return (
      <div className="App">
        <header className="App-body">
          <Typography id="title" variant="h3">
            Setter for Catan
          </Typography>
          <FormLabel>Number of Players</FormLabel>
          <RadioGroup
            id="player-counts"
            aria-label="number-of-players"
            name="number-of-players"
            value={this.state.playerCount}
            /* eslint-disable @typescript-eslint/no-explicit-any */
            onChange={(event: any) => {
              this.setState({
                openMenu: false,

                scenarioName: this.state.scenarioName,
                playerCount: event.target.value,
                useFishermenOfCatanVariant: this.state
                  .useFishermenOfCatanVariant,
                specification: this.state.specification,
                board: this.state.board,
              });
            }}
            row
          >
            {playerCounts.map(playerCount => {
              return (
                <FormControlLabel
                  key={playerCount}
                  value={playerCount}
                  label={playerCount}
                  disabled={
                    !Object.prototype.hasOwnProperty.call(
                      boardSpecifications[this.state.scenarioName],
                      playerCount
                    )
                  }
                  control={<Radio color="primary" />}
                />
              );
            })}
          </RadioGroup>
          <Chip
            variant={
              this.state.useFishermenOfCatanVariant ? 'default' : 'outlined'
            }
            label="Fishermen of Catan"
            color={
              this.state.useFishermenOfCatanVariant ? 'primary' : 'secondary'
            }
            onClick={() => {
              this.setState({
                openMenu: false,

                scenarioName: this.state.scenarioName,
                playerCount: this.state.playerCount,
                useFishermenOfCatanVariant: !this.state
                  .useFishermenOfCatanVariant,
                specification: this.state.specification,
                board: this.state.board,
              });
            }}
          />
          <br />
          <Tooltip title="Right click to change configuration.">
            <Button
              id="generate-board-button"
              variant="contained"
              color="primary"
              onClick={() => {
                this.generateBoard(
                  boardSpecifications,
                  this.state.scenarioName,
                  this.state.playerCount,
                  this.state.useFishermenOfCatanVariant
                );
              }}
              onContextMenu={event => {
                event.preventDefault();
                this.setState({
                  openMenu: true,
                });
              }}
            >
              <Typography variant="h4">
                Generate {this.state.scenarioName}
              </Typography>
            </Button>
          </Tooltip>
          <Menu
            id="scenarios"
            anchorEl={document.getElementById('generate-board-button')}
            open={this.state.openMenu}
            onClose={() => {
              this.setState({
                openMenu: false,
              });
            }}
          >
            {scenarios.map(scenarioName => (
              <MenuItem
                key={scenarioName}
                disabled={
                  !Object.prototype.hasOwnProperty.call(
                    boardSpecifications[scenarioName],
                    this.state.playerCount
                  )
                }
                onClick={() => {
                  this.setState({
                    openMenu: false,

                    scenarioName: scenarioName,
                    playerCount: this.state.playerCount,
                    useFishermenOfCatanVariant: this.state
                      .useFishermenOfCatanVariant,
                    specification: this.state.specification,
                    board: this.state.board,
                  });
                }}
              >
                {scenarioName}
              </MenuItem>
            ))}
          </Menu>
          <GeneratedBoard board={this.state.board} />
        </header>
      </div>
    );
  }

  async generateBoard(
    boardSpecifications: BoardSpecifications,
    scenarioName: string,
    playerCount: string,
    useFishermenOfCatanVariant: boolean
  ) {
    console.log(`scenarioName = ${scenarioName}`);

    if (scenarioName === 'Base') {
      // TODO(nyap): Use `useEffect`. https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/
      await BoardRestClient.generateBoardFromSchema(
        scenarioName,
        parseInt(playerCount.charAt(0), 10),
        useFishermenOfCatanVariant
      ).then(t2 => {
        const specification: Specification = t2[0];
        const board: Board = t2[1];

        console.log(`specification = ${JSON.stringify(specification)}`);
        console.log(`board = ${JSON.stringify(board)}`);

        this.setState({
          openMenu: false,

          scenarioName: scenarioName,
          playerCount: playerCount,
          useFishermenOfCatanVariant: useFishermenOfCatanVariant,
          specification: specification,
          board: board,
        });
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

      console.log(
        `specification = ${JSON.stringify(
          specification
        )}, board = ${JSON.stringify(board)}`
      );

      this.setState({
        openMenu: false,

        scenarioName: scenarioName,
        playerCount: playerCount,
        useFishermenOfCatanVariant: useFishermenOfCatanVariant,
        specification: specification,
        board: board,
      });
    }
  }
}

// TODO: Reorganize to use submenus (eg Base, Seafarers, Traders and Barbarians).
const boardSpecifications: BoardSpecifications = {
  Base: {
    '3': [Specifications.SPEC_3_4, Coordinates.BASE_3_4_FISHERY_COORDINATES],
    '4': [Specifications.SPEC_3_4, Coordinates.BASE_3_4_FISHERY_COORDINATES],
    '5-6': [Specifications.SPEC_5_6, Coordinates.EXT_5_6_FISHERY_COORDINATES],
    '7-8': [Specifications.SPEC_7_8, Coordinates.EXT_7_8_FISHERY_COORDINATES],
  },
  'Seafarers: Heading for New Shores': {
    '3': [
      Specifications.SPEC_3_EXP_SEA_SCEN_HFNS,
      Coordinates.BASE_3_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_4_EXP_SEA_SCEN_HFNS,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_HFNS,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_HFNS,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_HFNS_BIG_ISLAND_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: The Four/Six/Eight Islands': {
    '3': [
      Specifications.SPEC_3_EXP_SEA_SCEN_4_ISLANDS,
      Coordinates.BASE_3_EXP_SEA_SCEN_4_ISLANDS_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_4_EXP_SEA_SCEN_4_ISLANDS,
      Coordinates.BASE_4_EXP_SEA_SCEN_4_ISLANDS_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_6_ISLANDS,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_6_ISLANDS,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_8_ISLANDS_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: Oceania': {
    '3': [
      Specifications.SPEC_3_EXP_SEA_SCEN_FI,
      Coordinates.BASE_3_EXP_SEA_SCEN_OC_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_4_EXP_SEA_SCEN_FI,
      Coordinates.BASE_4_EXP_SEA_SCEN_OC_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_FI,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_OC_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_FI,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_OC_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: Through the Desert': {
    '3': [
      Specifications.SPEC_3_EXP_SEA_SCEN_TD,
      Coordinates.BASE_3_EXP_SEA_SCEN_TD_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_4_EXP_SEA_SCEN_TD,
      Coordinates.BASE_4_EXP_SEA_SCEN_TD_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_TD,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_TD_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_TD,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_TD_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: The Forgotten Tribe': {
    '3': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_FT,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_FT_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_FT,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_FT_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_FT,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_FT_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_FT,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_FT_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: Cloth for Catan': {
    '3': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_CFC,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_CFC,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_CFC,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_CFC,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_CFC_FISHERY_COORDINATES,
    ],
  },
  'Seafarers: Wonders of Catan': {
    '3': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_WOC,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_WOC_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_SEA_SCEN_WOC,
      Coordinates.BASE_3_4_EXP_SEA_SCEN_WOC_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_SEA_SCEN_WOC,
      Coordinates.EXT_5_6_EXP_SEA_SCEN_WOC_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_SEA_SCEN_WOC,
      Coordinates.EXT_7_8_EXP_SEA_SCEN_WOC_FISHERY_COORDINATES,
    ],
  },
  'Traders and Barbarians: Rivers of Catan': {
    '3': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_ROC,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_ROC,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_TB_SCEN_ROC,
      Coordinates.EXT_5_6_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_TB_SCEN_ROC,
      Coordinates.EXT_7_8_FISHERY_COORDINATES,
    ],
  },
  'Traders and Barbarians: The Caravans': {
    '3': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_CAR_TERRAIN_COORDINATES,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_CAR_TERRAIN_COORDINATES,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_TB_SCEN_CAR_TERRAIN_COORDINATES,
      Coordinates.EXT_5_6_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_TB_SCEN_CAR_TERRAIN_COORDINATES,
      Coordinates.EXT_7_8_FISHERY_COORDINATES,
    ],
  },
  'Traders and Barbarians: Barbarian Attack': {
    '3': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_BA,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_BA,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_TB_SCEN_BA,
      Coordinates.EXT_5_6_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_TB_SCEN_BA,
      Coordinates.EXT_7_8_FISHERY_COORDINATES,
    ],
  },
  'Traders and Barbarians: Traders and Barbarians': {
    '3': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_TB,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '4': [
      Specifications.SPEC_3_4_EXP_TB_SCEN_TB,
      Coordinates.BASE_3_4_FISHERY_COORDINATES,
    ],
    '5-6': [
      Specifications.SPEC_5_6_EXP_TB_SCEN_TB,
      Coordinates.EXT_5_6_EXP_TB_SCEN_TB_FISHERY_COORDINATES,
    ],
    '7-8': [
      Specifications.SPEC_7_8_EXP_TB_SCEN_TB,
      Coordinates.EXT_7_8_EXP_TB_SCEN_TB_FISHERY_COORDINATES,
    ],
  },
};

export default SetterForCatan;
