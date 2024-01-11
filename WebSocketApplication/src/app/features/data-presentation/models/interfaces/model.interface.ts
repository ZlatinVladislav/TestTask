import { IChild } from "./child.interface";

export interface IModel {
  id: string;
  int: number;
  float: number;
  color: string;
  child: IChild;
}
