import {Customer, CustomerFormModel, UpsertCustomerRequest} from '../models/customer.model';

export class CustomerMapper {
  public static mapCustomerFormToCustomerRequest(form: CustomerFormModel): UpsertCustomerRequest {
    return {
      name: form.customerName,
      status: form.status,
      contactDetails: {
        email: form.customerEmail,
        phone: `+91${form.customerPhone}`,
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

  public static mapCustomerDataToForm(data: Customer): CustomerFormModel {
    return {
      customerName: data?.name,
      customerEmail: data?.contactDetails.email,
      customerPhone: data?.contactDetails.phone,
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
