export enum Direction {
  Front,
  Back,
}

export interface SingleInputType {
  id: number;
  value: string;
  isSubmitting: boolean;
  onChange(input: SingleInputType, value: string): void;
  onBackspace(input: SingleInputType): void;
  onRight(input: SingleInputType): void;
  onLeft(input: SingleInputType): void;
}
