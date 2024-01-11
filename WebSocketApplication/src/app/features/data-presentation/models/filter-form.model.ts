import { IChild } from "./interfaces/child.interface";
import { IFilterFormModel } from "./interfaces/filter-form.interface";

export class FilterFormModel implements IFilterFormModel {
  timer: number;
  size: number;
  additionalIds: string[];

  constructor(
    timer?: number,
    size?: number,
    additionalIds?: string[]
  ) {
    this.timer = timer ?? 0;
    this.size = size ?? 10;
    this.additionalIds = additionalIds ?? [];
  }
}
