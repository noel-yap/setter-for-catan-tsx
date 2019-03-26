// export module Chits {

export class Chits {
    constructor(public values: number[]) {}

    odds(): number {
      function oddsOf(n: number): number {
        return 6 - Math.abs(7 - n);
      }

      return this.values.reduce((accum, n) => accum + oddsOf(n), 0);
    }
  }

  export const NO_CHITS = new Chits([]);

  export const CHITS_2 = new Chits([2]);
  export const CHITS_3 = new Chits([3]);
  export const CHITS_4 = new Chits([4]);
  export const CHITS_5 = new Chits([5]);
  export const CHITS_6 = new Chits([6]);
  export const CHITS_8 = new Chits([8]);
  export const CHITS_9 = new Chits([9]);
  export const CHITS_10 = new Chits([10]);
  export const CHITS_11 = new Chits([11]);
  export const CHITS_12 = new Chits([12]);

  export const CHITS_2_12 = new Chits([2, 12]);
  export const CHITS_4_9 = new Chits([4, 9]);

  export const CHITS_2_3_11_12 = new Chits([2, 3, 11, 12]);

  export const BASE_3_4_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2, CHITS_12]
      .concat(new Array(2).fill(CHITS_3))
      .concat(new Array(2).fill(CHITS_11))
      .concat(new Array(2).fill(CHITS_4))
      .concat(new Array(2).fill(CHITS_10))
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_9))
      .concat(new Array(2).fill(CHITS_6))
      .concat(new Array(2).fill(CHITS_8));

  export const EXT_5_6_PRODUCING_TERRAIN_CHIT_SET = BASE_3_4_PRODUCING_TERRAIN_CHIT_SET
      .concat([CHITS_2, CHITS_3, CHITS_4, CHITS_5, CHITS_6, CHITS_8, CHITS_9, CHITS_10, CHITS_11, CHITS_12]);

  export const EXT_7_8_PRODUCING_TERRAIN_CHIT_SET = BASE_3_4_PRODUCING_TERRAIN_CHIT_SET
      .concat(BASE_3_4_PRODUCING_TERRAIN_CHIT_SET);
  export const BASE_3_EXP_SEA_SCEN_HFNS_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2, CHITS_3, CHITS_4, CHITS_9]
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_6))
      .concat(new Array(2).fill(CHITS_8))
      .concat(new Array(2).fill(CHITS_10))
      .concat(new Array(2).fill(CHITS_11));
  export const BASE_3_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET = [CHITS_3, CHITS_5, CHITS_8, CHITS_9, CHITS_10, CHITS_12]
      .concat(new Array(2).fill(CHITS_4));

  export const BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET = [
    CHITS_2,
    CHITS_3,
    CHITS_4,
    CHITS_5,
    CHITS_6,
    CHITS_8,
    CHITS_9,
    CHITS_10,
    CHITS_11];

  export const EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET = BASE_4_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      .concat([CHITS_12]);

  export const EXT_7_8_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET = EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET
      .concat(EXT_5_6_EXP_SEA_SCEN_HFNS_SMALL_ISLANDS_PRODUCING_TERRAIN_CHIT_SET);

  export const BASE_3_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_CHIT_SET = BASE_3_4_PRODUCING_TERRAIN_CHIT_SET
      .concat([CHITS_5, CHITS_9]);

  export const BASE_4_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_CHIT_SET = BASE_3_EXP_SEA_SCEN_4_ISLANDS_TERRAIN_CHIT_SET
      .concat([CHITS_4, CHITS_10, CHITS_2_12]);

  export const EXT_5_6_EXP_SEA_SCEN_6_ISLANDS_TERRAIN_CHIT_SET = new Array(2).fill(CHITS_2)
      .concat(new Array(2).fill(CHITS_11))
      .concat(new Array(2).fill(CHITS_12))
      .concat(new Array(3).fill(CHITS_3))
      .concat(new Array(3).fill(CHITS_8))
      .concat(new Array(4).fill(CHITS_4))
      .concat(new Array(4).fill(CHITS_5))
      .concat(new Array(4).fill(CHITS_6))
      .concat(new Array(4).fill(CHITS_9))
      .concat(new Array(4).fill(CHITS_10));

  export const BASE_3_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET = [CHITS_3, CHITS_4, CHITS_10, CHITS_12]
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_6))
      .concat(new Array(2).fill(CHITS_8))
      .concat(new Array(2).fill(CHITS_9))
      .concat(new Array(2).fill(CHITS_11));

  export const BASE_4_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2, CHITS_11, CHITS_12]
      .concat(new Array(2).fill(CHITS_3))
      .concat(new Array(2).fill(CHITS_4))
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_6))
      .concat(new Array(2).fill(CHITS_8))
      .concat(new Array(2).fill(CHITS_9))
      .concat(new Array(2).fill(CHITS_10));

  export const EXT_5_6_EXP_SEA_SCEN_FI_FACE_UP_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2]
      .concat(new Array(2).fill(CHITS_4))
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_9))
      .concat(new Array(2).fill(CHITS_10))
      .concat(new Array(2).fill(CHITS_12))
      .concat(new Array(3).fill(CHITS_3))
      .concat(new Array(3).fill(CHITS_6))
      .concat(new Array(3).fill(CHITS_8))
      .concat(new Array(3).fill(CHITS_11));
  export const EXT_5_6_EXP_SEA_SCEN_FI_GOLD_TERRAIN_CHIT_SET = [CHITS_4, CHITS_10];

  export const BASE_3_4_EXP_TB_SCEN_ROC_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2_12]
    .concat(new Array(2).fill(CHITS_3))
    .concat(new Array(2).fill(CHITS_11))
    .concat(new Array(2).fill(CHITS_4))
    .concat(new Array(2).fill(CHITS_10))
    .concat(new Array(2).fill(CHITS_5))
    .concat(new Array(2).fill(CHITS_9))
    .concat(new Array(2).fill(CHITS_6))
    .concat(new Array(2).fill(CHITS_8));

  export const EXT_7_8_EXP_TB_SCEN_ROC_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2, CHITS_12, CHITS_2_12]
    .concat(new Array(4).fill(CHITS_3))
    .concat(new Array(4).fill(CHITS_11))
    .concat(new Array(4).fill(CHITS_4))
    .concat(new Array(4).fill(CHITS_10))
    .concat(new Array(4).fill(CHITS_5))
    .concat(new Array(4).fill(CHITS_9))
    .concat(new Array(4).fill(CHITS_6))
    .concat(new Array(4).fill(CHITS_8));

  export const EXT_7_8_EXP_TB_SCEN_CAR_PRODUCING_TERRAIN_CHIT_SET = [CHITS_2, CHITS_12, CHITS_2_12]
    .concat(new Array(4).fill(CHITS_3))
    .concat(new Array(4).fill(CHITS_11))
    .concat(new Array(4).fill(CHITS_4))
    .concat(new Array(4).fill(CHITS_10))
    .concat(new Array(4).fill(CHITS_5))
    .concat(new Array(4).fill(CHITS_9))
    .concat(new Array(4).fill(CHITS_6))
    .concat(new Array(4).fill(CHITS_8));

  export const BASE_EXP_TB_SCEN_TB_TERRAIN_CHIT_SET = new Array(2).fill(CHITS_3)
      .concat(new Array(2).fill(CHITS_11))
      .concat(new Array(2).fill(CHITS_4))
      .concat(new Array(2).fill(CHITS_10))
      .concat(new Array(2).fill(CHITS_5))
      .concat(new Array(2).fill(CHITS_9))
      .concat(new Array(2).fill(CHITS_6))
      .concat(new Array(2).fill(CHITS_8));
// }
