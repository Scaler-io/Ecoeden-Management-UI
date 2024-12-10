export interface ContactDetails {
  email: string;
  phone: string;
  address: AddressDetails;
}

export interface AddressDetails {
  streetNumber: string;
  streetName: string;
  streetType: string;
  city: string;
  district: string;
  state: string;
  postCode: string;
}
