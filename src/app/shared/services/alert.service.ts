import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../models/alert.model';



@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';


  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: Partial<Alert>) {
    this.alert(message, AlertType.Success, options);
  }

  error(message: string, options?: Partial<Alert>) {
    this.alert(message, AlertType.Error, options);
  }

  info(message: string, options?: Partial<Alert>) {
    this.alert(message, AlertType.Info, options);
  }

  warn(message: string, options?: Partial<Alert>) {
    this.alert(message, AlertType.Warning, options);
  }

  alert(message: string, type: AlertType, options: Partial<Alert> = {}) {
    const id = options.id || this.defaultId;
    const alert = new Alert(id, type, message, options.autoClose, options.keepAfterRouteChange);
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert(id));
  }
}
