import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { User } from '../../models/user/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  declare showLoading: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private router: Router, private authenticationService: AuthenticationService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
      //console.log('already logged in');
    }
  }

  public onRegister(user: User): void{
    this.showLoading = true;
    //console.log(user);

    this.subscriptions.push(this.authenticationService.register(user).subscribe({
      next:
        (data: User ) => {
          this.showLoading = false;
          this.notificationService.notify(NotificationType.Success, `${data.firstName}, votre compte a bien été créé !`);
          //console.log(data);
          this.router.navigateByUrl('/login');
        },
      error:
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(NotificationType.Error, errorResponse.error.message);
          this.showLoading = false;
        }
    })
    )
  }
  private sendErrorNotification(notificationType: NotificationType, message: string):void {
    if(message){
     this.notificationService.notify(notificationType,message);
    }else{
      this.notificationService.notify(notificationType,"AN ERROR OCCURED. PLEASE TRY AGAIN");
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
