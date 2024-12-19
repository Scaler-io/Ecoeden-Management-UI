import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {AddressSuggestion, StreetType} from 'src/app/core/models/address-suggestion';
import {ButtonType} from 'src/app/shared/components/button/button.model';
import {AppState} from 'src/app/store/app.state';
import {debounceTime, delay, filter, map} from 'rxjs';
import {getCustomerCommandResponse, getCustomerDetails} from 'src/app/state/customer/customer.selector';
import {CustomerMapper} from 'src/app/core/mappers/customer.mapper';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {CustomerFormGroupHelper} from 'src/app/core/form-group/customer.formgroup';
import {CommandResultStatus} from 'src/app/core/models/common';
import {CustomerFormModel, UpsertCustomerRequest} from 'src/app/core/models/customer.model';
import {validationMessage} from 'src/app/core/validators/validationMessage';
import {getAddressSuggestions} from 'src/app/state/address-suggestion/address-suggestion.selector';
import * as addressSuggestionActions from '../../../state/address-suggestion/address-suggestion.action';
import * as customerActions from '../../../state/customer/customer.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';

@Component({
  selector: 'ecoeden-customer-upsert-page',
  templateUrl: './customer-upsert-page.component.html',
  styleUrls: ['./customer-upsert-page.component.scss'],
  animations: [fadeSlideInOut]
})
export class CustomerUpsertPageComponent implements OnInit, OnDestroy {
  public ButtonType = ButtonType;
  public isFormSubmitting: boolean;
  public streetTypes: StreetType[] = Object.values(StreetType);
  public filteredStreets: string[] = [];
  public regions: string[] = [];
  public customerFormGroup: FormGroup;
  public customerId: string;
  public postcodeSelected: string;
  public isPostcodeValidating: boolean;
  public isPageLoading: boolean;
  private isProgrammaticPostcodeChange: boolean;
  private subscriptions = {
    addressSuggestion: null,
    customerUpsert: null,
    customerDetails: null
  };

  constructor(
    private store: Store<AppState>,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new addressSuggestionActions.ClearAddressSuggestion());

    if (this.isUpdatePage) {
      this.isPageLoading = true;
      this.route.queryParams.subscribe(query => {
        if (query && query['customerId']) {
          this.customerId = query['customerId'];
          this.store.dispatch(new customerActions.GetCustomerDetails(this.customerId));
        }
      });

      this.subscriptions.customerDetails = this.store
        .pipe(
          select(getCustomerDetails),
          delay(3000),
          map(response =>
            response
              ? {
                  ...response,
                  contactDetails: {
                    ...response.contactDetails,
                    phone: response.contactDetails.phone.replace('+91', '')
                  }
                }
              : response
          )
        )
        .subscribe(updatedResponse => {
          this.isProgrammaticPostcodeChange = true;
          this.customerId = updatedResponse?.id;
          const formData = CustomerMapper.mapCustomerDataToForm(updatedResponse);
          this.customerFormGroup.patchValue(formData);
          this.isPageLoading = false;
        });
    }

    this.regions = [];
    this.customerFormGroup = CustomerFormGroupHelper.createCustomerFormGroup();
    this.filteredStreets = this.streetTypes;
    this.customerFormGroup.get('streetType').valueChanges.subscribe(value => {
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

    this.subscriptions.customerUpsert = this.store.pipe(select(getCustomerCommandResponse)).subscribe(response => {
      if (this.isFormSubmitting) {
        if (response?.status === CommandResultStatus.Success) {
          this.completeCustomerUpsertCommand(response.customerId);
        } else {
          this.toastr.error('Something went wrong. Please try again');
        }
      }
      this.isFormSubmitting = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.addressSuggestion) this.subscriptions.addressSuggestion.unsubscribe();
    if (this.subscriptions.customerUpsert) this.subscriptions.customerUpsert.unsubscribe();
    if (this.subscriptions.customerDetails) this.subscriptions.customerDetails.unsubscribe();
  }

  public onBlur(): void {
    if (this.filteredStreets.length > 0 && this.customerFormGroup.get('streetType').value != '') {
      this.customerFormGroup.get('streetType').setValue(this.filteredStreets[0]);
    }
  }

  public onSubmit(): void {
    this.customerFormGroup.markAllAsTouched();
    if (this.customerFormGroup.valid) {
      this.isFormSubmitting = true;
      const customerFormData: CustomerFormModel = this.customerFormGroup.getRawValue();
      const customerRequest: UpsertCustomerRequest = CustomerMapper.mapCustomerFormToCustomerRequest(customerFormData);
      if (this.isUpdatePage) customerRequest.id = this.customerId;
      this.store.dispatch(new customerActions.UpsertCustomer(customerRequest));
    }
  }

  public onAddressSelection(event: MatAutocompleteSelectedEvent): void {
    const address = event.option.value.split(', ');
    this.isProgrammaticPostcodeChange = true;
    this.customerFormGroup.patchValue({
      postCode: this.postcodeSelected,
      city: address[0],
      district: address[1],
      state: address[2]
    });
  }

  public getErrorMessage(control: string): string {
    return validationMessage(control, this.customerFormGroup);
  }

  public get isUpdatePage(): boolean {
    return this.router.url.includes('customers/update');
  }

  public filterStreets(value: string): void {
    const filterValue = value?.toLowerCase();
    this.filteredStreets = this.streetTypes.filter(street => street.toLowerCase().includes(filterValue));
  }

  private clearAddressFields(): void {
    this.customerFormGroup.patchValue({
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

  private triggerAddressSuggestion(): void {
    this.customerFormGroup
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

  private completeCustomerUpsertCommand(customerId: string): void {
    this.store.dispatch(
      new requestPageActions.RequestPageSet({
        requestPage: 'customers',
        heading: `Successfully ${this.isUpdatePage ? 'updated' : 'created'} customer '${this.customerFormGroup.get('customerName').value}'`,
        subheading: 'You can create more or get back to the customer page',
        previousUrl: `customers/${customerId}`,
        nextUrl: 'customers/add'
      })
    );
    this.router.navigate(['success']);
  }
}
