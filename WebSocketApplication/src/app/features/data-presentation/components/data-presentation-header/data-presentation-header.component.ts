import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { IFilterFormModel } from "../../models/interfaces/filter-form.interface";

@Component({
  selector: 'app-data-presentation-header',
  templateUrl: 'data-presentation-header.component.html',
  styleUrls: ['./data-presentation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPresentationHeaderComponent implements OnInit {
  public form: FormGroup;
  @Output() public filterForm: EventEmitter<IFilterFormModel> = new EventEmitter<IFilterFormModel>();

  constructor() {
    this.form = new FormGroup({
      timer: new FormControl(null),
      size: new FormControl(null),
      additionalIds: new FormControl(null)
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      const response: IFilterFormModel = {
        ...val,
        additionalIds: val.additionalIds ? val.additionalIds.split(',') : []
      };

      this.filterForm.emit(response);
    });
  }
}
