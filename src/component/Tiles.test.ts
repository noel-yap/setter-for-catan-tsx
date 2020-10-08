import {tileTypeFromString, Type} from './Tiles';

it('should convert string description to its corresponding tile type', () => {
  expect(tileTypeFromString('Gold Field')).toBe(Type.GOLD_FIELD);
});

it('should ignore case', () => {
  expect(tileTypeFromString('FIELD')).toBe(Type.FIELD);
});

it('should treat underscores as spaces', () => {
  expect(tileTypeFromString('GOLD_FIELD')).toBe(Type.GOLD_FIELD);
});
