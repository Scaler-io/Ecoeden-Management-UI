import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {SupplierFormGroupHelper} from 'src/app/core/form-group/supplier.formgroup';
import {AddressSuggestion, StreetType} from 'src/app/core/models/address-suggestion';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import {AppState} from 'src/app/store/app.state';
import {getAddressSuggestions} from 'src/app/state/address-suggestion/address-suggestion.selector';
import {debounceTime, filter} from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ToastrService} from 'ngx-toastr';
import {validationMessage} from 'src/app/core/validators/validationMessage';
import {SupplierFormModel, UpsertSupplierRequest} from 'src/app/core/models/supplier';
import {SupplierMapper} from 'src/app/core/mappers/supplier.mapper';
import {getSupplierCommandResponse} from 'src/app/state/supplier/supplier.selector';
import {CommandResultStatus} from 'src/app/core/models/common';
import {Router} from '@angular/router';
import * as addressSuggestionActions from '../../../state/address-suggestion/address-suggestion.action';
import * as supplierActions from '../../../state/supplier/supplier.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';

@Component({
  selector: 'ecoeden-supplier-create-page',
  templateUrl: './supplier-create-page.component.html',
  styleUrls: ['./supplier-create-page.component.scss']
})
export class SupplierCreatePageComponent implements OnInit, OnDestroy {
  public ButtonType = ButtonType;
  public isFormSubmitting: boolean;
  public streetTypes: StreetType[] = Object.values(StreetType);
  public filteredStreets: string[] = [];
  public regions: string[] = [];
  public supplierFormGroup: FormGroup;
  public postcodeSelected: string;
  public isPostcodeValidating: boolean;
  private isProgrammaticPostcodeChange: boolean;
  private subscriptions = {
    addressSuggestion: null,
    supplierCreated: null
  };

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.supplierFormGroup = SupplierFormGroupHelper.createSupplierFormGroup();
    this.filteredStreets = this.streetTypes;
    this.supplierFormGroup.get('streetType').valueChanges.subscribe(value => {
      this.filterStreets(value);
    });

    this.triggerAddressSuggestion();

    this.subscriptions.addressSuggestion = this.store
      .pipe(
        select(getAddressSuggestions),
        filter(response => response.status !== undefined && response.regions !== undefined)
      )
      .subscribe(response => {
        this.isPostcodeValidating = false;
        if (response.status) {
          this.handleAddressSuggestionResponse(response);
        } else {
          this.regions = [];
          this.clearAddressFields();
          this.toastr.error('No address found. Try a valid post code');
        }
      });

    this.subscriptions.supplierCreated = this.store.pipe(select(getSupplierCommandResponse)).subscribe(response => {
      if (this.isFormSubmitting) {
        if (response?.status === CommandResultStatus.Success) {
          this.completeSupplierCreateCommand(response.supplierId);
        } else {
          this.toastr.error('Something went wrong. Please try again');
        }
      }
      this.isFormSubmitting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.addressSuggestion) this.subscriptions.addressSuggestion.unsubscribe();
  }

  public onBlur(): void {
    if (this.filteredStreets.length > 0 && this.supplierFormGroup.get('streetType').value != '') {
      this.supplierFormGroup.get('streetType').setValue(this.filteredStreets[0]);
    }
  }

  public onSubmit(): void {
    this.supplierFormGroup.markAllAsTouched();
    if (this.supplierFormGroup.valid) {
      this.isFormSubmitting = true;
      const supplierFormData: SupplierFormModel = this.supplierFormGroup.getRawValue();
      const supplierRequest: UpsertSupplierRequest = SupplierMapper.mapSupplierFormToSupplierRequest(supplierFormData);
      this.store.dispatch(new supplierActions.UpsertSupplier(supplierRequest));
    }
  }

  public onAddressSelection(event: MatAutocompleteSelectedEvent): void {
    const address = event.option.value.split(', ');
    this.isProgrammaticPostcodeChange = true;
    this.supplierFormGroup.patchValue({
      postCode: this.postcodeSelected,
      city: address[0],
      district: address[1],
      state: address[2]
    });
  }

  public getErrorMessage(control: string): string {
    return validationMessage(control, this.supplierFormGroup);
  }

  private clearAddressFields(): void {
    this.supplierFormGroup.patchValue({
      city: '',
      district: '',
      state: ''
    });
  }

  private handleAddressSuggestionResponse(response: AddressSuggestion): void {
    if (this.regions.length === 0) {
      response.regions.map(region => {
        this.regions.push(`${region.city}, ${region.district}, ${region.state}`);
      });
    }
  }

  public filterStreets(value: string): void {
    const filterValue = value?.toLowerCase();
    this.filteredStreets = this.streetTypes.filter(street => street.toLowerCase().includes(filterValue));
  }

  private triggerAddressSuggestion(): void {
    this.supplierFormGroup
      .get('postCode')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(res => {
        if (!this.isProgrammaticPostcodeChange) {
          if (res.length === 6) {
            this.isPostcodeValidating = true;
            this.postcodeSelected = res;
            this.store.dispatch(new addressSuggestionActions.AddressSuggestionFetch(res));
          } else {
            this.regions = [];
            this.clearAddressFields();
          }
        }
        this.isProgrammaticPostcodeChange = false;
      });
  }

  private completeSupplierCreateCommand(supplierId: string): void {
    this.store.dispatch(
      new requestPageActions.RequestPageSet({
        requestPage: 'suppliers',
        heading: `Successfully created supplier '${this.supplierFormGroup.get('supplierName').value}'`,
        subheading: 'You can create more or get back to the previous page',
        previousUrl: `suppliers/${supplierId}`,
        nextUrl: 'suppliers/add'
      })
    );
    this.router.navigate(['success']);
  }
}
