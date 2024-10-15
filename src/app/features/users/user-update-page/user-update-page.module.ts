import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserUpdatePageComponent} from './user-update-page.component';
import {FileUploaderModule} from 'src/app/shared/components/file-uploader/file-uploader.module';
import {AppMaterialModule} from 'src/app/app-material.module';
import {ButtonModule} from 'src/app/shared/components/button/button.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserUpdatePageComponent],
  imports: [CommonModule, FileUploaderModule, AppMaterialModule, ButtonModule, ReactiveFormsModule]
})
export class UserUpdatePageModule {}
