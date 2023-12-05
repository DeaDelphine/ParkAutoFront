import { CanActivateChildFn, Router  } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { NotificationType } from '../enum/notification-type.enum';

export const AuthenticationGuard: CanActivateChildFn = () => {
  var auth: boolean = inject(AuthenticationService).isLoggedIn()
  if (!auth) {
    inject(Router).navigate(['']);
    // Notification flash à la déconnexion
    inject(NotificationService).notify(NotificationType.Error, 'Vous devez être connecté pour accéder à cette page')
  }
  return auth;

};



