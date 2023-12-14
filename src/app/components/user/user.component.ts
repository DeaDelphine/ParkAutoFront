import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationService } from '../../services/notification.service';
import { AppSettings } from '../../settings/app.settings';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleActions$ = this.titleSubject.asObservable();
  public users!: User[];
  public refreshing!: boolean;
  public subscriptions: Subscription[] = [];
  declare showLoading: boolean;
  urlPicture = AppSettings.APP_URL;
  public selectedUser!: User;
  declare public filename: string;

  constructor(private userService: UserService, private notificationService : NotificationService) { }

  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }
  ngOnInit(): void {
    this.getUsers(true);

  }
  public getUsers(showNotification: boolean): void {
    //console.log("patate");
    this.refreshing = true;
    this.subscriptions.push(this.userService.getAllUsers().subscribe({
        next:
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;

            this.refreshing = false;
            if (showNotification) {

            }
          },
        error:
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            this.sendErrorNotification(NotificationType.Error, errorResponse.error.message);
            this.showLoading = false;
          }
      }))
  }




  private sendErrorNotification(notificationType: NotificationType, message: string):void {
    if(message){
     this.notificationService.notify(notificationType,message);
    }else{
      this.notificationService.notify(notificationType,"AN ERROR OCCURED. PLEASE TRY AGAIN");
    }
  }

  public onSelectUser(selectedUser: User):void {
    this.selectedUser = selectedUser;
    document.getElementById('openUserInfo')?.click();
  }

  onAddNewUser(_t133: NgForm) {

  }
  onProfileImageChange($event: Event) {

  }
  saveNewUser() {

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  }



