import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {UnitFormGroupHelper} from 'src/app/core/form-group/uni.formgroup';
import {UnitMapper} from 'src/app/core/mappers/unit.mapper';
import {UnitFormModel, UnitUpdateDialogData, UpsertUnitRequest} from 'src/app/core/models/unit';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import {AppState} from 'src/app/store/app.state';
import {getUnitCommandResponse} from 'src/app/state/unit/unit.selector';
import {CommandResultStatus} from 'src/app/core/models/common';
import * as unitActions from '../../../state/unit/unit.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';
import {Router} from '@angular/router';

@Component({
  selector: 'ecoeden-unit-update-dialog',
  templateUrl: './unit-update-dialog.component.html',
  styleUrls: ['./unit-update-dialog.component.scss']
})
export class UnitUpdateDialogComponent implements OnInit, OnDestroy {
  public unitFormGroup: FormGroup;
  public ButtonType = ButtonType;
  public isFormSubmitting: boolean;

  private subscription = {
    unitUpsert: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnitUpdateDialogData,
    public dialogRef: MatDialogRef<UnitUpdateDialogComponent>,
    private store: Store<AppState>,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitFormGroup = UnitFormGroupHelper.createUnitFormGroup();
    this.unitFormGroup.patchValue({
      unitName: this.data.unit.name,
      status: this.data.unit.status
    });

    this.store.pipe(select(getUnitCommandResponse)).subscribe(response => {
      if (this.isFormSubmitting) {
        if (response?.status === CommandResultStatus.Success) this.completeUnitUpsertCommand();
        else this.toastr.error('Something went wrong. Please try again');
        this.isFormSubmitting = false;
        this.closeDialog();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription.unitUpsert) this.subscription.unitUpsert.unsubscribe();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onNextClick(): void {
    if (this.unitFormGroup.valid) {
      this.isFormSubmitting = true;
      const formData: UnitFormModel = this.unitFormGroup.value;
      const unitUpdateRequest: UpsertUnitRequest = UnitMapper.mapUnitFormToUnitRequest(formData);
      unitUpdateRequest.id = this.data.unit.id;
      this.store.dispatch(new unitActions.UpsertUnit(unitUpdateRequest));
    } else {
      this.unitFormGroup.markAllAsTouched();
    }
  }

  private completeUnitUpsertCommand(): void {
    this.store.dispatch(
      new requestPageActions.RequestPageSet({
        requestPage: 'units',
        heading: `Successfully updated unit '${this.unitFormGroup.get('unitName').value}'`,
        subheading: 'You can create more or get back to the unit page',
        nextUrl: 'units'
      })
    );
    this.router.navigate(['success']);
  }
}
