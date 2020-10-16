// export module Chits {
export class Chits {
  constructor(public values: number[] = []) {}

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
// }
