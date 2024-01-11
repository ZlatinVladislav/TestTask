import { Component, ChangeDetectionStrategy, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { WebsocketService } from "../../services/websocket.service";
import { IModel } from "../../models/interfaces/model.interface";

@Component({
  selector: 'app-data-presentation-table',
  templateUrl: 'data-presentation-table.component.html',
  styleUrls: ['./data-presentation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DataPresentationTableComponent {
  @Input() data: IModel[] | null = [];
}
