import { solve } from './solver';
import { parse } from './parser';

describe('01 solver', () => {
  test('empty input', () => {
    expect(solve(parse(''))).toBe(0);
  });

  test('single zero occurrence', () => {
    expect(solve(parse('R50'))).toBe(1);
  });

  test('multiple zeros', () => {
    expect(solve(parse('R50\nL100'))).toBe(2);
  });
});
