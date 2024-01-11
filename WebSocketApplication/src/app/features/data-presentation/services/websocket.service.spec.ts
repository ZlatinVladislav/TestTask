import { TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';
import { WebsocketService } from './websocket.service';
import { take } from 'rxjs/operators';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate messages based on the period', fakeAsync(() => {
    service.setPeriod(100);
    tick(200);
    service.getMessages().pipe(take(1)).subscribe(messages => {
      expect(messages.length).toBeGreaterThan(0);
    });

    flush();
    discardPeriodicTasks();
  }));

  it('should handle size filter correctly', fakeAsync(() => {
    service.setPeriod(100);
    tick(500);

    const filters = { timer: 100, size: 2, additionalIds: [] };
    service.getFilteredMessages(filters).pipe(take(1)).subscribe(filteredMessages => {
      expect(filteredMessages.length).toBeLessThanOrEqual(filters.size);
    });
    flush();
    discardPeriodicTasks();
  }));

  it('should filter by additionalIds correctly', fakeAsync(() => {
    service.setPeriod(100);
    tick(500);
    const filters = { timer: 100, size: 10, additionalIds: ['1', '3'] };
    service.getFilteredMessages(filters).pipe(take(1)).subscribe(filteredMessages => {
      expect(filteredMessages.some(msg => msg.id === '1' || msg.id === '3')).toBeTruthy();
    });
    flush();
    discardPeriodicTasks();
  }));

  it('should combine size and additionalIds filters correctly', fakeAsync(() => {
    service.setPeriod(100);
    tick(500);

    const filters = { timer: 100, size: 2, additionalIds: ['1', '3'] };
    service.getFilteredMessages(filters).pipe(take(1)).subscribe(filteredMessages => {
      expect(filteredMessages.length).toBeLessThanOrEqual(filters.size);
      expect(filteredMessages.some(msg => msg.id === '1' || msg.id === '3')).toBeTruthy();
    });

    flush();
    discardPeriodicTasks();
  }));

  it('should not change message generation rate if the same period is set', fakeAsync(() => {
    service.setPeriod(500);
    tick(1000);

    service.getMessages().pipe(take(1)).subscribe(initialMessages => {
      const initialCount = initialMessages.length;
      service.setPeriod(500);
      tick(1000);
      service.getMessages().pipe(take(1)).subscribe(newMessages => {
        expect(newMessages.length).toBeGreaterThan(initialCount);
      });
    });

    flush();
    discardPeriodicTasks();
  }));
});
