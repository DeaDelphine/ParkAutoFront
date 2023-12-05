import { Injectable } from '@angular/core';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notify(notificationType: NotificationType, message: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
