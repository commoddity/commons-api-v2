import { EBillCategories, ECredentialTypes, ERecordStatus } from "../../types";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailNotification: boolean;
  smsNotification: boolean;
  phoneNumber: string;
  address: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  mp: string;
  party: string;
  ridingName: string;
  bills: string[];
  categories: EBillCategories[];
  createdAt?: Date;
  updatedAt?: Date;
  recordStatus?: ERecordStatus;
}

export class User implements IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  credentials: ECredentialTypes[];
  emailNotification: boolean;
  smsNotification: boolean;
  phoneNumber: string;
  address: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  mp: string;
  party: string;
  ridingName: string;
  bills: string[];
  categories: EBillCategories[];
  createdAt?: Date;
  updatedAt?: Date;
  recordStatus?: ERecordStatus;

  constructor({
    id,
    firstName,
    lastName,
    email,
    emailNotification,
    smsNotification,
    phoneNumber,
    address,
    street,
    city,
    province,
    postalCode,
    mp,
    party,
    ridingName,
    credentials,
    bills,
    categories,
    createdAt,
    updatedAt,
    recordStatus,
  }: UserInput) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.emailNotification = emailNotification;
    this.smsNotification = smsNotification;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.street = street;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.mp = mp;
    this.party = party;
    this.ridingName = ridingName;
    this.credentials = credentials;
    this.bills = bills;
    this.categories = categories;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.recordStatus = recordStatus;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get fullAddress(): string {
    return `${this.address} ${this.street} ${this.city} ${this.province} ${this.postalCode}`;
  }
}

interface PCognitoUserInput {
  firstName: string;
  lastName: string;
  email: string;
  credentials: ECredentialTypes[];
}

export class UserInput {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailNotification: boolean;
  smsNotification: boolean;
  phoneNumber: string;
  address: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  mp: string;
  party: string;
  ridingName: string;
  credentials: ECredentialTypes[];
  bills?: string[];
  categories?: EBillCategories[];
  createdAt?: Date;
  updatedAt?: Date;
  recordStatus?: ERecordStatus;

  constructor({ firstName, lastName, email, credentials }: PCognitoUserInput) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.credentials = credentials;
  }
}
