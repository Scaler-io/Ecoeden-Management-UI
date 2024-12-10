import {Supplier, SupplierFormModel, UpsertSupplierRequest} from '../models/supplier';

export class SupplierMapper {
  public static mapSupplierFormToSupplierRequest(form: SupplierFormModel): UpsertSupplierRequest {
    return {
      name: form.supplierName,
      status: form.status,
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

  public static mapSupplierDataToForm(data: Supplier): SupplierFormModel {
    return {
      supplierName: data?.name,
      supplierEmail: data?.contactDetails.email,
      supplierPhone: data?.contactDetails.phone,
      status: data?.status,
      streetNumber: data?.contactDetails.address.streetNumber,
      streetName: data?.contactDetails.address.streetName,
      streetType: data?.contactDetails.address.streetType,
      city: data?.contactDetails.address.city,
      district: data?.contactDetails.address.district,
      state: data?.contactDetails.address.state,
      postCode: data?.contactDetails.address.postCode
    };
  }
}
