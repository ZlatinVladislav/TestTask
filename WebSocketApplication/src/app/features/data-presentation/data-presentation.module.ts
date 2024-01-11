import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPresentationComponent } from './data-presentation.component';
import { DataPresentationHeaderComponent } from './components/data-presentation-header/data-presentation-header.component';
import { DataPresentationTableComponent } from './components/data-presentation-table/data-presentation-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildTableComponent } from './components/data-presentation-table/child-table/child-table.component';

const routes: Routes = [
  {
    path: '',
    component: DataPresentationComponent,
  }
];

@NgModule({
  declarations: [
    DataPresentationComponent,
    DataPresentationTableComponent,
    DataPresentationHeaderComponent,
    ChildTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class DataPresentationModule { }
