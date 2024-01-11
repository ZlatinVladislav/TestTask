import { IChild } from "./interfaces/child.interface";
import { IModel } from "./interfaces/model.interface";

export class Model implements IModel {
  id: string;
  int: number;
  float: number;
  color: string;
  child: IChild;

  constructor(
    id: string,
    int: number,
    float: number,
    color: string,
    child: IChild
  ) {
    this.id = id;
    this.int = int;
    this.float = parseFloat(float.toFixed(18));
    this.color = color;
    this.child = child;
  }
}
