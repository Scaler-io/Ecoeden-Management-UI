import {Component, Inject, OnInit} from '@angular/core';
import {ButtonType} from '../button/button.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from 'src/app/core/models/dialog.model';
import {Router} from '@angular/router';

@Component({
  selector: 'ecoeden-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public ButtonType = ButtonType;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public openPrimaryActionUrl(url: string): void {
    if (url) this.router.navigateByUrl(url);
    this.dialogRef.close({confirm: true});
  }

  public openSecondaryActionUrl(url: string): void {
    if (url) this.router.navigateByUrl(url);
    else this.dialogRef.close({confirm: false});
  }

  public closeButtonAction(): void {
    this.dialogRef.close();
  }
}
