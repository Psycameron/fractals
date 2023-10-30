export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomHexColor(): string {
  let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
}

export {};
