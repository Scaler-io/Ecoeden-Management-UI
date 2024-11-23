import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Supplier} from 'src/app/core/models/supplier';
import {AppState} from 'src/app/store/app.state';
import {getSupplierDetails} from 'src/app/state/supplier/supplier.selector';
import {BreadcrumbService} from 'xng-breadcrumb';
import {fadeSlideInOut} from 'src/app/core/animations/fadeInOut';

import * as supplierActions from '../../../state/supplier/supplier.action';

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
    supplier: null
  };

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
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
  }

  ngOnDestroy(): void {
    if (this.subscriptions.supplier) this.subscriptions.supplier.unsubscribe();
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
}
