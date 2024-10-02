import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getUserDetails} from 'src/app/state/user/user.selector';
import {AppState} from 'src/app/store/app.state';

import * as userActions from '../../../state/user/user.action';
import {FileUploader} from 'ng2-file-upload';
import {FileUploaderService} from 'src/app/core/services/file-uploader.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {User} from 'src/app/core/models/user';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'ecoeden-user-update-page',
  templateUrl: './user-update-page.component.html',
  styleUrls: ['./user-update-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserUpdatePageComponent implements OnInit, OnDestroy {
  public uploader: FileUploader;
  public user: User;
  public userToggleDone: boolean;
  public isImageUploading: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fileService: FileUploaderService,
    private breadcrumb: BreadcrumbService
  ) {}

  private subscription = {
    userDetails: null,
    uploadImage: null
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uploader = this.fileService.createUserImageUploader(params?.id);
      this.store.dispatch(new userActions.UserDetailsFetch(params?.id));
    });

    this.subscription.userDetails = this.store.pipe(select(getUserDetails)).subscribe(response => {
      if (response) {
        this.userToggleDone = true;
        this.user = response;
        this.breadcrumb.set('@username', `Update - ${response.userName}`);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription.userDetails) this.subscription.userDetails.unsubscribe();
  }

  public enableUser(event: MatSlideToggleChange): void {
    this.userToggleDone = false;
    this.store.dispatch(new userActions.EnableUserRequest(this.user.id));
  }

  public uploadImage(): void {
    this.isImageUploading = true;
    this.subscription.uploadImage = this.fileService.uploadFile(this.uploader).subscribe(res => {
      if (res) {
        this.isImageUploading = false;
      }
    });
  }
}
