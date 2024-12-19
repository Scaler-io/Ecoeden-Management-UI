import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';
import {Customer, CustomerCommadType} from 'src/app/core/models/customer.model';
import {DialogData} from 'src/app/core/models/dialog.model';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {AppState} from 'src/app/store/app.state';
import {BreadcrumbService} from 'xng-breadcrumb';
import {getCustomerCommandResponse, getCustomerDetails} from 'src/app/state/customer/customer.selector';
import {CommandResultStatus} from 'src/app/core/models/common';
import * as customerActions from '../../../state/customer/customer.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';

@Component({
  selector: 'ecoeden-customer-detailed-view',
  templateUrl: './customer-detailed-view.component.html',
  styleUrls: ['./customer-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOut]
})
export class CustomerDetailedViewComponent implements OnInit, OnDestroy {
  public customer: Customer;
  private subscriptions = {
    customer: null,
    customerDeleteCommand: null
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const customerId = params['id'];
      this.noChangeDetection(() => {
        this.store.dispatch(new customerActions.GetCustomerDetails(customerId));
      });
    });

    this.subscriptions.customer = this.store.pipe(select(getCustomerDetails)).subscribe(response => {
      if (response) {
        this.withChangeDetection(() => {
          this.breadcrumb.set('@customername', response?.name);
          this.customer = response;
        });
      }
    });

    this.subscriptions.customerDeleteCommand = this.store.pipe(select(getCustomerCommandResponse)).subscribe(response => {
      if (response && response.commandType === CustomerCommadType.Delete) {
        if (response.status === CommandResultStatus.Success) {
          this.store.dispatch(
            new requestPageActions.RequestPageSet({
              heading: `Customer ${this.customer.name} deleted successfully`,
              subheading: 'You can create more or get back to the customer list page',
              nextUrl: 'customers/add',
              previousUrl: 'customers',
              requestPage: 'customer-delete'
            })
          );
          this.router.navigate(['success']);
        } else {
          this.toastr.error('Something went wrong. Please try again later');
        }
        this.store.dispatch(new customerActions.ClearCustomerCommandResult());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.customer) this.subscriptions.customer.unsubscribe();
    if (this.subscriptions.customerDeleteCommand) this.subscriptions.customerDeleteCommand.unsubscribe();
  }

  public get street() {
    const address = this.customer.contactDetails.address;
    return `${address.streetNumber} ${address.streetName} ${address.streetType}`;
  }

  public goToUpdate(): void {
    this.router.navigate(['customers', 'update'], {
      queryParams: {
        customerId: this.customer.id
      }
    });
  }

  public deleteCustomer(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <DialogData>{
        title: 'Are you sure you want to delete this customer?',
        content: 'Deleting this customer will permanently remove all associated records. This action cannot be undone.',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.store.dispatch(new customerActions.DeleteCustomer(this.customer.id));
      }
    });
  }

  private withChangeDetection(fn: Function): void {
    this.zone.run(() => {
      fn();
      this.cdr.markForCheck();
    });
  }

  private noChangeDetection(fn: Function): void {
    this.zone.runOutsideAngular(() => {
      fn();
    });
  }
}
