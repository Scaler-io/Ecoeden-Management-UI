import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Supplier, SupplierCommadType} from 'src/app/core/models/supplier';
import {AppState} from 'src/app/store/app.state';
import {getSupplierCommandResponse, getSupplierDetails} from 'src/app/state/supplier/supplier.selector';
import {BreadcrumbService} from 'xng-breadcrumb';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';

import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {DialogData} from 'src/app/core/models/dialog.model';
import {ToastrService} from 'ngx-toastr';
import {CommandResultStatus} from 'src/app/core/models/common';

import * as supplierActions from '../../../state/supplier/supplier.action';
import * as requestPageActions from '../../../state/request-page/request-page.action';

@Component({
  selector: 'ecoeden-supplier-detailed-view',
  templateUrl: './supplier-detailed-view.component.html',
  styleUrls: ['./supplier-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOut]
})
export class SupplierDetailedViewComponent implements OnInit, OnDestroy {
  public supplier: Supplier;

  private subscriptions = {
    supplier: null,
    supplierDeleteCommand: null
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
      const supplierId = params['id'];
      this.noChangeDetection(() => {
        this.store.dispatch(new supplierActions.GetSupplierDetails(supplierId));
      });
    });

    this.subscriptions.supplier = this.store.pipe(select(getSupplierDetails)).subscribe(response => {
      if (response) {
        this.withChangeDetection(() => {
          this.breadcrumb.set('@suppliername', response?.name);
          this.supplier = response;
        });
      }
    });

    this.subscriptions.supplierDeleteCommand = this.store.pipe(select(getSupplierCommandResponse)).subscribe(response => {
      if (response && response.commandType === SupplierCommadType.Delete) {
        if (response.status === CommandResultStatus.Success) {
          this.store.dispatch(
            new requestPageActions.RequestPageSet({
              heading: `Supplier ${this.supplier.name} deleted successfully`,
              subheading: 'You can create more or get back to the supplier list page',
              nextUrl: 'supplier/add',
              previousUrl: 'suppliers',
              requestPage: 'supplier-delete'
            })
          );
          this.router.navigate(['success']);
        } else {
          this.toastr.error('Something went wrong. Please try again later');
        }
        this.store.dispatch(new supplierActions.ClearSupplierCommandResult());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.supplier) this.subscriptions.supplier.unsubscribe();
    if (this.subscriptions.supplierDeleteCommand) this.subscriptions.supplierDeleteCommand.unsubscribe();
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

  public get street() {
    const address = this.supplier.contactDetails.address;
    return `${address.streetNumber} ${address.streetName} ${address.streetType}`;
  }

  public goToUpdate(): void {
    this.router.navigate(['suppliers', 'update'], {
      queryParams: {
        supplierId: this.supplier.id
      }
    });
  }

  public deleteSupplier(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <DialogData>{
        title: 'Are you sure you want to delete this supplier?',
        content: 'Deleting this supplier will permanently remove all associated records. This action cannot be undone.',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirm) {
        this.store.dispatch(new supplierActions.DeleteSupplier(this.supplier.id));
      }
    });
  }
}
