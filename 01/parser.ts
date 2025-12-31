export type Move = {
  direction: 'L' | 'R';
  value: number;
};

export function parse(input: string): Move[] {
  return input.split('\n')
    .map((line) => {
      return {
        direction: line.charAt(0),
        value: parseInt(line.slice(1), 10)
      } as Move;
    });
}