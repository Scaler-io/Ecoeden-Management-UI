import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCreatePageComponent} from './user-create-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from 'src/app/app-material.module';
import {FileUploaderModule} from 'src/app/shared/components/file-uploader/file-uploader.module';
import {DividerModule} from '../../../shared/components/divider/divider.module';
import {ButtonModule} from 'src/app/shared/components/button/button.module';
import {DirectiveModule} from 'src/app/shared/directives/directive/directive.module';

@NgModule({
  declarations: [UserCreatePageComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AppMaterialModule, FileUploaderModule, DividerModule, ButtonModule, DirectiveModule]
})
export class UserCreatePageModule {}
