export interface TomObject {
  id?: number;
  name?: string;
  description?: string;
  words_amount?: number;
}

export interface MeaningObject {
  id?: number;
  text?: string;
  example?: string;
}

export interface WordObject {
  id?: number;
  name?: string;
  status?: string;
  tom?: TomObject;
  meanings?: Array<MeaningObject>;
}
