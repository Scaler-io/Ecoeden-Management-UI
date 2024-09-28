import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'ecoeden-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input() uploader: FileUploader;
  public fileName: string | null = null;
  public previewUrl: string | ArrayBuffer | null = 'assets/images/user_avatar2.webp';

  constructor() {}

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = () => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };
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
    console.log(this.uploader);
  }

  public onClearFileSelection(event): void {
    if (this.uploader.queue.length > 0) {
      this.uploader.clearQueue();
      this.resetPrevieUrlAndFileName();
    }
  }

  private resetPrevieUrlAndFileName(): void {
    this.fileName = '';
    this.previewUrl = 'assets/images/user_avatar2.webp';
  }
}
