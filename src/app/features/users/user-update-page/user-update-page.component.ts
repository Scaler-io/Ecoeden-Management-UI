import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getUserDetails} from 'src/app/state/user/user.selector';
import {AppState} from 'src/app/store/app.state';

import * as userActions from '../../../state/user/user.action';
import {FileUploader} from 'ng2-file-upload';
import {FileUploaderService} from 'src/app/core/services/file-uploader.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {RoleUpdateFormModel, RoleUpdateRequest, User} from 'src/app/core/models/user';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import {FormGroup} from '@angular/forms';
import {UserFormGroupHelper} from 'src/app/core/form-group/user.formgroup';
import {UserFormMapper} from 'src/app/core/mappers/user.mapper';
import {UserService} from 'src/app/core/services/user.service';
import {ToastrService} from 'ngx-toastr';

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
  public ButtonType = ButtonType;
  public roleUpdateForm: FormGroup;
  public isRoleFormSubmitting: boolean;
  public userId: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fileService: FileUploaderService,
    private breadcrumb: BreadcrumbService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  private subscription = {
    userDetails: null,
    uploadImage: null,
    roleUpdate: null
  };

  ngOnInit(): void {
    this.roleUpdateForm = UserFormGroupHelper.createUserRoleUpdateFormGroup();
    this.route.params.subscribe(params => {
      this.uploader = this.fileService.createUserImageUploader(params?.id);
      this.userId = params?.id;
    });

    this.subscription.userDetails = this.store.pipe(select(getUserDetails)).subscribe(response => {
      if (response) {
        this.userToggleDone = true;
        this.user = response;
        this.breadcrumb.set('@username', `${response.userName}`);
        this.roleUpdateForm.patchValue({
          roles: response.userRoles
        });
      } else if (!response && this.userId) {
        this.store.dispatch(new userActions.UserDetailsFetch(this.userId));
      } else {
        this.toastr.error('Something went wrong');
      }
    });

    this.subscription.roleUpdate = this.userService.userRoleUpdated$.subscribe(response => {
      if (response) {
        this.router.navigate(['users', this.user.id]);
        this.toastr.success('User role updated successfully');
      } else {
        this.toastr.error('User role update failure. Connect Ecoeden Admin');
      }
      this.isRoleFormSubmitting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription.userDetails) this.subscription.userDetails.unsubscribe();
    if (this.subscription.roleUpdate) this.subscription.roleUpdate.unsubscribe();
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
        this.router.navigate(['users', this.user.id]);
      }
    });
  }

  public onRoleUpdate(): void {
    // role update action dispatch here
    this.isRoleFormSubmitting = true;
    const roleUpdateFormData: RoleUpdateFormModel = this.roleUpdateForm.getRawValue();
    const roleUpdateRequest: RoleUpdateRequest = UserFormMapper.mapToRoleUpdateRequest(this.user.id, roleUpdateFormData);
    this.store.dispatch(new userActions.RoleUpdateRequest(roleUpdateRequest));
  }
}
