import {SupplierFormModel, UpsertSupplierRequest} from '../models/supplier';

export class SupplierMapper {
  public static mapSupplierFormToSupplierRequest(form: SupplierFormModel): UpsertSupplierRequest {
    return {
      name: form.supplierName,
      status: false,
      contactDetails: {
        email: form.supplierEmail,
        phone: `+91${form.supplierPhone}`,
        address: {
          streetNumber: form.streetNumber,
          streetName: form.streetName,
          streetType: form.streetType,
          city: form.city,
          district: form.district,
          state: form.state,
          postCode: form.postCode
        }
      }
    };
  }
}
