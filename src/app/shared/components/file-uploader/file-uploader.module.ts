import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploaderComponent} from './file-uploader.component';
import {FileUploadModule} from 'ng2-file-upload';
import {AppMaterialModule} from 'src/app/app-material.module';

@NgModule({
  declarations: [FileUploaderComponent],
  imports: [CommonModule, FileUploadModule, AppMaterialModule],
  exports: [FileUploaderComponent]
})
export class FileUploaderModule {}
