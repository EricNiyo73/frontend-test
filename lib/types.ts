export type AnnotationType =
  | "highlight"
  | "underline"
  | "comment"
  | "signature";

export interface Position {
  x: number;
  y: number;
}

export interface Annotation {
  type: AnnotationType;
  pageIndex: number;
  position: Position;
  content: string;
  color?: string;
}
