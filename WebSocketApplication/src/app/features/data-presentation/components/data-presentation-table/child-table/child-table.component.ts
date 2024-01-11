import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IChild } from "../../../models/interfaces/child.interface";

@Component({
  selector: 'app-child-table',
  templateUrl: 'child-table.component.html',
  styleUrls: ['./child-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildTableComponent {
  @Input() childData!: IChild;
}
