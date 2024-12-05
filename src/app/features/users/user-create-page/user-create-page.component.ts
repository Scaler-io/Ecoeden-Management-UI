import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {FileUploader} from 'ng2-file-upload';
import {UserFormGroupHelper} from 'src/app/core/form-group/user.formgroup';
import {UserCreateStatus, UserFormModel, UserRoles} from 'src/app/core/models/user';
import {FileUploaderService} from 'src/app/core/services/file-uploader.service';
import {validationMessage} from 'src/app/core/validators/validationMessage';
import {AppState} from 'src/app/store/app.state';

import * as userActions from '../../../state/user/user.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';
import {getUserCreateResponse} from 'src/app/state/user/user.selector';
import {Router} from '@angular/router';
import {UserFormMapper} from 'src/app/core/mappers/user.mapper';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {UserService} from 'src/app/core/services/user.service';
import {Subject} from 'rxjs';
import {ButtonType} from 'src/app/shared/components/button/button.model';

@Component({
  selector: 'ecoeden-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss'],
  animations: [fadeSlideInOut]
})
export class UserCreatePageComponent implements OnInit, OnDestroy {
  public uploader: FileUploader = new FileUploader({});
  public hidePassword: boolean = true;
  public hideConfirrmPassword: boolean = true;
  public userRoles: UserRoles[] = [UserRoles.Admin, UserRoles.Opeartor, UserRoles.Auditor];
  public userFormGroup: FormGroup;
  public isFormSubmitting: boolean;
  public isUserNameSearching: boolean;
  public userNameSearchSubject: Subject<boolean> = new Subject<boolean>();

  ButtonType = ButtonType;

  constructor(
    private fileService: FileUploaderService,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService
  ) {}

  private subscriptions = {
    createUserResponse: null,
    usernameSearching: null
  };

  ngOnInit(): void {
    this.uploader = this.fileService.createUserImageUploader();
    this.setupFormGroup();

    this.subscriptions.createUserResponse = this.store.pipe(select(getUserCreateResponse)).subscribe(response => {
      if (this.isFormSubmitting && response?.status === UserCreateStatus.Success) {
        this.uploadDocument(response?.userId);
      }
    });

    this.userFormGroup.get('userName').valueChanges.subscribe(value => {
      if (!value) this.isUserNameSearching = false;
    });

    this.subscriptions.usernameSearching = this.userNameSearchSubject.subscribe(value => {
      this.isUserNameSearching = value;
      this.userFormGroup?.get('userName').markAsTouched();
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.createUserResponse) this.subscriptions.createUserResponse.unsubscribe();
    if (this.subscriptions.usernameSearching) this.subscriptions.usernameSearching.unsubscribe();
  }

  private setupFormGroup(): void {
    this.userFormGroup = UserFormGroupHelper.createUserFormGroup(this.userService, (loading: boolean) =>
      this.userNameSearchSubject.next(loading)
    );
  }

  public onSubmit(): void {
    if (this.userFormGroup.valid) {
      this.isFormSubmitting = true;
      const userRequest = UserFormMapper.mapToUserCreateRequest(this.userFormGroup.getRawValue() as UserFormModel);
      this.store.dispatch(new userActions.UserCreateRequest(userRequest));
    } else {
      this.userFormGroup.markAllAsTouched();
    }
  }

  public getValidationMessage(formControlName: string): string {
    return validationMessage(formControlName, this.userFormGroup);
  }

  public toggle(event: MouseEvent, fieldName: string) {
    event.preventDefault();
    switch (fieldName) {
      case 'password':
        this.hidePassword = !this.hidePassword;
        break;
      case 'cpassword':
        this.hideConfirrmPassword = !this.hideConfirrmPassword;
        break;
      default:
        break;
    }
  }

  private uploadDocument(userId: string) {
    this.fileService.setUserUploadOptions(userId, this.uploader);
    this.fileService.uploadFile(this.uploader).subscribe(() => {
      this.completeFormSubmission(userId);
    });
  }

  private completeFormSubmission(userId: string) {
    this.store.dispatch(
      new requestPageActions.RequestPageSet({
        requestPage: 'user',
        heading: `Successfully created user '${this.userFormGroup.get('userName').value}'`,
        subheading: 'You can create more or get back to the previous page',
        previousUrl: `users/${userId}`,
        nextUrl: 'users/add'
      })
    );
    this.router.navigate(['success']);
  }
}
