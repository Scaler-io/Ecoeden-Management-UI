import {Injectable} from '@angular/core';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {Observable, of, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Guid} from '../utils/guid';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  public onUploadStarted = new Subject<number>();
  public onUploadSuccess = new Subject<boolean>();
  public onUploadError = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  public createUserImageUploader(userId?: string): FileUploader {
    const uploader = new FileUploader({});
    if (userId) {
      this.setUserUploadOptions(userId, uploader);
    }
    return uploader;
  }

  public setUserUploadOptions(userId: string, uploader: FileUploader): void {
    const uo: FileUploaderOptions = {};
    uo.url = `http://localhost:8000/user/image/upload/${userId}`;
    uo.headers = [
      {name: 'Correlation-Id', value: Guid.newGuid()},
      {name: 'api-version', value: 'v2'},
      {name: 'Authorization', value: `Bearer ${this.authService.getToken()}`},
      {name: 'Access-Control-Allow-Credentials', value: 'true'},
      {name: 'Access-Control-Allow-Origin', value: 'true'},
      {name: 'ocp-apim-subscriptionkey', value: environment.userApiSubscriptionKey}
    ];
    uo.method = 'POST';
    uploader.setOptions(uo);
  }

  public uploadFile(uploader: FileUploader): Observable<boolean> {
    console.log('inside file upload service');
    console.log(uploader);
    this.onUploadStarted.next(uploader.queue.length);
    const subject = new Subject<boolean>();
    let errorCount = 0;
    uploader.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };
    uploader.onSuccessItem = (item, response) => {
      item.formData.response = response;
      item.remove();
      this.onUploadSuccess.next(true);
    };
    uploader.onErrorItem = item => {
      errorCount++;
      item.formData.response = 'error';
      item.isUploaded = false;
      this.onUploadError.next(true);
    };
    uploader.onCompleteAll = () => {
      subject.next(errorCount === 0);
      subject.complete();
    };
    if (uploader.queue.length > 0) {
      uploader.uploadAll();
      console.log(uploader);
    } else {
      return of(true);
    }

    return subject;
  }
}
