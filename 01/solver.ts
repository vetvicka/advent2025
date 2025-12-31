import { parse } from './parser.ts';
import type { Move } from './parser.ts';

export function solve1(input: Move[]) {
  let position = 50;
  const dialSize = 100;
  let numberOfZeros = 0;

  for (const move of input) {
    if (move.direction === 'L') {
      position = (position - move.value + dialSize) % dialSize;
    } else if (move.direction === 'R') {
      position = (position + move.value) % dialSize;
    }

    if (position === 0) {
      numberOfZeros += 1;
    }
  }
  return numberOfZeros
}

export function solve2(input: Move[]) {
  let position = 50;
  const dialSize = 100;
  let numberOfZeros = 0;
  for (const move of input) {
    numberOfZeros += Math.floor(move.value / dialSize);
    const prevPosition = position;
    if (move.direction === 'L') {
      position = ((position - move.value) % dialSize + dialSize) % dialSize;
      if (position !== 0 && prevPosition !== 0 && position > prevPosition) {
        numberOfZeros += 1;
      }
    } else if (move.direction === 'R') {
      position = (position + move.value) % dialSize;
      if (position !== 0 && prevPosition !== 0 && position < prevPosition) {
        numberOfZeros += 1;
      }
    }

    if (position === 0) {
      numberOfZeros += 1;
    }
  }
  return numberOfZeros
}

export default function main(input: string) {
  const parsed = parse(input);
  const solution1 = solve1(parsed);
  const solution2 = solve2(parsed);
  
  return `part 1: ${solution1}\npart 2: ${solution2}`;
}
