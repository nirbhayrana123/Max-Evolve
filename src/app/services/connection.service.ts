import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();
  sendMessage(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }
}
