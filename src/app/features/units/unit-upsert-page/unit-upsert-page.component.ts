import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitFormGroupHelper} from 'src/app/core/form-group/uni.formgroup';
import {UnitMapper} from 'src/app/core/mappers/unit.mapper';
import {UnitFormModel, UpsertUnitRequest} from 'src/app/core/models/unit';
import {validationMessage} from 'src/app/core/validators/validationMessage';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import * as requestPageActions from '../../../state/request-page/request-page.action';
import * as unitActions from '../../../state/unit/unit.action';
import {AppState} from 'src/app/store/app.state';
import {select, Store} from '@ngrx/store';
import {getUnitCommandResponse, getUnitDetails} from 'src/app/state/unit/unit.selector';
import {CommandResultStatus} from 'src/app/core/models/common';
import {ToastrService} from 'ngx-toastr';
import {delay} from 'rxjs';

@Component({
  selector: 'ecoeden-unit-upsert-page',
  templateUrl: './unit-upsert-page.component.html',
  styleUrls: ['./unit-upsert-page.component.scss']
})
export class UnitUpsertPageComponent implements OnInit, OnDestroy {
  public isPageLoading: boolean;
  public ButtonType = ButtonType;
  public unitFormGroup: FormGroup;
  public isFormSubmitting: boolean = false;
  private unitId: string;

  private subscriptions = {
    upsertUnit: null,
    unitDetails: null
  };

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.isUpdatePage) {
      this.isPageLoading = true;
      this.route.queryParams.subscribe(query => {
        if (query && query['unitId']) {
          this.unitId = query['unitId'];
          this.store.dispatch(new unitActions.GetUnitDetails(this.unitId));
        }
      });

      this.subscriptions.unitDetails = this.store.pipe(select(getUnitDetails), delay(3000)).subscribe(res => {
        if (res) {
          this.unitId = res.id;
          const formModel: UnitFormModel = UnitMapper.mapUnitDataToFormModel(res);
          this.unitFormGroup.patchValue(formModel);
          this.isPageLoading = false;
        }
      });
    }

    this.unitFormGroup = UnitFormGroupHelper.createUnitFormGroup();

    this.subscriptions.upsertUnit = this.store.pipe(select(getUnitCommandResponse)).subscribe(res => {
      if (this.isFormSubmitting) {
        if (res?.status === CommandResultStatus.Success) {
          this.completeUnitUpsertCommand(res?.unitId);
        } else {
          this.toastr.error('Something went wrong. Please try again');
        }
      }
      this.isFormSubmitting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.upsertUnit) this.subscriptions.upsertUnit.unsubscribe();
  }

  public get isUpdatePage() {
    return this.router.url.includes('units/update');
  }

  public onSubmit(): void {
    if (this.unitFormGroup.valid) {
      this.isFormSubmitting = true;
      const formData: UnitFormModel = this.unitFormGroup.value;
      const unitRequest: UpsertUnitRequest = !this.isUpdatePage
        ? UnitMapper.mapUnitFormToUnitRequest(formData)
        : UnitMapper.mapUnitFormToUnitRequest(formData, '');

      this.store.dispatch(new unitActions.UpsertUnit(unitRequest));
    } else {
      this.unitFormGroup.markAllAsTouched();
    }
  }

  public getErrorMessage(control: string) {
    return validationMessage(control, this.unitFormGroup);
  }

  private completeUnitUpsertCommand(unitId: string): void {
    this.store.dispatch(
      new requestPageActions.RequestPageSet({
        requestPage: 'units',
        heading: `Successfully ${this.isUpdatePage ? 'updated' : 'created'} unit '${this.unitFormGroup.get('unitName').value}'`,
        subheading: 'You can create more or get back to the unit page',
        previousUrl: `units/${unitId}`,
        nextUrl: 'units'
      })
    );
    this.router.navigate(['success']);
  }
}
