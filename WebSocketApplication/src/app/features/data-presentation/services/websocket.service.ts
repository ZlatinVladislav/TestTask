import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, scan, switchMap, tap } from 'rxjs/operators';
import { IFilterFormModel } from '../models/interfaces/filter-form.interface';
import { IModel } from '../models/interfaces/model.interface';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private periodSubject = new BehaviorSubject<number>(500);
  private messages$: Observable<IModel[]>;

  constructor() {
    this.messages$ = this.periodSubject.asObservable().pipe(
      switchMap(period => timer(0, period)),
      scan((acc: IModel[], _) => {
        const newModel = new Model(
          `${acc.length}`,
          Math.floor(Math.random() * 100),
          Math.random() * 100,
          this.getRandomColor(),
          { id: `child_id_${acc.length}`, color: this.getRandomColor() }
        );
        return [...acc, newModel];
      }, [])
    );
  }
  public getMessages(): Observable<IModel[]> {
    return this.messages$;
  }

  public getFilteredMessages(filters?: IFilterFormModel): Observable<IModel[]> {
    return this.getMessages().pipe(
      map(messages => {
        let prioritizedMessages: IModel[] = [];
        let remainingMessages = [...messages];

        if (filters?.additionalIds && filters.additionalIds.length) {
          const idsSet = new Set(filters.additionalIds.map(id => id.toString()));

          prioritizedMessages = messages.filter(message => idsSet.has(message.id));
          remainingMessages = remainingMessages.filter(message => !idsSet.has(message.id));
        }

        let combinedMessages = [...prioritizedMessages, ...remainingMessages];

        if (filters?.size) {
          const remainingSize = filters.size - prioritizedMessages.length;

          combinedMessages = [
            ...prioritizedMessages,
            ...remainingMessages.slice(-remainingSize)
          ];
        }

        return combinedMessages;
      }),
    );
  }

  public setPeriod(period: number): void {
    if (period !== this.periodSubject.value) {
      this.periodSubject.next(period);
    }
  }


  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
}
