import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {FileUploaderService} from 'src/app/core/services/file-uploader.service';

@Component({
  selector: 'ecoeden-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input() uploader: FileUploader;
  @Input() previewUrl: string | ArrayBuffer | null;
  @Input() uploaderBusy: boolean;

  public fileName: string | null = null;
  public tempPreview: string | ArrayBuffer | null;

  constructor(private fileService: FileUploaderService) {}

  ngOnInit(): void {
    if (!this.previewUrl) this.previewUrl = 'assets/images/user_avatar2.webp';
    this.tempPreview = this.previewUrl;

    this.uploader.onAfterAddingFile = () => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };

    this.fileService.onUploadSuccess.subscribe(res => {
      this.fileName = '';
      this.uploaderBusy = false;
    });
  }

  public onFileSelected(event): void {
    event.stopPropagation();
    if (this.uploader.queue.length > 0) {
      const fileItem = this.uploader.queue[0];
      if (fileItem && fileItem._file) {
        this.fileName = fileItem.file.name;

        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.previewUrl = fileReader.result;
        };
        fileReader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  public onClearFileSelection(event): void {
    if (this.uploader.queue.length > 0) {
      this.uploader.clearQueue();
      this.resetPrevieUrlAndFileName();
    }
  }

  private resetPrevieUrlAndFileName(): void {
    this.fileName = '';
    this.previewUrl = this.tempPreview;
  }
}
