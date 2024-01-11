import { Component, ChangeDetectionStrategy, OnInit, Inject, inject } from "@angular/core";
import { Observable, Subscription, map, timer } from "rxjs";
import { WebsocketService } from "./services/websocket.service";
import { IModel } from "./models/interfaces/model.interface";
import { IFilterFormModel } from "./models/interfaces/filter-form.interface";
import { FilterFormModel } from "./models/filter-form.model";

@Component({
  selector: 'app-data-presentation',
  templateUrl: 'data-presentation.component.html',
  styleUrls: ['./data-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPresentationComponent {
  private websocketService = inject(WebsocketService);
  public filteredMessages$: Observable<IModel[]> = this.websocketService.getFilteredMessages(new FilterFormModel());

  public applyFilter(filters: IFilterFormModel) {
    if (filters.timer) {
      this.websocketService.setPeriod(filters.timer);
    }

    this.filteredMessages$ = this.websocketService.getFilteredMessages(filters);
  }

  public changeTimeout(timeout: number) {
    this.websocketService.setPeriod(timeout);
  }
}
