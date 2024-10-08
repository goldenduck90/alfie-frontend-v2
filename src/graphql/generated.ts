import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AnyScalar: any;
  DateTime: any;
};

export type AcknowledgeAlertInput = {
  id: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type AddressQuery = {
  input: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Scalars['String']>;
};

export type AddressSuggestion = {
  __typename?: 'AddressSuggestion';
  address?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
};

export type AkuteDocument = {
  __typename?: 'AkuteDocument';
  id: Scalars['String'];
};

export type Alert = {
  __typename?: 'Alert';
  _id: Scalars['String'];
  acknowledgedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  medical: Scalars['Boolean'];
  notifiedAt?: Maybe<Scalars['DateTime']>;
  provider: Provider;
  severity: SeverityType;
  task: Task;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

/** The type of answer */
export enum AnswerType {
  Array = 'ARRAY',
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  File = 'FILE',
  Number = 'NUMBER',
  Object = 'OBJECT',
  String = 'STRING'
}

export type BatchCreateOrUpdateProvidersInput = {
  providers: Array<ProviderInput>;
};

export type BatchCreateOrUpdateProvidersResponse = {
  __typename?: 'BatchCreateOrUpdateProvidersResponse';
  created: Scalars['Int'];
  updated: Scalars['Int'];
};

export type BreakInput = {
  end: Scalars['String'];
  start: Scalars['String'];
};

export type BulkPatientReassignInput = {
  newProviderId: Scalars['String'];
  patientIds: Array<Scalars['String']>;
};

export type Checkout = {
  __typename?: 'Checkout';
  _id: Scalars['String'];
  billingAddress: Address;
  checkedOut: Scalars['Boolean'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  heightInInches: Scalars['Float'];
  insurance?: Maybe<InsuranceDetails>;
  name: Scalars['String'];
  pastTries: Array<Scalars['String']>;
  phone: Scalars['String'];
  provider?: Maybe<Provider>;
  referrer?: Maybe<Scalars['String']>;
  sameAsShippingAddress: Scalars['Boolean'];
  shippingAddress: Address;
  signupPartner?: Maybe<SignupPartner>;
  signupPartnerProvider?: Maybe<SignupPartnerProvider>;
  state: Scalars['String'];
  stripeCheckoutId: Scalars['String'];
  stripeClientSecret: Scalars['String'];
  stripeCustomerId: Scalars['String'];
  stripeSetupIntentId: Scalars['String'];
  stripeSubscriptionId: Scalars['String'];
  textOptIn?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  weightInLbs: Scalars['Float'];
  weightLossMotivatorV2: Array<Scalars['String']>;
};

export type CheckoutAddressInput = {
  _id: Scalars['String'];
  billing?: InputMaybe<AddressInput>;
  sameAsShipping: Scalars['Boolean'];
  shipping: AddressInput;
};

export type CheckoutResponse = {
  __typename?: 'CheckoutResponse';
  checkout: Checkout;
  message?: Maybe<Scalars['String']>;
};

export type Classification = {
  __typename?: 'Classification';
  calculatedPercentile?: Maybe<Scalars['Float']>;
  classification: Scalars['String'];
  date: Scalars['DateTime'];
  percentile: Scalars['Float'];
};

export type CompleteUserTaskInput = {
  _id: Scalars['String'];
  answers: Array<UserAnswersInput>;
};

export type CreateAppointmentInput = {
  bypassNotice?: InputMaybe<Scalars['Boolean']>;
  end: Scalars['String'];
  healthCoach?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  start: Scalars['String'];
  timezone: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
  userTaskId?: InputMaybe<Scalars['String']>;
};

export type CreateCheckoutInput = {
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  heightInInches: Scalars['Float'];
  name: Scalars['String'];
  pastTries: Array<Scalars['String']>;
  phone: Scalars['String'];
  referrer?: InputMaybe<Scalars['String']>;
  signupPartnerId?: InputMaybe<Scalars['String']>;
  signupPartnerProviderId?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  textOptIn?: InputMaybe<Scalars['Boolean']>;
  weightInLbs: Scalars['Float'];
  weightLossMotivatorV2?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateCustomerInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  state: Scalars['String'];
  timezone: Scalars['String'];
  updateUser?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
  zipCode: Scalars['String'];
};

export type CreateLabOrderResponse = {
  __typename?: 'CreateLabOrderResponse';
  labOrderId: Scalars['String'];
};

export type CreateTaskInput = {
  /** If set to true, the task can be assigned multiple times to the same patient without the previously assigned task being completed. */
  canHaveMultiple?: InputMaybe<Scalars['Boolean']>;
  /** If set, the patient will have the set amount of days to complete the task until they become past due. */
  daysTillDue?: InputMaybe<Scalars['Float']>;
  /** If set to true, the task will be assigned to the patient as a high priority task. */
  highPriority?: InputMaybe<Scalars['Boolean']>;
  /** If set, this task will be assigned on a recurring interval. This is a cron expression. */
  interval?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  /** If set to true, notifies the patient's health coach when the task is past due. Requires hoursTillDue to be set. */
  notifyHealthCoachWhenPastDue?: InputMaybe<Scalars['Float']>;
  /** If set to true, notifies the patient's provider when the task is past due. Requires hoursTillDue to be set. */
  notifyProviderWhenPastDue?: InputMaybe<Scalars['Float']>;
  /** Notify patient when task is assigned. */
  notifyWhenAssigned?: InputMaybe<Scalars['Boolean']>;
  /** Notify patient when the task becomes past due. Requires hoursTillDue to be set. */
  notifyWhenPastDue?: InputMaybe<Scalars['Boolean']>;
  /** If set, the task will have answers that must conform to these questions. */
  questions?: InputMaybe<Array<TaskQuestionsInput>>;
  type: TaskType;
};

export type CreateUserInput = {
  /** If not provided, user will be assigned a task to provide this information. */
  address?: InputMaybe<AddressInput>;
  /** User must be atleast 18 years old. */
  dateOfBirth: Scalars['DateTime'];
  /** EasyAppointments Customer ID. If not provided, will be created after checkout. */
  eaCustomerId?: InputMaybe<Scalars['String']>;
  /** EasyAppointments Health Coach ID. If not provided, will be assigned after the patient has their first appointment. */
  eaHealthCoachId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  gender: Gender;
  /** Height in inches. */
  heightInInches: Scalars['Float'];
  insurance?: InputMaybe<InsuranceDetailsInput>;
  /** If not provided, will be set when scale is activated. */
  metriportUserId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** If no password is provided, an email will be sent to create one. */
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  /** Provider ID associated the user to a specific provider in our system. */
  providerId?: InputMaybe<Scalars['String']>;
  /** If no role is provided, defaults to Patient. */
  role?: InputMaybe<Role>;
  signupPartnerId?: InputMaybe<Scalars['String']>;
  signupPartnerProviderId?: InputMaybe<Scalars['String']>;
  /** If not provided, will be set after checkout. */
  stripeCustomerId?: InputMaybe<Scalars['String']>;
  /** If not provided, will be set after checkout. */
  stripePaymentIntentId?: InputMaybe<Scalars['String']>;
  /** If not provided, will be set after checkout. */
  stripeSubscriptionId?: InputMaybe<Scalars['String']>;
  /** When the user's subscription expires. If not provided, the subscription won't be active. */
  subscriptionExpiresAt?: InputMaybe<Scalars['DateTime']>;
  textOptIn?: InputMaybe<Scalars['Boolean']>;
  /** Current weight in lbs. */
  weightInLbs?: InputMaybe<Scalars['Float']>;
};

export type CreateUserTaskInput = {
  taskType: TaskType;
  userId: Scalars['String'];
};

export type CreateUserTasksInput = {
  taskTypes: Array<TaskType>;
  userId: Scalars['String'];
};

export type DailySchedule = {
  __typename?: 'DailySchedule';
  breaks: Array<ScheduleBreak>;
  end: Scalars['String'];
  start: Scalars['String'];
};

export type DailyScheduleInput = {
  breaks: Array<BreakInput>;
  end: Scalars['String'];
  start: Scalars['String'];
};

export type DocUploadInput = {
  description?: InputMaybe<Scalars['String']>;
  externalPatientId?: InputMaybe<Scalars['String']>;
  file: Scalars['String'];
  fileName: Scalars['String'];
  patientId?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type EaAppointment = {
  __typename?: 'EAAppointment';
  attendanceEmailSent: Scalars['Boolean'];
  claimSubmitted: Scalars['Boolean'];
  eaAppointmentId: Scalars['String'];
  eaCustomer: EaCustomer;
  eaProvider: EaProvider;
  eaService: EaService;
  end: Scalars['String'];
  location: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  patientAttended: Scalars['Boolean'];
  providerAttended: Scalars['Boolean'];
  start: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type EaCustomer = {
  __typename?: 'EACustomer';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type EaProvider = {
  __typename?: 'EAProvider';
  bufferTime: Scalars['Float'];
  email: Scalars['String'];
  id: Scalars['String'];
  minAdvancedNotice: Scalars['Float'];
  name: Scalars['String'];
  numberOfPatients?: Maybe<Scalars['Float']>;
  timezone: Scalars['String'];
  type: Role;
};

export type EaProviderProfile = {
  __typename?: 'EAProviderProfile';
  firstName?: Maybe<Scalars['String']>;
  settings?: Maybe<EaProviderSettings>;
};

export type EaProviderProfileInput = {
  firstName?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<EaProviderProfileSettingsInput>;
};

export type EaProviderProfileSettingsInput = {
  workingPlan?: InputMaybe<EaProviderProfileWorkingPlanInput>;
};

export type EaProviderProfileWorkingPlanBreakInput = {
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};

export type EaProviderProfileWorkingPlanDayInput = {
  breaks?: InputMaybe<Array<EaProviderProfileWorkingPlanBreakInput>>;
  end?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};

export type EaProviderProfileWorkingPlanInput = {
  friday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  monday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  saturday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  sunday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  thursday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  tuesday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
  wednesday?: InputMaybe<EaProviderProfileWorkingPlanDayInput>;
};

export type EaProviderSettings = {
  __typename?: 'EAProviderSettings';
  workingPlan?: Maybe<EaWorkingPlan>;
};

export type EaService = {
  __typename?: 'EAService';
  description?: Maybe<Scalars['String']>;
  durationInMins: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type EaWorkingPlan = {
  __typename?: 'EAWorkingPlan';
  friday?: Maybe<EaWorkingPlanDay>;
  monday?: Maybe<EaWorkingPlanDay>;
  saturday?: Maybe<EaWorkingPlanDay>;
  sunday?: Maybe<EaWorkingPlanDay>;
  thursday?: Maybe<EaWorkingPlanDay>;
  tuesday?: Maybe<EaWorkingPlanDay>;
  wednesday?: Maybe<EaWorkingPlanDay>;
};

export type EaWorkingPlanBreak = {
  __typename?: 'EAWorkingPlanBreak';
  end?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
};

export type EaWorkingPlanDay = {
  __typename?: 'EAWorkingPlanDay';
  breaks?: Maybe<Array<EaWorkingPlanBreak>>;
  end?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  ETag: Scalars['String'];
  contentType: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  key: Scalars['String'];
  metadata?: Maybe<Array<FileMetadata>>;
  signedUrl: Scalars['String'];
  type: FileType;
  url: Scalars['String'];
  versionId?: Maybe<Scalars['String']>;
};

export type FileInput = {
  ETag: Scalars['String'];
  contentType: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  key: Scalars['String'];
  metadata?: InputMaybe<Array<FileMetadataInput>>;
  type: FileType;
  url: Scalars['String'];
  versionId?: InputMaybe<Scalars['String']>;
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type FileMetadataInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

/** Represents the file's purpose */
export enum FileType {
  InsuranceCard = 'InsuranceCard',
  Other = 'Other',
  PhotoId = 'PhotoId'
}

/** Signup flow type whether single step or multi step */
export enum FlowType {
  MultiStep = 'MultiStep',
  SingleStep = 'SingleStep'
}

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type GetAppointmentInput = {
  eaAppointmentId: Scalars['String'];
  timezone: Scalars['String'];
};

export type GetAppointmentsByDateInput = {
  providerId?: InputMaybe<Scalars['String']>;
  selectedDate: Scalars['String'];
  timezone: Scalars['String'];
};

export type GetAppointmentsByMonthInput = {
  month: Scalars['Float'];
  providerId?: InputMaybe<Scalars['String']>;
  timezone: Scalars['String'];
};

export type GetTimeslotsInput = {
  appointmentId?: InputMaybe<Scalars['String']>;
  bypassNotice?: InputMaybe<Scalars['Boolean']>;
  healthCoach?: InputMaybe<Scalars['Boolean']>;
  selectedDate: Scalars['String'];
  timezone: Scalars['String'];
  userId: Scalars['String'];
};

export type GetUserTasksInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  taskType?: InputMaybe<TaskType>;
  userId?: InputMaybe<Scalars['String']>;
};

export type GooglePlacesSearchInput = {
  location: Scalars['String'];
  query: Scalars['String'];
  radius: Scalars['Float'];
  type: Scalars['String'];
};

export type GooglePlacesSearchResult = {
  __typename?: 'GooglePlacesSearchResult';
  description: Scalars['String'];
  place_id: Scalars['String'];
  reference: Scalars['String'];
};

export type GoogleReverseGeoCodeGeometryObject = {
  __typename?: 'GoogleReverseGeoCodeGeometryObject';
  location: LocationObject;
};

export type GoogleReverseGeoCodeResult = {
  __typename?: 'GoogleReverseGeoCodeResult';
  formatted_address: Scalars['String'];
  geometry: GoogleReverseGeoCodeGeometryObject;
};

export type Insurance = {
  __typename?: 'Insurance';
  _id: Scalars['String'];
  name: Scalars['String'];
  states?: Maybe<Array<InsuranceState>>;
};

export type InsuranceAddress = {
  __typename?: 'InsuranceAddress';
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type InsuranceAddressInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type InsuranceCheckByCheckoutInput = {
  checkoutId: Scalars['String'];
  insurance: InsuranceDetailsInput;
};

export type InsuranceCheckByUserInput = {
  insurance: InsuranceDetailsInput;
  userId: Scalars['String'];
};

export type InsuranceCheckResponse = {
  __typename?: 'InsuranceCheckResponse';
  dependents?: Maybe<Array<InsurancePerson>>;
  eligible: Scalars['Boolean'];
  errors?: Maybe<Array<Scalars['String']>>;
  payor?: Maybe<InsurancePayor>;
  primary?: Maybe<InsurancePerson>;
  provider?: Maybe<Provider>;
  status: InsuranceStatus;
};

export type InsuranceDetails = {
  __typename?: 'InsuranceDetails';
  dependents?: Maybe<Array<InsurancePerson>>;
  groupId?: Maybe<Scalars['String']>;
  insurance: Insurance;
  memberId: Scalars['String'];
  payorId?: Maybe<Scalars['String']>;
  payorName?: Maybe<Scalars['String']>;
  primary?: Maybe<InsurancePerson>;
  rxBIN?: Maybe<Scalars['String']>;
  rxGroup?: Maybe<Scalars['String']>;
  rxPCN?: Maybe<Scalars['String']>;
  status?: Maybe<InsuranceStatus>;
  type: InsuranceType;
};

export type InsuranceDetailsInput = {
  dependents?: InputMaybe<Array<InsurancePersonInput>>;
  groupId?: InputMaybe<Scalars['String']>;
  groupName?: InputMaybe<Scalars['String']>;
  insuranceId: Scalars['String'];
  memberId: Scalars['String'];
  payorId?: InputMaybe<Scalars['String']>;
  payorName?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<InsurancePersonInput>;
  rxBIN?: InputMaybe<Scalars['String']>;
  rxGroup?: InputMaybe<Scalars['String']>;
  rxPCN?: InputMaybe<Scalars['String']>;
  type: InsuranceType;
};

export type InsurancePayor = {
  __typename?: 'InsurancePayor';
  payorId: Scalars['String'];
  payorName: Scalars['String'];
};

export type InsurancePerson = {
  __typename?: 'InsurancePerson';
  address?: Maybe<InsuranceAddress>;
  dateOfBirth?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  insuredIndicator?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  relationToSubscriber?: Maybe<Scalars['String']>;
  relationToSubscriberCode?: Maybe<Scalars['String']>;
};

export type InsurancePersonInput = {
  address?: InputMaybe<InsuranceAddressInput>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  insuredIndicator?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  relationToSubscriber?: InputMaybe<Scalars['String']>;
  relationToSubscriberCode?: InputMaybe<Scalars['String']>;
};

export type InsuranceState = {
  __typename?: 'InsuranceState';
  cpid: Scalars['String'];
  npi: Scalars['String'];
  providers: Array<Scalars['String']>;
  state: Scalars['String'];
  status: InsuranceStatus;
  types: Array<InsuranceType>;
};

/** Status of insurance, whether it's active, not active, or coming soon. */
export enum InsuranceStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  NotActive = 'NOT_ACTIVE'
}

export type InsuranceTextractDetails = {
  __typename?: 'InsuranceTextractDetails';
  groupId?: Maybe<Scalars['String']>;
  memberId?: Maybe<Scalars['String']>;
  type?: Maybe<InsuranceType>;
};

export type InsuranceTextractResponse = {
  __typename?: 'InsuranceTextractResponse';
  insurance?: Maybe<InsuranceTextractDetails>;
  lines: Array<Scalars['String']>;
  words: Array<Scalars['String']>;
};

/** Types of insurance plans supported. */
export enum InsuranceType {
  Epo = 'EPO',
  Hmo = 'HMO',
  Medicare = 'MEDICARE',
  Pos = 'POS',
  Ppo = 'PPO'
}

export type LocationObject = {
  __typename?: 'LocationObject';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type LoginInput = {
  email: Scalars['String'];
  /** Only useable by admins to generate auth tokens */
  noExpire?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  /** If not set token will expire in 1d. If set to true, token will expire in 7d. */
  remember?: InputMaybe<Scalars['Boolean']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  user: PartialUser;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String'];
};

export type MetriportConnectResponse = {
  __typename?: 'MetriportConnectResponse';
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acknowledgeAlert: Alert;
  archiveTask: UserTask;
  assignTaskToUser: UserTask;
  batchCreateOrUpdateProviders?: Maybe<BatchCreateOrUpdateProvidersResponse>;
  bulkAssignTasksToUser: Array<UserTask>;
  cancelAppointment: MessageResponse;
  classifyPatients: User;
  completeUpload: User;
  completeUserTask: UserTask;
  createAppointment: EaAppointment;
  createCustomer: Scalars['String'];
  createInsuredUserFromCheckout: CheckoutResponse;
  createLabOrder: CreateLabOrderResponse;
  createOrFindCheckout: CheckoutResponse;
  createOrUpdateStripeSession: CheckoutResponse;
  createTask: Task;
  createUser: User;
  createUserFromCheckout: Scalars['String'];
  forgotPassword: MessageResponse;
  generateMetriportConnectUrl: MetriportConnectResponse;
  insuranceCheckByCheckout: InsuranceCheckResponse;
  insuranceCheckByUser: InsuranceCheckResponse;
  insuranceTextract: InsuranceTextractResponse;
  internalBulkPatientReassign: Scalars['Boolean'];
  internalOpsCreateNewProvider: User;
  internalPatientModify: Scalars['Boolean'];
  internalPatientReassign: User;
  internalProviderModify: Scalars['Boolean'];
  login: LoginResponse;
  recordScaleReading: User;
  requestSignedUrls: Array<SignedUrlResponse>;
  resetPassword: LoginResponse;
  runPostAppointmentJob: MessageResponse;
  scorePatients: Score;
  submitSurvey: Nps;
  subscribeEmail: MessageResponse;
  updateAppointment: EaAppointment;
  updateAppointmentAttended: MessageResponse;
  updateProviderProfile: EaProviderProfile;
  updateProviderSchedule: UpdateScheduleMessage;
  updateUserTask: UserTask;
  uploadDocument: AkuteDocument;
};


export type MutationAcknowledgeAlertArgs = {
  input: AcknowledgeAlertInput;
};


export type MutationArchiveTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationAssignTaskToUserArgs = {
  input: CreateUserTaskInput;
};


export type MutationBatchCreateOrUpdateProvidersArgs = {
  input: BatchCreateOrUpdateProvidersInput;
};


export type MutationBulkAssignTasksToUserArgs = {
  input: CreateUserTasksInput;
};


export type MutationCancelAppointmentArgs = {
  input: GetAppointmentInput;
};


export type MutationClassifyPatientsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationCompleteUploadArgs = {
  files: Array<FileInput>;
};


export type MutationCompleteUserTaskArgs = {
  input: CompleteUserTaskInput;
};


export type MutationCreateAppointmentArgs = {
  input: CreateAppointmentInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateInsuredUserFromCheckoutArgs = {
  input: CheckoutAddressInput;
};


export type MutationCreateLabOrderArgs = {
  userId: Scalars['String'];
};


export type MutationCreateOrFindCheckoutArgs = {
  input: CreateCheckoutInput;
};


export type MutationCreateOrUpdateStripeSessionArgs = {
  input: CheckoutAddressInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserFromCheckoutArgs = {
  checkoutId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationGenerateMetriportConnectUrlArgs = {
  userId: Scalars['String'];
};


export type MutationInsuranceCheckByCheckoutArgs = {
  input: InsuranceCheckByCheckoutInput;
};


export type MutationInsuranceCheckByUserArgs = {
  input: InsuranceCheckByUserInput;
};


export type MutationInsuranceTextractArgs = {
  s3Key: Scalars['String'];
};


export type MutationInternalBulkPatientReassignArgs = {
  input: BulkPatientReassignInput;
};


export type MutationInternalOpsCreateNewProviderArgs = {
  input: ProviderCreateInput;
};


export type MutationInternalPatientModifyArgs = {
  input: PatientModifyInput;
};


export type MutationInternalPatientReassignArgs = {
  input: PatientReassignInput;
};


export type MutationInternalProviderModifyArgs = {
  input: ProviderModifyInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRecordScaleReadingArgs = {
  input: ScaleReadingInput;
};


export type MutationRequestSignedUrlsArgs = {
  requests: Array<SignedUrlRequest>;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationScorePatientsArgs = {
  userId: Scalars['String'];
};


export type MutationSubmitSurveyArgs = {
  input: NpsInput;
};


export type MutationSubscribeEmailArgs = {
  input: SubscribeEmailInput;
};


export type MutationUpdateAppointmentArgs = {
  input: UpdateAppointmentInput;
};


export type MutationUpdateAppointmentAttendedArgs = {
  eaAppointmentId: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProviderProfileArgs = {
  eaProviderId: Scalars['String'];
  input: EaProviderProfileInput;
};


export type MutationUpdateProviderScheduleArgs = {
  eaProviderId: Scalars['String'];
  schedule: ScheduleInput;
  timezone: Scalars['String'];
};


export type MutationUpdateUserTaskArgs = {
  input: UpdateUserTaskInput;
  taskId: Scalars['String'];
};


export type MutationUploadDocumentArgs = {
  input: DocUploadInput;
};

export type Nps = {
  __typename?: 'NPS';
  _id: Scalars['String'];
  appointmentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  feedback?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  textAnswer?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type NpsInput = {
  feedback?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  score: Scalars['Float'];
  textAnswer?: InputMaybe<Scalars['String']>;
};

export type PartialUser = {
  __typename?: 'PartialUser';
  _id: Scalars['String'];
  eaHealthCoachId?: Maybe<Scalars['String']>;
  eaProviderId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  role: Role;
};

export type PatientModifyInput = {
  address?: InputMaybe<AddressInput>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  heightInInches?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  patientId: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  providerId?: InputMaybe<Scalars['String']>;
  weightInLbs?: InputMaybe<Scalars['Float']>;
};

export type PatientReassignInput = {
  newProviderId: Scalars['String'];
  patientId: Scalars['String'];
};

export type PharmacyLocationInput = {
  name: Scalars['String'];
};

export type PharmacyLocationResult = {
  __typename?: 'PharmacyLocationResult';
  address_city: Scalars['String'];
  address_line_1: Scalars['String'];
  address_line_2?: Maybe<Scalars['String']>;
  address_state: Scalars['String'];
  address_zipcode: Scalars['String'];
  id: Scalars['Float'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  pharmacy_specialties: Array<Scalars['String']>;
  primary_fax_number: Scalars['String'];
  primary_phone_number: Scalars['String'];
};

export type Provider = {
  __typename?: 'Provider';
  _id: Scalars['String'];
  akuteId: Scalars['String'];
  eaProviderId: Scalars['Int'];
  email: Scalars['String'];
  emailToken?: Maybe<Scalars['String']>;
  emailTokenExpiresAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  licensedStates: Array<Scalars['String']>;
  npi: Scalars['String'];
  numberOfPatients?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type ProviderCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  licensedStates: Array<Scalars['String']>;
  npi: Scalars['String'];
  providerCode: Scalars['String'];
};

export type ProviderInput = {
  akuteId: Scalars['String'];
  eaProviderId: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  licensedStates: Array<Scalars['String']>;
  npi: Scalars['String'];
  numberOfPatients?: InputMaybe<Scalars['Int']>;
  type: Role;
};

export type ProviderListResponse = {
  __typename?: 'ProviderListResponse';
  providers: Array<Provider>;
};

export type ProviderModifyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  licensedStates?: InputMaybe<Array<Scalars['String']>>;
  npi?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  providerId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  addressDetail: Address;
  addressSuggestions: Array<AddressSuggestion>;
  allProviders: ProviderListResponse;
  allUserTasks: UserTaskList;
  allUserTasksByUserId?: Maybe<Array<UserTask>>;
  appointment: EaAppointment;
  appointmentsByDate: Array<EaAppointment>;
  appointmentsByMonth: Array<EaAppointment>;
  checkout: CheckoutResponse;
  generateSummary: User;
  getAProvider: EaProviderProfile;
  getAlerts: Array<Alert>;
  getAlertsByPatient: Array<Alert>;
  getAllPatientsByHealthCoach: Array<User>;
  getAllPatientsByProvider: Array<User>;
  getAllPatientsWithAlerts: Array<User>;
  getAllTasks: Array<Task>;
  getAllUserTasksByUser: Array<UserTask>;
  getProviderSchedule: ScheduleObject;
  getRole: RoleResponse;
  getSignupPartnerByTitle: SingupPartnerResponse;
  getSignupPartnerProviders: Array<SignupPartnerProvider>;
  getSurvey: Nps;
  getUserById: User;
  insurances: Array<Insurance>;
  me: User;
  pharmacyLocations: Array<PharmacyLocationResult>;
  places: Array<GooglePlacesSearchResult>;
  provider: Provider;
  reverseGeoCode: Array<GoogleReverseGeoCodeResult>;
  task?: Maybe<Task>;
  timeslots: TimeslotsResponse;
  upcomingAppointments: Array<EaAppointment>;
  user: User;
  userScheduleAppointmentTask: UserAppointmentEligibility;
  userSendbirdChannel: Array<UserSendbirdChannel>;
  userTask: UserTask;
  userTasks: UserTaskList;
  users: Array<User>;
};


export type QueryAddressDetailArgs = {
  placeId: Scalars['String'];
};


export type QueryAddressSuggestionsArgs = {
  query: AddressQuery;
};


export type QueryAllProvidersArgs = {
  state?: InputMaybe<Scalars['String']>;
};


export type QueryAllUserTasksByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryAppointmentArgs = {
  input: GetAppointmentInput;
};


export type QueryAppointmentsByDateArgs = {
  input: GetAppointmentsByDateInput;
};


export type QueryAppointmentsByMonthArgs = {
  input: GetAppointmentsByMonthInput;
};


export type QueryCheckoutArgs = {
  id: Scalars['String'];
};


export type QueryGenerateSummaryArgs = {
  userId: Scalars['String'];
};


export type QueryGetAProviderArgs = {
  eaProviderId: Scalars['String'];
};


export type QueryGetAlertsByPatientArgs = {
  patientId: Scalars['String'];
};


export type QueryGetAllUserTasksByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetProviderScheduleArgs = {
  eaProviderId: Scalars['String'];
  timezone: Scalars['String'];
};


export type QueryGetSignupPartnerByTitleArgs = {
  title: Scalars['String'];
};


export type QueryGetSignupPartnerProvidersArgs = {
  partnerId: Scalars['String'];
};


export type QueryGetSurveyArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryPharmacyLocationsArgs = {
  input: PharmacyLocationInput;
};


export type QueryPlacesArgs = {
  input: GooglePlacesSearchInput;
};


export type QueryProviderArgs = {
  id: Scalars['String'];
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryTimeslotsArgs = {
  input: GetTimeslotsInput;
};


export type QueryUpcomingAppointmentsArgs = {
  input: UpcomingAppointmentsInput;
};


export type QueryUserSendbirdChannelArgs = {
  userId: Scalars['String'];
};


export type QueryUserTaskArgs = {
  id: Scalars['String'];
};


export type QueryUserTasksArgs = {
  input: GetUserTasksInput;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  registration: Scalars['Boolean'];
  token: Scalars['String'];
};

/** The user roles a user can be assigned to */
export enum Role {
  Admin = 'Admin',
  CareCoordinator = 'CareCoordinator',
  Doctor = 'Doctor',
  HealthCoach = 'HealthCoach',
  Internal = 'Internal',
  Nutritionist = 'Nutritionist',
  Patient = 'Patient',
  Practitioner = 'Practitioner'
}

export type RoleResponse = {
  __typename?: 'RoleResponse';
  role: Role;
};

export type ScaleReadingInput = {
  metriportUserId: Scalars['String'];
  time?: InputMaybe<Scalars['DateTime']>;
  weightLbs: Scalars['Float'];
};

export type Schedule = {
  __typename?: 'Schedule';
  friday: DailySchedule;
  monday: DailySchedule;
  saturday: DailySchedule;
  sunday: DailySchedule;
  thursday: DailySchedule;
  tuesday: DailySchedule;
  wednesday: DailySchedule;
};

export type ScheduleBreak = {
  __typename?: 'ScheduleBreak';
  end: Scalars['String'];
  start: Scalars['String'];
};

export type ScheduleExceptions = {
  __typename?: 'ScheduleExceptions';
  date: DailySchedule;
};

export type ScheduleInput = {
  friday: DailyScheduleInput;
  monday: DailyScheduleInput;
  saturday: DailyScheduleInput;
  sunday: DailyScheduleInput;
  thursday: DailyScheduleInput;
  tuesday: DailyScheduleInput;
  wednesday: DailyScheduleInput;
};

export type ScheduleObject = {
  __typename?: 'ScheduleObject';
  exceptions: ScheduleExceptions;
  schedule: Schedule;
  timezone: Scalars['String'];
};

export type Score = {
  __typename?: 'Score';
  calculatedPercentile?: Maybe<Scalars['Float']>;
  calculatedPercentile1Hour?: Maybe<Scalars['Float']>;
  calculatedPercentile30Minutes?: Maybe<Scalars['Float']>;
  currentScore?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  increased?: Maybe<Scalars['Boolean']>;
  increased1Hour?: Maybe<Scalars['Boolean']>;
  increased30Minutes?: Maybe<Scalars['Boolean']>;
  increasedDiastolic?: Maybe<Scalars['Boolean']>;
  increasedSystolic?: Maybe<Scalars['Boolean']>;
  latest?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
  percentDifference?: Maybe<Scalars['Float']>;
  percentDifference1Hour?: Maybe<Scalars['Float']>;
  percentDifference30Minutes?: Maybe<Scalars['Float']>;
  percentDifferenceDiastolic?: Maybe<Scalars['Float']>;
  percentDifferenceSystolic?: Maybe<Scalars['Float']>;
  percentile?: Maybe<Scalars['Float']>;
  percentile1Hour?: Maybe<Scalars['Float']>;
  percentile30Minutes?: Maybe<Scalars['Float']>;
  providerMessage?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  scoreDiastolic?: Maybe<Scalars['Float']>;
  scoreSystolic?: Maybe<Scalars['Float']>;
  task?: Maybe<Scalars['String']>;
};

/** Alert severity type. */
export enum SeverityType {
  Extreme = 'EXTREME',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type SignedUrlRequest = {
  contentType: Scalars['String'];
  key: Scalars['String'];
  metadata?: InputMaybe<Array<FileMetadataInput>>;
  requestType?: InputMaybe<Scalars['String']>;
  versionId?: InputMaybe<Scalars['String']>;
};

export type SignedUrlResponse = {
  __typename?: 'SignedUrlResponse';
  key: Scalars['String'];
  url: Scalars['String'];
};

export type SignupPartner = {
  __typename?: 'SignupPartner';
  _id: Scalars['String'];
  flowType: FlowType;
  logoUrl?: Maybe<Scalars['String']>;
  stripePriceId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SignupPartnerProvider = {
  __typename?: 'SignupPartnerProvider';
  _id: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  faxNumber?: Maybe<Scalars['String']>;
  npi: Scalars['String'];
  phone: Scalars['String'];
  signupPartner: SignupPartner;
  state: Scalars['String'];
  title: Scalars['String'];
  zipCode: Scalars['String'];
};

export type SingupPartnerResponse = {
  __typename?: 'SingupPartnerResponse';
  partner: SignupPartner;
  partnerProviders?: Maybe<Array<SignupPartnerProvider>>;
};

export type SubscribeEmailInput = {
  currentMember: Scalars['Boolean'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  location: Scalars['String'];
  waitlist: Scalars['Boolean'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String'];
  canHaveMultiple: Scalars['Boolean'];
  daysTillDue?: Maybe<Scalars['Float']>;
  highPriority: Scalars['Boolean'];
  interval?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  notifyCareCoordinatorWhenPastDue: Scalars['Boolean'];
  notifyHealthCoachWhenPastDue: Scalars['Boolean'];
  notifyProviderWhenPastDue: Scalars['Boolean'];
  notifyWhenAssigned?: Maybe<Scalars['Boolean']>;
  notifyWhenPastDue: Scalars['Boolean'];
  questions?: Maybe<Array<TaskQuestion>>;
  type: TaskType;
};

export type TaskQuestion = {
  __typename?: 'TaskQuestion';
  key: Scalars['String'];
  type: AnswerType;
};

export type TaskQuestionsInput = {
  key: Scalars['String'];
  type: AnswerType;
};

/** The type of task */
export enum TaskType {
  AdLibitum = 'AD_LIBITUM',
  BpLog = 'BP_LOG',
  ConnectWithingsScale = 'CONNECT_WITHINGS_SCALE',
  DailyMetricsLog = 'DAILY_METRICS_LOG',
  FoodLog = 'FOOD_LOG',
  Gsrs = 'GSRS',
  HrAndBpLog = 'HR_AND_BP_LOG',
  IdAndInsuranceUpload = 'ID_AND_INSURANCE_UPLOAD',
  LabSelection = 'LAB_SELECTION',
  MpActivity = 'MP_ACTIVITY',
  MpBlueCapsule = 'MP_BLUE_CAPSULE',
  MpBlueCapsule_2 = 'MP_BLUE_CAPSULE_2',
  MpFeeling = 'MP_FEELING',
  MpHunger = 'MP_HUNGER',
  NewPatientIntakeForm = 'NEW_PATIENT_INTAKE_FORM',
  ScheduleAppointment = 'SCHEDULE_APPOINTMENT',
  ScheduleHealthCoachAppointment = 'SCHEDULE_HEALTH_COACH_APPOINTMENT',
  Tefq = 'TEFQ',
  WaistLog = 'WAIST_LOG',
  WeightLog = 'WEIGHT_LOG'
}

export type Timeslot = {
  __typename?: 'Timeslot';
  end: Scalars['String'];
  start: Scalars['String'];
};

export type TimeslotsResponse = {
  __typename?: 'TimeslotsResponse';
  eaCustomer?: Maybe<EaCustomer>;
  eaProvider: EaProvider;
  eaService: EaService;
  selectedDate: Scalars['String'];
  timeslots: Array<Timeslot>;
  timezone: Scalars['String'];
  total: Scalars['Float'];
};

export type UpcomingAppointmentsInput = {
  providerId?: InputMaybe<Scalars['String']>;
  selectedDate?: InputMaybe<Scalars['String']>;
  timezone: Scalars['String'];
};

export type UpdateAppointmentInput = {
  bypassNotice?: InputMaybe<Scalars['Boolean']>;
  eaAppointmentId: Scalars['String'];
  end: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  start: Scalars['String'];
  timezone: Scalars['String'];
};

export type UpdateScheduleMessage = {
  __typename?: 'UpdateScheduleMessage';
  code: Scalars['Float'];
  message: Scalars['String'];
};

export type UpdateUserTaskInput = {
  lastNotifiedUserAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  address: Address;
  akutePatientId?: Maybe<Scalars['String']>;
  bmi?: Maybe<Scalars['Float']>;
  calId: Scalars['String'];
  classifications?: Maybe<Array<Classification>>;
  dateOfBirth: Scalars['DateTime'];
  eaCustomerId?: Maybe<Scalars['String']>;
  eaHealthCoachId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailToken: Scalars['String'];
  emailTokenExpiresAt: Scalars['DateTime'];
  externalPatientId?: Maybe<Scalars['String']>;
  files: Array<File>;
  gender: Gender;
  generatedSummary?: Maybe<Scalars['String']>;
  hasScale?: Maybe<Scalars['Boolean']>;
  heightInInches: Scalars['Float'];
  inactive?: Maybe<Scalars['Boolean']>;
  insurance?: Maybe<InsuranceDetails>;
  labOrderSent?: Maybe<Scalars['Boolean']>;
  lastMetriportConsolidatedQuery?: Maybe<Scalars['DateTime']>;
  meetingRoomUrl?: Maybe<Scalars['String']>;
  meetingUrl?: Maybe<Scalars['String']>;
  metriportFacilityId?: Maybe<Scalars['String']>;
  metriportPatientId?: Maybe<Scalars['String']>;
  metriportUserId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  pharmacyLocation?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  provider?: Maybe<Provider>;
  role: Role;
  score: Array<Score>;
  sendbirdChannelUrl?: Maybe<Scalars['String']>;
  signupPartner?: Maybe<SignupPartner>;
  signupPartnerProvider?: Maybe<SignupPartnerProvider>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  stripePaymentIntentId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  subscriptionExpiresAt: Scalars['DateTime'];
  textOptIn?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  weights: Array<Weight>;
};

export type UserAnswer = {
  __typename?: 'UserAnswer';
  key: Scalars['String'];
  type: AnswerType;
  value?: Maybe<Scalars['AnyScalar']>;
};

export type UserAnswersInput = {
  key: Scalars['String'];
  type: AnswerType;
  value?: InputMaybe<Scalars['AnyScalar']>;
};

export type UserAppointmentEligibility = {
  __typename?: 'UserAppointmentEligibility';
  completedRequiredTasks?: Maybe<Scalars['Boolean']>;
  daysLeft?: Maybe<Scalars['Float']>;
  task?: Maybe<UserTask>;
};

export type UserSendbirdChannel = {
  __typename?: 'UserSendbirdChannel';
  channel_url: Scalars['String'];
  count_preference?: Maybe<Scalars['String']>;
  cover_url?: Maybe<Scalars['String']>;
  created_at: Scalars['Float'];
  created_by?: Maybe<Scalars['String']>;
  custom_type?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  freeze: Scalars['Boolean'];
  hidden_state?: Maybe<Scalars['String']>;
  ignore_profanity_filter: Scalars['Boolean'];
  invited_at: Scalars['Float'];
  inviter?: Maybe<Scalars['String']>;
  is_access_code_required: Scalars['Boolean'];
  is_broadcast: Scalars['Boolean'];
  is_discoverable: Scalars['Boolean'];
  is_distinct: Scalars['Boolean'];
  is_ephemeral: Scalars['Boolean'];
  is_exclusive: Scalars['Boolean'];
  is_hidden: Scalars['Boolean'];
  is_muted: Scalars['Boolean'];
  is_public: Scalars['Boolean'];
  is_push_enabled: Scalars['Boolean'];
  is_super: Scalars['Boolean'];
  joined_member_count: Scalars['Float'];
  joined_ts?: Maybe<Scalars['Float']>;
  max_length_message: Scalars['Float'];
  member_count: Scalars['Float'];
  member_state: Scalars['String'];
  message_survival_seconds: Scalars['Float'];
  my_role?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  push_trigger_option?: Maybe<Scalars['String']>;
  ts_message_offset: Scalars['Float'];
  unread_mention_count: Scalars['Float'];
  unread_message_count: Scalars['Float'];
  user_last_read: Scalars['Float'];
};

export type UserTask = {
  __typename?: 'UserTask';
  _id: Scalars['String'];
  answers?: Maybe<Array<UserAnswer>>;
  archived?: Maybe<Scalars['Boolean']>;
  completed: Scalars['Boolean'];
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dueAt?: Maybe<Scalars['DateTime']>;
  highPriority: Scalars['Boolean'];
  isReadyForProfiling?: Maybe<Scalars['Boolean']>;
  lastNotifiedHealthCoachPastDueAt?: Maybe<Scalars['DateTime']>;
  lastNotifiedProviderPastDueAt?: Maybe<Scalars['DateTime']>;
  lastNotifiedUserAt?: Maybe<Scalars['DateTime']>;
  lastNotifiedUserPastDueAt?: Maybe<Scalars['DateTime']>;
  pastDue?: Maybe<Scalars['Boolean']>;
  providerEmail?: Maybe<Scalars['String']>;
  task?: Maybe<Task>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type UserTaskList = {
  __typename?: 'UserTaskList';
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  total: Scalars['Float'];
  userTasks?: Maybe<Array<UserTask>>;
};

export type Weight = {
  __typename?: 'Weight';
  date: Scalars['DateTime'];
  scale?: Maybe<Scalars['Boolean']>;
  value: Scalars['Float'];
};

export type ModifyProviderMutationVariables = Exact<{
  input: ProviderModifyInput;
}>;


export type ModifyProviderMutation = { __typename?: 'Mutation', internalProviderModify: boolean };

export type GetAllProvidersAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProvidersAdminQuery = { __typename?: 'Query', allProviders: { __typename?: 'ProviderListResponse', providers: Array<{ __typename?: 'Provider', _id: string, firstName: string, lastName: string, email: string, numberOfPatients?: number | null }> } };

export type CancelAppointmentMutationVariables = Exact<{
  input: GetAppointmentInput;
}>;


export type CancelAppointmentMutation = { __typename?: 'Mutation', cancelAppointment: { __typename?: 'MessageResponse', message: string } };

export type GetAppointmentsByMonthQueryQueryVariables = Exact<{
  input: GetAppointmentsByMonthInput;
}>;


export type GetAppointmentsByMonthQueryQuery = { __typename?: 'Query', appointmentsByMonth: Array<{ __typename?: 'EAAppointment', eaAppointmentId: string, notes?: string | null, location: string, start: string, end: string, eaCustomer: { __typename?: 'EACustomer', id: string, name: string, email: string }, eaProvider: { __typename?: 'EAProvider', id: string, name: string, email: string, type: Role } }> };

export type CreateOrUpdateStripeSessionMutationVariables = Exact<{
  input: CheckoutAddressInput;
}>;


export type CreateOrUpdateStripeSessionMutation = { __typename?: 'Mutation', createOrUpdateStripeSession: { __typename?: 'CheckoutResponse', checkout: { __typename?: 'Checkout', _id: string } } };

export type CreateInsuredUserFromCheckoutMutationVariables = Exact<{
  input: CheckoutAddressInput;
}>;


export type CreateInsuredUserFromCheckoutMutation = { __typename?: 'Mutation', createInsuredUserFromCheckout: { __typename?: 'CheckoutResponse', checkout: { __typename?: 'Checkout', _id: string } } };

export type GetCheckoutStripeSecretOctaviaQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCheckoutStripeSecretOctaviaQuery = { __typename?: 'Query', checkout: { __typename?: 'CheckoutResponse', checkout: { __typename?: 'Checkout', _id: string, stripeClientSecret: string } } };

export type RequestSignedUrlsMutationVariables = Exact<{
  requests: Array<SignedUrlRequest> | SignedUrlRequest;
}>;


export type RequestSignedUrlsMutation = { __typename?: 'Mutation', requestSignedUrls: Array<{ __typename?: 'SignedUrlResponse', url: string, key: string }> };

export type InsuranceTextractMutationVariables = Exact<{
  s3Key: Scalars['String'];
}>;


export type InsuranceTextractMutation = { __typename?: 'Mutation', insuranceTextract: { __typename?: 'InsuranceTextractResponse', words: Array<string>, lines: Array<string>, insurance?: { __typename?: 'InsuranceTextractDetails', type?: InsuranceType | null, memberId?: string | null, groupId?: string | null } | null } };

export type InsurancesQueryVariables = Exact<{ [key: string]: never; }>;


export type InsurancesQuery = { __typename?: 'Query', insurances: Array<{ __typename?: 'Insurance', _id: string, name: string }> };

export type InsuranceCheckByCheckoutMutationVariables = Exact<{
  input: InsuranceCheckByCheckoutInput;
}>;


export type InsuranceCheckByCheckoutMutation = { __typename?: 'Mutation', insuranceCheckByCheckout: { __typename?: 'InsuranceCheckResponse', status: InsuranceStatus, eligible: boolean, errors?: Array<string> | null } };

export type CompleteUploadFilesMutationVariables = Exact<{
  files: Array<FileInput> | FileInput;
}>;


export type CompleteUploadFilesMutation = { __typename?: 'Mutation', completeUpload: { __typename?: 'User', _id: string } };

export type UpdateAppointmentMutationMutationVariables = Exact<{
  input: UpdateAppointmentInput;
}>;


export type UpdateAppointmentMutationMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'EAAppointment', eaAppointmentId: string } };

export type CreateAppointmentMutationMutationVariables = Exact<{
  input: CreateAppointmentInput;
}>;


export type CreateAppointmentMutationMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'EAAppointment', eaAppointmentId: string } };

export type GetTimeslotsQueryQueryVariables = Exact<{
  input: GetTimeslotsInput;
}>;


export type GetTimeslotsQueryQuery = { __typename?: 'Query', timeslots: { __typename?: 'TimeslotsResponse', selectedDate: string, timezone: string, total: number, eaProvider: { __typename?: 'EAProvider', id: string, name: string, type: Role, email: string }, eaCustomer?: { __typename?: 'EACustomer', id: string, name: string, email: string } | null, timeslots: Array<{ __typename?: 'Timeslot', start: string, end: string }> } };

export type UpcomingAppointmentsQueryQueryVariables = Exact<{
  input: UpcomingAppointmentsInput;
}>;


export type UpcomingAppointmentsQueryQuery = { __typename?: 'Query', upcomingAppointments: Array<{ __typename?: 'EAAppointment', eaAppointmentId: string, start: string, end: string, eaProvider: { __typename?: 'EAProvider', id: string, name: string, email: string, type: Role }, eaCustomer: { __typename?: 'EACustomer', id: string, name: string } }> };

export type UserTasksQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  completed?: InputMaybe<Scalars['Boolean']>;
}>;


export type UserTasksQueryQuery = { __typename?: 'Query', userTasks: { __typename?: 'UserTaskList', total: number, userTasks?: Array<{ __typename?: 'UserTask', _id: string, dueAt?: any | null, pastDue?: boolean | null, createdAt?: any | null, task?: { __typename?: 'Task', _id: string, name?: string | null, type: TaskType, highPriority: boolean } | null }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', weights: Array<{ __typename?: 'Weight', value: number, date: any }> } };

export type GetUserCompletedAppointmentTasksInMonthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCompletedAppointmentTasksInMonthQuery = { __typename?: 'Query', userScheduleAppointmentTask: { __typename?: 'UserAppointmentEligibility', daysLeft?: number | null, completedRequiredTasks?: boolean | null, task?: { __typename?: 'UserTask', completed: boolean, completedAt?: any | null } | null } };

export type GetAlertsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlertsQuery = { __typename?: 'Query', getAlerts: Array<{ __typename?: 'Alert', _id: string, title: string, description: string, severity: SeverityType, medical: boolean, acknowledgedAt?: any | null, user: { __typename?: 'User', _id: string, name: string, email: string } }> };

export type ModifyPatientMutationVariables = Exact<{
  input: PatientModifyInput;
}>;


export type ModifyPatientMutation = { __typename?: 'Mutation', internalPatientModify: boolean };

export type GetUserSummaryQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserSummaryQuery = { __typename?: 'Query', generateSummary: { __typename?: 'User', generatedSummary?: string | null } };

export type GetAllProvidersQueryVariables = Exact<{
  state?: InputMaybe<Scalars['String']>;
}>;


export type GetAllProvidersQuery = { __typename?: 'Query', allProviders: { __typename?: 'ProviderListResponse', providers: Array<{ __typename?: 'Provider', _id: string, firstName: string, lastName: string }> } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', _id: string, textOptIn?: boolean | null, meetingRoomUrl?: string | null, generatedSummary?: string | null, name: string, email: string, phone: string, role: Role, dateOfBirth: any, gender: Gender, heightInInches: number, akutePatientId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, eaCustomerId?: string | null, eaHealthCoachId?: string | null, subscriptionExpiresAt: any, pharmacyLocation?: string | null, meetingUrl?: string | null, labOrderSent?: boolean | null, bmi?: number | null, provider?: { __typename?: 'Provider', _id: string, firstName: string, lastName: string } | null, address: { __typename?: 'Address', line1: string, line2?: string | null, city: string, state: string, postalCode: string, country?: string | null }, weights: Array<{ __typename?: 'Weight', value: number, date: any }>, classifications?: Array<{ __typename?: 'Classification', classification: string, calculatedPercentile?: number | null, percentile: number, date: any }> | null, files: Array<{ __typename?: 'File', key: string, signedUrl: string, contentType: string, metadata?: Array<{ __typename?: 'FileMetadata', key: string, value: string }> | null }>, signupPartner?: { __typename?: 'SignupPartner', title: string } | null } };

export type GetAllUserTasksByUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetAllUserTasksByUserQuery = { __typename?: 'Query', getAllUserTasksByUser: Array<{ __typename?: 'UserTask', _id: string, archived?: boolean | null, completed: boolean, dueAt?: any | null, pastDue?: boolean | null, completedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, providerEmail?: string | null, task?: { __typename?: 'Task', _id: string, name?: string | null, type: TaskType, daysTillDue?: number | null, interval?: number | null } | null, answers?: Array<{ __typename?: 'UserAnswer', key: string, value?: any | null, type: AnswerType }> | null }> };

export type GetAlertsByPatientQueryVariables = Exact<{
  patientId: Scalars['String'];
}>;


export type GetAlertsByPatientQuery = { __typename?: 'Query', getAlertsByPatient: Array<{ __typename?: 'Alert', _id: string, title: string, description: string, severity: SeverityType, medical: boolean, acknowledgedAt?: any | null, notifiedAt?: any | null, createdAt?: any | null, user: { __typename?: 'User', _id: string, name: string, email: string }, task: { __typename?: 'Task', _id: string, type: TaskType } }> };

export type AcknowledgeAlertMutationVariables = Exact<{
  input: AcknowledgeAlertInput;
}>;


export type AcknowledgeAlertMutation = { __typename?: 'Mutation', acknowledgeAlert: { __typename?: 'Alert', _id: string, acknowledgedAt?: any | null } };

export type UserSendbirdChannelQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserSendbirdChannelQuery = { __typename?: 'Query', userSendbirdChannel: Array<{ __typename?: 'UserSendbirdChannel', channel_url: string }> };

export type UserTaskQueryQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type UserTaskQueryQuery = { __typename?: 'Query', userTask: { __typename?: 'UserTask', _id: string, task?: { __typename?: 'Task', _id: string, name?: string | null, type: TaskType } | null } };

export type ReverseGeoCodeAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type ReverseGeoCodeAddressQuery = { __typename?: 'Query', reverseGeoCode: Array<{ __typename?: 'GoogleReverseGeoCodeResult', formatted_address: string, geometry: { __typename?: 'GoogleReverseGeoCodeGeometryObject', location: { __typename?: 'LocationObject', lat: number, lng: number } } }> };

export type GetPharmacyLocationsQueryVariables = Exact<{
  input: PharmacyLocationInput;
}>;


export type GetPharmacyLocationsQuery = { __typename?: 'Query', pharmacyLocations: Array<{ __typename?: 'PharmacyLocationResult', id: number, name: string, lat?: number | null, lng?: number | null, address_line_1: string, address_line_2?: string | null, address_city: string, address_state: string, address_zipcode: string, primary_phone_number: string }> };

export type UploadLabDocumentMutationVariables = Exact<{
  file: Scalars['String'];
  fileName: Scalars['String'];
  patientId: Scalars['String'];
}>;


export type UploadLabDocumentMutation = { __typename?: 'Mutation', uploadDocument: { __typename?: 'AkuteDocument', id: string } };

export type GetProviderScheduleQueryVariables = Exact<{
  eaProviderId: Scalars['String'];
  timezone: Scalars['String'];
}>;


export type GetProviderScheduleQuery = { __typename?: 'Query', getProviderSchedule: { __typename?: 'ScheduleObject', schedule: { __typename?: 'Schedule', monday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, tuesday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, wednesday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, thursday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, friday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, saturday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> }, sunday: { __typename?: 'DailySchedule', start: string, end: string, breaks: Array<{ __typename?: 'ScheduleBreak', start: string, end: string }> } } } };

export type UpdateProviderScheduleMutationVariables = Exact<{
  eaProviderId: Scalars['String'];
  timezone: Scalars['String'];
  schedule: ScheduleInput;
}>;


export type UpdateProviderScheduleMutation = { __typename?: 'Mutation', updateProviderSchedule: { __typename?: 'UpdateScheduleMessage', message: string } };

export type NotificationUpdateMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type NotificationUpdateMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'MessageResponse', message: string } };

export type GenerateMetriportConnectUrlMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GenerateMetriportConnectUrlMutation = { __typename?: 'Mutation', generateMetriportConnectUrl: { __typename?: 'MetriportConnectResponse', url: string } };

export type SubscribeEmailMutationVariables = Exact<{
  input: SubscribeEmailInput;
}>;


export type SubscribeEmailMutation = { __typename?: 'Mutation', subscribeEmail: { __typename?: 'MessageResponse', message: string } };

export type CreateOrFindCheckoutMutationVariables = Exact<{
  input: CreateCheckoutInput;
}>;


export type CreateOrFindCheckoutMutation = { __typename?: 'Mutation', createOrFindCheckout: { __typename?: 'CheckoutResponse', message?: string | null, checkout: { __typename?: 'Checkout', _id: string } } };

export type GetSurveyQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSurveyQuery = { __typename?: 'Query', getSurvey: { __typename?: 'NPS', _id: string, score?: number | null } };

export type SubmitSurveyMutationVariables = Exact<{
  input: NpsInput;
}>;


export type SubmitSurveyMutation = { __typename?: 'Mutation', submitSurvey: { __typename?: 'NPS', _id: string } };

export type GetAddressSuggestionsQueryVariables = Exact<{
  query: AddressQuery;
}>;


export type GetAddressSuggestionsQuery = { __typename?: 'Query', addressSuggestions: Array<{ __typename?: 'AddressSuggestion', placeId?: string | null, address?: string | null }> };

export type GetAddressDetailsQueryVariables = Exact<{
  place_id: Scalars['String'];
}>;


export type GetAddressDetailsQuery = { __typename?: 'Query', addressDetail: { __typename?: 'Address', line1: string, line2?: string | null, country?: string | null, state: string, postalCode: string, city: string } };

export type GetSignupPartnerByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetSignupPartnerByTitleQuery = { __typename?: 'Query', getSignupPartnerByTitle: { __typename?: 'SingupPartnerResponse', partner: { __typename?: 'SignupPartner', _id: string, title: string, logoUrl?: string | null, flowType: FlowType }, partnerProviders?: Array<{ __typename?: 'SignupPartnerProvider', _id: string, title: string }> | null } };

export type UploadDocumentMutationVariables = Exact<{
  input: DocUploadInput;
}>;


export type UploadDocumentMutation = { __typename?: 'Mutation', uploadDocument: { __typename?: 'AkuteDocument', id: string } };

export type CompleteTaskMutationVariables = Exact<{
  input: CompleteUserTaskInput;
}>;


export type CompleteTaskMutation = { __typename?: 'Mutation', completeUserTask: { __typename?: 'UserTask', completed: boolean } };


export const ModifyProviderDocument = gql`
    mutation ModifyProvider($input: ProviderModifyInput!) {
  internalProviderModify(input: $input)
}
    `;
export type ModifyProviderMutationFn = Apollo.MutationFunction<ModifyProviderMutation, ModifyProviderMutationVariables>;

/**
 * __useModifyProviderMutation__
 *
 * To run a mutation, you first call `useModifyProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyProviderMutation, { data, loading, error }] = useModifyProviderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModifyProviderMutation(baseOptions?: Apollo.MutationHookOptions<ModifyProviderMutation, ModifyProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyProviderMutation, ModifyProviderMutationVariables>(ModifyProviderDocument, options);
      }
export type ModifyProviderMutationHookResult = ReturnType<typeof useModifyProviderMutation>;
export type ModifyProviderMutationResult = Apollo.MutationResult<ModifyProviderMutation>;
export type ModifyProviderMutationOptions = Apollo.BaseMutationOptions<ModifyProviderMutation, ModifyProviderMutationVariables>;
export const GetAllProvidersAdminDocument = gql`
    query GetAllProvidersAdmin {
  allProviders {
    providers {
      _id
      firstName
      lastName
      email
      numberOfPatients
    }
  }
}
    `;

/**
 * __useGetAllProvidersAdminQuery__
 *
 * To run a query within a React component, call `useGetAllProvidersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProvidersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProvidersAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProvidersAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProvidersAdminQuery, GetAllProvidersAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProvidersAdminQuery, GetAllProvidersAdminQueryVariables>(GetAllProvidersAdminDocument, options);
      }
export function useGetAllProvidersAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProvidersAdminQuery, GetAllProvidersAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProvidersAdminQuery, GetAllProvidersAdminQueryVariables>(GetAllProvidersAdminDocument, options);
        }
export type GetAllProvidersAdminQueryHookResult = ReturnType<typeof useGetAllProvidersAdminQuery>;
export type GetAllProvidersAdminLazyQueryHookResult = ReturnType<typeof useGetAllProvidersAdminLazyQuery>;
export type GetAllProvidersAdminQueryResult = Apollo.QueryResult<GetAllProvidersAdminQuery, GetAllProvidersAdminQueryVariables>;
export const CancelAppointmentDocument = gql`
    mutation CancelAppointment($input: GetAppointmentInput!) {
  cancelAppointment(input: $input) {
    message
  }
}
    `;
export type CancelAppointmentMutationFn = Apollo.MutationFunction<CancelAppointmentMutation, CancelAppointmentMutationVariables>;

/**
 * __useCancelAppointmentMutation__
 *
 * To run a mutation, you first call `useCancelAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelAppointmentMutation, { data, loading, error }] = useCancelAppointmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<CancelAppointmentMutation, CancelAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelAppointmentMutation, CancelAppointmentMutationVariables>(CancelAppointmentDocument, options);
      }
export type CancelAppointmentMutationHookResult = ReturnType<typeof useCancelAppointmentMutation>;
export type CancelAppointmentMutationResult = Apollo.MutationResult<CancelAppointmentMutation>;
export type CancelAppointmentMutationOptions = Apollo.BaseMutationOptions<CancelAppointmentMutation, CancelAppointmentMutationVariables>;
export const GetAppointmentsByMonthQueryDocument = gql`
    query GetAppointmentsByMonthQuery($input: GetAppointmentsByMonthInput!) {
  appointmentsByMonth(input: $input) {
    eaAppointmentId
    notes
    location
    start
    end
    eaCustomer {
      id
      name
      email
    }
    eaProvider {
      id
      name
      email
      type
    }
  }
}
    `;

/**
 * __useGetAppointmentsByMonthQueryQuery__
 *
 * To run a query within a React component, call `useGetAppointmentsByMonthQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentsByMonthQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentsByMonthQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppointmentsByMonthQueryQuery(baseOptions: Apollo.QueryHookOptions<GetAppointmentsByMonthQueryQuery, GetAppointmentsByMonthQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentsByMonthQueryQuery, GetAppointmentsByMonthQueryQueryVariables>(GetAppointmentsByMonthQueryDocument, options);
      }
export function useGetAppointmentsByMonthQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentsByMonthQueryQuery, GetAppointmentsByMonthQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentsByMonthQueryQuery, GetAppointmentsByMonthQueryQueryVariables>(GetAppointmentsByMonthQueryDocument, options);
        }
export type GetAppointmentsByMonthQueryQueryHookResult = ReturnType<typeof useGetAppointmentsByMonthQueryQuery>;
export type GetAppointmentsByMonthQueryLazyQueryHookResult = ReturnType<typeof useGetAppointmentsByMonthQueryLazyQuery>;
export type GetAppointmentsByMonthQueryQueryResult = Apollo.QueryResult<GetAppointmentsByMonthQueryQuery, GetAppointmentsByMonthQueryQueryVariables>;
export const CreateOrUpdateStripeSessionDocument = gql`
    mutation CreateOrUpdateStripeSession($input: CheckoutAddressInput!) {
  createOrUpdateStripeSession(input: $input) {
    checkout {
      _id
    }
  }
}
    `;
export type CreateOrUpdateStripeSessionMutationFn = Apollo.MutationFunction<CreateOrUpdateStripeSessionMutation, CreateOrUpdateStripeSessionMutationVariables>;

/**
 * __useCreateOrUpdateStripeSessionMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateStripeSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateStripeSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateStripeSessionMutation, { data, loading, error }] = useCreateOrUpdateStripeSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateStripeSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateStripeSessionMutation, CreateOrUpdateStripeSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateStripeSessionMutation, CreateOrUpdateStripeSessionMutationVariables>(CreateOrUpdateStripeSessionDocument, options);
      }
export type CreateOrUpdateStripeSessionMutationHookResult = ReturnType<typeof useCreateOrUpdateStripeSessionMutation>;
export type CreateOrUpdateStripeSessionMutationResult = Apollo.MutationResult<CreateOrUpdateStripeSessionMutation>;
export type CreateOrUpdateStripeSessionMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateStripeSessionMutation, CreateOrUpdateStripeSessionMutationVariables>;
export const CreateInsuredUserFromCheckoutDocument = gql`
    mutation createInsuredUserFromCheckout($input: CheckoutAddressInput!) {
  createInsuredUserFromCheckout(input: $input) {
    checkout {
      _id
    }
  }
}
    `;
export type CreateInsuredUserFromCheckoutMutationFn = Apollo.MutationFunction<CreateInsuredUserFromCheckoutMutation, CreateInsuredUserFromCheckoutMutationVariables>;

/**
 * __useCreateInsuredUserFromCheckoutMutation__
 *
 * To run a mutation, you first call `useCreateInsuredUserFromCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInsuredUserFromCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInsuredUserFromCheckoutMutation, { data, loading, error }] = useCreateInsuredUserFromCheckoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInsuredUserFromCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateInsuredUserFromCheckoutMutation, CreateInsuredUserFromCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInsuredUserFromCheckoutMutation, CreateInsuredUserFromCheckoutMutationVariables>(CreateInsuredUserFromCheckoutDocument, options);
      }
export type CreateInsuredUserFromCheckoutMutationHookResult = ReturnType<typeof useCreateInsuredUserFromCheckoutMutation>;
export type CreateInsuredUserFromCheckoutMutationResult = Apollo.MutationResult<CreateInsuredUserFromCheckoutMutation>;
export type CreateInsuredUserFromCheckoutMutationOptions = Apollo.BaseMutationOptions<CreateInsuredUserFromCheckoutMutation, CreateInsuredUserFromCheckoutMutationVariables>;
export const GetCheckoutStripeSecretOctaviaDocument = gql`
    query GetCheckoutStripeSecretOctavia($id: String!) {
  checkout(id: $id) {
    checkout {
      _id
      stripeClientSecret
    }
  }
}
    `;

/**
 * __useGetCheckoutStripeSecretOctaviaQuery__
 *
 * To run a query within a React component, call `useGetCheckoutStripeSecretOctaviaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckoutStripeSecretOctaviaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckoutStripeSecretOctaviaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCheckoutStripeSecretOctaviaQuery(baseOptions: Apollo.QueryHookOptions<GetCheckoutStripeSecretOctaviaQuery, GetCheckoutStripeSecretOctaviaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckoutStripeSecretOctaviaQuery, GetCheckoutStripeSecretOctaviaQueryVariables>(GetCheckoutStripeSecretOctaviaDocument, options);
      }
export function useGetCheckoutStripeSecretOctaviaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckoutStripeSecretOctaviaQuery, GetCheckoutStripeSecretOctaviaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckoutStripeSecretOctaviaQuery, GetCheckoutStripeSecretOctaviaQueryVariables>(GetCheckoutStripeSecretOctaviaDocument, options);
        }
export type GetCheckoutStripeSecretOctaviaQueryHookResult = ReturnType<typeof useGetCheckoutStripeSecretOctaviaQuery>;
export type GetCheckoutStripeSecretOctaviaLazyQueryHookResult = ReturnType<typeof useGetCheckoutStripeSecretOctaviaLazyQuery>;
export type GetCheckoutStripeSecretOctaviaQueryResult = Apollo.QueryResult<GetCheckoutStripeSecretOctaviaQuery, GetCheckoutStripeSecretOctaviaQueryVariables>;
export const RequestSignedUrlsDocument = gql`
    mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
  requestSignedUrls(requests: $requests) {
    url
    key
  }
}
    `;
export type RequestSignedUrlsMutationFn = Apollo.MutationFunction<RequestSignedUrlsMutation, RequestSignedUrlsMutationVariables>;

/**
 * __useRequestSignedUrlsMutation__
 *
 * To run a mutation, you first call `useRequestSignedUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestSignedUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestSignedUrlsMutation, { data, loading, error }] = useRequestSignedUrlsMutation({
 *   variables: {
 *      requests: // value for 'requests'
 *   },
 * });
 */
export function useRequestSignedUrlsMutation(baseOptions?: Apollo.MutationHookOptions<RequestSignedUrlsMutation, RequestSignedUrlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestSignedUrlsMutation, RequestSignedUrlsMutationVariables>(RequestSignedUrlsDocument, options);
      }
export type RequestSignedUrlsMutationHookResult = ReturnType<typeof useRequestSignedUrlsMutation>;
export type RequestSignedUrlsMutationResult = Apollo.MutationResult<RequestSignedUrlsMutation>;
export type RequestSignedUrlsMutationOptions = Apollo.BaseMutationOptions<RequestSignedUrlsMutation, RequestSignedUrlsMutationVariables>;
export const InsuranceTextractDocument = gql`
    mutation insuranceTextract($s3Key: String!) {
  insuranceTextract(s3Key: $s3Key) {
    insurance {
      type
      memberId
      groupId
    }
    words
    lines
  }
}
    `;
export type InsuranceTextractMutationFn = Apollo.MutationFunction<InsuranceTextractMutation, InsuranceTextractMutationVariables>;

/**
 * __useInsuranceTextractMutation__
 *
 * To run a mutation, you first call `useInsuranceTextractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsuranceTextractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insuranceTextractMutation, { data, loading, error }] = useInsuranceTextractMutation({
 *   variables: {
 *      s3Key: // value for 's3Key'
 *   },
 * });
 */
export function useInsuranceTextractMutation(baseOptions?: Apollo.MutationHookOptions<InsuranceTextractMutation, InsuranceTextractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsuranceTextractMutation, InsuranceTextractMutationVariables>(InsuranceTextractDocument, options);
      }
export type InsuranceTextractMutationHookResult = ReturnType<typeof useInsuranceTextractMutation>;
export type InsuranceTextractMutationResult = Apollo.MutationResult<InsuranceTextractMutation>;
export type InsuranceTextractMutationOptions = Apollo.BaseMutationOptions<InsuranceTextractMutation, InsuranceTextractMutationVariables>;
export const InsurancesDocument = gql`
    query insurances {
  insurances {
    _id
    name
  }
}
    `;

/**
 * __useInsurancesQuery__
 *
 * To run a query within a React component, call `useInsurancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInsurancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInsurancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInsurancesQuery(baseOptions?: Apollo.QueryHookOptions<InsurancesQuery, InsurancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InsurancesQuery, InsurancesQueryVariables>(InsurancesDocument, options);
      }
export function useInsurancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InsurancesQuery, InsurancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InsurancesQuery, InsurancesQueryVariables>(InsurancesDocument, options);
        }
export type InsurancesQueryHookResult = ReturnType<typeof useInsurancesQuery>;
export type InsurancesLazyQueryHookResult = ReturnType<typeof useInsurancesLazyQuery>;
export type InsurancesQueryResult = Apollo.QueryResult<InsurancesQuery, InsurancesQueryVariables>;
export const InsuranceCheckByCheckoutDocument = gql`
    mutation insuranceCheckByCheckout($input: InsuranceCheckByCheckoutInput!) {
  insuranceCheckByCheckout(input: $input) {
    status
    eligible
    errors
  }
}
    `;
export type InsuranceCheckByCheckoutMutationFn = Apollo.MutationFunction<InsuranceCheckByCheckoutMutation, InsuranceCheckByCheckoutMutationVariables>;

/**
 * __useInsuranceCheckByCheckoutMutation__
 *
 * To run a mutation, you first call `useInsuranceCheckByCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsuranceCheckByCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insuranceCheckByCheckoutMutation, { data, loading, error }] = useInsuranceCheckByCheckoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInsuranceCheckByCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<InsuranceCheckByCheckoutMutation, InsuranceCheckByCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsuranceCheckByCheckoutMutation, InsuranceCheckByCheckoutMutationVariables>(InsuranceCheckByCheckoutDocument, options);
      }
export type InsuranceCheckByCheckoutMutationHookResult = ReturnType<typeof useInsuranceCheckByCheckoutMutation>;
export type InsuranceCheckByCheckoutMutationResult = Apollo.MutationResult<InsuranceCheckByCheckoutMutation>;
export type InsuranceCheckByCheckoutMutationOptions = Apollo.BaseMutationOptions<InsuranceCheckByCheckoutMutation, InsuranceCheckByCheckoutMutationVariables>;
export const CompleteUploadFilesDocument = gql`
    mutation completeUploadFiles($files: [FileInput!]!) {
  completeUpload(files: $files) {
    _id
  }
}
    `;
export type CompleteUploadFilesMutationFn = Apollo.MutationFunction<CompleteUploadFilesMutation, CompleteUploadFilesMutationVariables>;

/**
 * __useCompleteUploadFilesMutation__
 *
 * To run a mutation, you first call `useCompleteUploadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteUploadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeUploadFilesMutation, { data, loading, error }] = useCompleteUploadFilesMutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useCompleteUploadFilesMutation(baseOptions?: Apollo.MutationHookOptions<CompleteUploadFilesMutation, CompleteUploadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteUploadFilesMutation, CompleteUploadFilesMutationVariables>(CompleteUploadFilesDocument, options);
      }
export type CompleteUploadFilesMutationHookResult = ReturnType<typeof useCompleteUploadFilesMutation>;
export type CompleteUploadFilesMutationResult = Apollo.MutationResult<CompleteUploadFilesMutation>;
export type CompleteUploadFilesMutationOptions = Apollo.BaseMutationOptions<CompleteUploadFilesMutation, CompleteUploadFilesMutationVariables>;
export const UpdateAppointmentMutationDocument = gql`
    mutation UpdateAppointmentMutation($input: UpdateAppointmentInput!) {
  updateAppointment(input: $input) {
    eaAppointmentId
  }
}
    `;
export type UpdateAppointmentMutationMutationFn = Apollo.MutationFunction<UpdateAppointmentMutationMutation, UpdateAppointmentMutationMutationVariables>;

/**
 * __useUpdateAppointmentMutationMutation__
 *
 * To run a mutation, you first call `useUpdateAppointmentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppointmentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppointmentMutationMutation, { data, loading, error }] = useUpdateAppointmentMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppointmentMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAppointmentMutationMutation, UpdateAppointmentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAppointmentMutationMutation, UpdateAppointmentMutationMutationVariables>(UpdateAppointmentMutationDocument, options);
      }
export type UpdateAppointmentMutationMutationHookResult = ReturnType<typeof useUpdateAppointmentMutationMutation>;
export type UpdateAppointmentMutationMutationResult = Apollo.MutationResult<UpdateAppointmentMutationMutation>;
export type UpdateAppointmentMutationMutationOptions = Apollo.BaseMutationOptions<UpdateAppointmentMutationMutation, UpdateAppointmentMutationMutationVariables>;
export const CreateAppointmentMutationDocument = gql`
    mutation CreateAppointmentMutation($input: CreateAppointmentInput!) {
  createAppointment(input: $input) {
    eaAppointmentId
  }
}
    `;
export type CreateAppointmentMutationMutationFn = Apollo.MutationFunction<CreateAppointmentMutationMutation, CreateAppointmentMutationMutationVariables>;

/**
 * __useCreateAppointmentMutationMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutationMutation, { data, loading, error }] = useCreateAppointmentMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppointmentMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppointmentMutationMutation, CreateAppointmentMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppointmentMutationMutation, CreateAppointmentMutationMutationVariables>(CreateAppointmentMutationDocument, options);
      }
export type CreateAppointmentMutationMutationHookResult = ReturnType<typeof useCreateAppointmentMutationMutation>;
export type CreateAppointmentMutationMutationResult = Apollo.MutationResult<CreateAppointmentMutationMutation>;
export type CreateAppointmentMutationMutationOptions = Apollo.BaseMutationOptions<CreateAppointmentMutationMutation, CreateAppointmentMutationMutationVariables>;
export const GetTimeslotsQueryDocument = gql`
    query GetTimeslotsQuery($input: GetTimeslotsInput!) {
  timeslots(input: $input) {
    selectedDate
    timezone
    total
    eaProvider {
      id
      name
      type
      email
    }
    eaCustomer {
      id
      name
      email
    }
    timeslots {
      start
      end
    }
  }
}
    `;

/**
 * __useGetTimeslotsQueryQuery__
 *
 * To run a query within a React component, call `useGetTimeslotsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimeslotsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimeslotsQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTimeslotsQueryQuery(baseOptions: Apollo.QueryHookOptions<GetTimeslotsQueryQuery, GetTimeslotsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimeslotsQueryQuery, GetTimeslotsQueryQueryVariables>(GetTimeslotsQueryDocument, options);
      }
export function useGetTimeslotsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimeslotsQueryQuery, GetTimeslotsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimeslotsQueryQuery, GetTimeslotsQueryQueryVariables>(GetTimeslotsQueryDocument, options);
        }
export type GetTimeslotsQueryQueryHookResult = ReturnType<typeof useGetTimeslotsQueryQuery>;
export type GetTimeslotsQueryLazyQueryHookResult = ReturnType<typeof useGetTimeslotsQueryLazyQuery>;
export type GetTimeslotsQueryQueryResult = Apollo.QueryResult<GetTimeslotsQueryQuery, GetTimeslotsQueryQueryVariables>;
export const UpcomingAppointmentsQueryDocument = gql`
    query UpcomingAppointmentsQuery($input: UpcomingAppointmentsInput!) {
  upcomingAppointments(input: $input) {
    eaAppointmentId
    start
    end
    eaProvider {
      id
      name
      email
      type
    }
    eaCustomer {
      id
      name
    }
  }
}
    `;

/**
 * __useUpcomingAppointmentsQueryQuery__
 *
 * To run a query within a React component, call `useUpcomingAppointmentsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingAppointmentsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingAppointmentsQueryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpcomingAppointmentsQueryQuery(baseOptions: Apollo.QueryHookOptions<UpcomingAppointmentsQueryQuery, UpcomingAppointmentsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpcomingAppointmentsQueryQuery, UpcomingAppointmentsQueryQueryVariables>(UpcomingAppointmentsQueryDocument, options);
      }
export function useUpcomingAppointmentsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpcomingAppointmentsQueryQuery, UpcomingAppointmentsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpcomingAppointmentsQueryQuery, UpcomingAppointmentsQueryQueryVariables>(UpcomingAppointmentsQueryDocument, options);
        }
export type UpcomingAppointmentsQueryQueryHookResult = ReturnType<typeof useUpcomingAppointmentsQueryQuery>;
export type UpcomingAppointmentsQueryLazyQueryHookResult = ReturnType<typeof useUpcomingAppointmentsQueryLazyQuery>;
export type UpcomingAppointmentsQueryQueryResult = Apollo.QueryResult<UpcomingAppointmentsQueryQuery, UpcomingAppointmentsQueryQueryVariables>;
export const UserTasksQueryDocument = gql`
    query UserTasksQuery($limit: Float, $offset: Float, $completed: Boolean) {
  userTasks(input: {limit: $limit, offset: $offset, completed: $completed}) {
    total
    userTasks {
      _id
      task {
        _id
        name
        type
        highPriority
      }
      dueAt
      pastDue
      createdAt
    }
  }
}
    `;

/**
 * __useUserTasksQueryQuery__
 *
 * To run a query within a React component, call `useUserTasksQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTasksQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTasksQueryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useUserTasksQueryQuery(baseOptions?: Apollo.QueryHookOptions<UserTasksQueryQuery, UserTasksQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTasksQueryQuery, UserTasksQueryQueryVariables>(UserTasksQueryDocument, options);
      }
export function useUserTasksQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTasksQueryQuery, UserTasksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTasksQueryQuery, UserTasksQueryQueryVariables>(UserTasksQueryDocument, options);
        }
export type UserTasksQueryQueryHookResult = ReturnType<typeof useUserTasksQueryQuery>;
export type UserTasksQueryLazyQueryHookResult = ReturnType<typeof useUserTasksQueryLazyQuery>;
export type UserTasksQueryQueryResult = Apollo.QueryResult<UserTasksQueryQuery, UserTasksQueryQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    weights {
      value
      date
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUserCompletedAppointmentTasksInMonthDocument = gql`
    query GetUserCompletedAppointmentTasksInMonth {
  userScheduleAppointmentTask {
    daysLeft
    task {
      completed
      completedAt
    }
    completedRequiredTasks
  }
}
    `;

/**
 * __useGetUserCompletedAppointmentTasksInMonthQuery__
 *
 * To run a query within a React component, call `useGetUserCompletedAppointmentTasksInMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCompletedAppointmentTasksInMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCompletedAppointmentTasksInMonthQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCompletedAppointmentTasksInMonthQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCompletedAppointmentTasksInMonthQuery, GetUserCompletedAppointmentTasksInMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCompletedAppointmentTasksInMonthQuery, GetUserCompletedAppointmentTasksInMonthQueryVariables>(GetUserCompletedAppointmentTasksInMonthDocument, options);
      }
export function useGetUserCompletedAppointmentTasksInMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCompletedAppointmentTasksInMonthQuery, GetUserCompletedAppointmentTasksInMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCompletedAppointmentTasksInMonthQuery, GetUserCompletedAppointmentTasksInMonthQueryVariables>(GetUserCompletedAppointmentTasksInMonthDocument, options);
        }
export type GetUserCompletedAppointmentTasksInMonthQueryHookResult = ReturnType<typeof useGetUserCompletedAppointmentTasksInMonthQuery>;
export type GetUserCompletedAppointmentTasksInMonthLazyQueryHookResult = ReturnType<typeof useGetUserCompletedAppointmentTasksInMonthLazyQuery>;
export type GetUserCompletedAppointmentTasksInMonthQueryResult = Apollo.QueryResult<GetUserCompletedAppointmentTasksInMonthQuery, GetUserCompletedAppointmentTasksInMonthQueryVariables>;
export const GetAlertsDocument = gql`
    query getAlerts {
  getAlerts {
    _id
    title
    description
    severity
    medical
    acknowledgedAt
    user {
      _id
      name
      email
    }
  }
}
    `;

/**
 * __useGetAlertsQuery__
 *
 * To run a query within a React component, call `useGetAlertsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlertsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlertsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAlertsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlertsQuery, GetAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlertsQuery, GetAlertsQueryVariables>(GetAlertsDocument, options);
      }
export function useGetAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlertsQuery, GetAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlertsQuery, GetAlertsQueryVariables>(GetAlertsDocument, options);
        }
export type GetAlertsQueryHookResult = ReturnType<typeof useGetAlertsQuery>;
export type GetAlertsLazyQueryHookResult = ReturnType<typeof useGetAlertsLazyQuery>;
export type GetAlertsQueryResult = Apollo.QueryResult<GetAlertsQuery, GetAlertsQueryVariables>;
export const ModifyPatientDocument = gql`
    mutation ModifyPatient($input: PatientModifyInput!) {
  internalPatientModify(input: $input)
}
    `;
export type ModifyPatientMutationFn = Apollo.MutationFunction<ModifyPatientMutation, ModifyPatientMutationVariables>;

/**
 * __useModifyPatientMutation__
 *
 * To run a mutation, you first call `useModifyPatientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyPatientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyPatientMutation, { data, loading, error }] = useModifyPatientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModifyPatientMutation(baseOptions?: Apollo.MutationHookOptions<ModifyPatientMutation, ModifyPatientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyPatientMutation, ModifyPatientMutationVariables>(ModifyPatientDocument, options);
      }
export type ModifyPatientMutationHookResult = ReturnType<typeof useModifyPatientMutation>;
export type ModifyPatientMutationResult = Apollo.MutationResult<ModifyPatientMutation>;
export type ModifyPatientMutationOptions = Apollo.BaseMutationOptions<ModifyPatientMutation, ModifyPatientMutationVariables>;
export const GetUserSummaryDocument = gql`
    query GetUserSummary($userId: String!) {
  generateSummary(userId: $userId) {
    generatedSummary
  }
}
    `;

/**
 * __useGetUserSummaryQuery__
 *
 * To run a query within a React component, call `useGetUserSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSummaryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetUserSummaryQuery, GetUserSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSummaryQuery, GetUserSummaryQueryVariables>(GetUserSummaryDocument, options);
      }
export function useGetUserSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserSummaryQuery, GetUserSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSummaryQuery, GetUserSummaryQueryVariables>(GetUserSummaryDocument, options);
        }
export type GetUserSummaryQueryHookResult = ReturnType<typeof useGetUserSummaryQuery>;
export type GetUserSummaryLazyQueryHookResult = ReturnType<typeof useGetUserSummaryLazyQuery>;
export type GetUserSummaryQueryResult = Apollo.QueryResult<GetUserSummaryQuery, GetUserSummaryQueryVariables>;
export const GetAllProvidersDocument = gql`
    query GetAllProviders($state: String) {
  allProviders(state: $state) {
    providers {
      _id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetAllProvidersQuery__
 *
 * To run a query within a React component, call `useGetAllProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProvidersQuery({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function useGetAllProvidersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProvidersQuery, GetAllProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProvidersQuery, GetAllProvidersQueryVariables>(GetAllProvidersDocument, options);
      }
export function useGetAllProvidersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProvidersQuery, GetAllProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProvidersQuery, GetAllProvidersQueryVariables>(GetAllProvidersDocument, options);
        }
export type GetAllProvidersQueryHookResult = ReturnType<typeof useGetAllProvidersQuery>;
export type GetAllProvidersLazyQueryHookResult = ReturnType<typeof useGetAllProvidersLazyQuery>;
export type GetAllProvidersQueryResult = Apollo.QueryResult<GetAllProvidersQuery, GetAllProvidersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUserById(userId: $userId) {
    _id
    textOptIn
    meetingRoomUrl
    generatedSummary
    name
    email
    phone
    role
    provider {
      _id
      firstName
      lastName
    }
    dateOfBirth
    address {
      line1
      line2
      city
      state
      postalCode
      country
    }
    weights {
      value
      date
    }
    gender
    heightInInches
    akutePatientId
    stripeCustomerId
    stripeSubscriptionId
    eaCustomerId
    eaHealthCoachId
    subscriptionExpiresAt
    pharmacyLocation
    meetingUrl
    labOrderSent
    bmi
    classifications {
      classification
      calculatedPercentile
      percentile
      date
    }
    files {
      key
      signedUrl
      contentType
      metadata {
        key
        value
      }
    }
    signupPartner {
      title
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetAllUserTasksByUserDocument = gql`
    query GetAllUserTasksByUser($userId: String!) {
  getAllUserTasksByUser(userId: $userId) {
    _id
    task {
      _id
      name
      type
      daysTillDue
      interval
    }
    archived
    completed
    dueAt
    pastDue
    completedAt
    createdAt
    updatedAt
    providerEmail
    answers {
      key
      value
      type
    }
  }
}
    `;

/**
 * __useGetAllUserTasksByUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserTasksByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserTasksByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserTasksByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllUserTasksByUserQuery(baseOptions: Apollo.QueryHookOptions<GetAllUserTasksByUserQuery, GetAllUserTasksByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserTasksByUserQuery, GetAllUserTasksByUserQueryVariables>(GetAllUserTasksByUserDocument, options);
      }
export function useGetAllUserTasksByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserTasksByUserQuery, GetAllUserTasksByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserTasksByUserQuery, GetAllUserTasksByUserQueryVariables>(GetAllUserTasksByUserDocument, options);
        }
export type GetAllUserTasksByUserQueryHookResult = ReturnType<typeof useGetAllUserTasksByUserQuery>;
export type GetAllUserTasksByUserLazyQueryHookResult = ReturnType<typeof useGetAllUserTasksByUserLazyQuery>;
export type GetAllUserTasksByUserQueryResult = Apollo.QueryResult<GetAllUserTasksByUserQuery, GetAllUserTasksByUserQueryVariables>;
export const GetAlertsByPatientDocument = gql`
    query getAlertsByPatient($patientId: String!) {
  getAlertsByPatient(patientId: $patientId) {
    _id
    title
    description
    severity
    medical
    acknowledgedAt
    notifiedAt
    createdAt
    user {
      _id
      name
      email
    }
    task {
      _id
      type
    }
  }
}
    `;

/**
 * __useGetAlertsByPatientQuery__
 *
 * To run a query within a React component, call `useGetAlertsByPatientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlertsByPatientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlertsByPatientQuery({
 *   variables: {
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useGetAlertsByPatientQuery(baseOptions: Apollo.QueryHookOptions<GetAlertsByPatientQuery, GetAlertsByPatientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlertsByPatientQuery, GetAlertsByPatientQueryVariables>(GetAlertsByPatientDocument, options);
      }
export function useGetAlertsByPatientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlertsByPatientQuery, GetAlertsByPatientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlertsByPatientQuery, GetAlertsByPatientQueryVariables>(GetAlertsByPatientDocument, options);
        }
export type GetAlertsByPatientQueryHookResult = ReturnType<typeof useGetAlertsByPatientQuery>;
export type GetAlertsByPatientLazyQueryHookResult = ReturnType<typeof useGetAlertsByPatientLazyQuery>;
export type GetAlertsByPatientQueryResult = Apollo.QueryResult<GetAlertsByPatientQuery, GetAlertsByPatientQueryVariables>;
export const AcknowledgeAlertDocument = gql`
    mutation acknowledgeAlert($input: AcknowledgeAlertInput!) {
  acknowledgeAlert(input: $input) {
    _id
    acknowledgedAt
  }
}
    `;
export type AcknowledgeAlertMutationFn = Apollo.MutationFunction<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>;

/**
 * __useAcknowledgeAlertMutation__
 *
 * To run a mutation, you first call `useAcknowledgeAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcknowledgeAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acknowledgeAlertMutation, { data, loading, error }] = useAcknowledgeAlertMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcknowledgeAlertMutation(baseOptions?: Apollo.MutationHookOptions<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>(AcknowledgeAlertDocument, options);
      }
export type AcknowledgeAlertMutationHookResult = ReturnType<typeof useAcknowledgeAlertMutation>;
export type AcknowledgeAlertMutationResult = Apollo.MutationResult<AcknowledgeAlertMutation>;
export type AcknowledgeAlertMutationOptions = Apollo.BaseMutationOptions<AcknowledgeAlertMutation, AcknowledgeAlertMutationVariables>;
export const UserSendbirdChannelDocument = gql`
    query UserSendbirdChannel($userId: String!) {
  userSendbirdChannel(userId: $userId) {
    channel_url
  }
}
    `;

/**
 * __useUserSendbirdChannelQuery__
 *
 * To run a query within a React component, call `useUserSendbirdChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSendbirdChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSendbirdChannelQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserSendbirdChannelQuery(baseOptions: Apollo.QueryHookOptions<UserSendbirdChannelQuery, UserSendbirdChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSendbirdChannelQuery, UserSendbirdChannelQueryVariables>(UserSendbirdChannelDocument, options);
      }
export function useUserSendbirdChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSendbirdChannelQuery, UserSendbirdChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSendbirdChannelQuery, UserSendbirdChannelQueryVariables>(UserSendbirdChannelDocument, options);
        }
export type UserSendbirdChannelQueryHookResult = ReturnType<typeof useUserSendbirdChannelQuery>;
export type UserSendbirdChannelLazyQueryHookResult = ReturnType<typeof useUserSendbirdChannelLazyQuery>;
export type UserSendbirdChannelQueryResult = Apollo.QueryResult<UserSendbirdChannelQuery, UserSendbirdChannelQueryVariables>;
export const UserTaskQueryDocument = gql`
    query UserTaskQuery($taskId: String!) {
  userTask(id: $taskId) {
    _id
    task {
      _id
      name
      type
    }
  }
}
    `;

/**
 * __useUserTaskQueryQuery__
 *
 * To run a query within a React component, call `useUserTaskQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTaskQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTaskQueryQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useUserTaskQueryQuery(baseOptions: Apollo.QueryHookOptions<UserTaskQueryQuery, UserTaskQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTaskQueryQuery, UserTaskQueryQueryVariables>(UserTaskQueryDocument, options);
      }
export function useUserTaskQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTaskQueryQuery, UserTaskQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTaskQueryQuery, UserTaskQueryQueryVariables>(UserTaskQueryDocument, options);
        }
export type UserTaskQueryQueryHookResult = ReturnType<typeof useUserTaskQueryQuery>;
export type UserTaskQueryLazyQueryHookResult = ReturnType<typeof useUserTaskQueryLazyQuery>;
export type UserTaskQueryQueryResult = Apollo.QueryResult<UserTaskQueryQuery, UserTaskQueryQueryVariables>;
export const ReverseGeoCodeAddressDocument = gql`
    query reverseGeoCodeAddress {
  reverseGeoCode {
    formatted_address
    geometry {
      location {
        lat
        lng
      }
    }
  }
}
    `;

/**
 * __useReverseGeoCodeAddressQuery__
 *
 * To run a query within a React component, call `useReverseGeoCodeAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useReverseGeoCodeAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReverseGeoCodeAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useReverseGeoCodeAddressQuery(baseOptions?: Apollo.QueryHookOptions<ReverseGeoCodeAddressQuery, ReverseGeoCodeAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReverseGeoCodeAddressQuery, ReverseGeoCodeAddressQueryVariables>(ReverseGeoCodeAddressDocument, options);
      }
export function useReverseGeoCodeAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReverseGeoCodeAddressQuery, ReverseGeoCodeAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReverseGeoCodeAddressQuery, ReverseGeoCodeAddressQueryVariables>(ReverseGeoCodeAddressDocument, options);
        }
export type ReverseGeoCodeAddressQueryHookResult = ReturnType<typeof useReverseGeoCodeAddressQuery>;
export type ReverseGeoCodeAddressLazyQueryHookResult = ReturnType<typeof useReverseGeoCodeAddressLazyQuery>;
export type ReverseGeoCodeAddressQueryResult = Apollo.QueryResult<ReverseGeoCodeAddressQuery, ReverseGeoCodeAddressQueryVariables>;
export const GetPharmacyLocationsDocument = gql`
    query getPharmacyLocations($input: PharmacyLocationInput!) {
  pharmacyLocations(input: $input) {
    id
    name
    lat
    lng
    address_line_1
    address_line_2
    address_city
    address_state
    address_zipcode
    primary_phone_number
  }
}
    `;

/**
 * __useGetPharmacyLocationsQuery__
 *
 * To run a query within a React component, call `useGetPharmacyLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPharmacyLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPharmacyLocationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPharmacyLocationsQuery(baseOptions: Apollo.QueryHookOptions<GetPharmacyLocationsQuery, GetPharmacyLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPharmacyLocationsQuery, GetPharmacyLocationsQueryVariables>(GetPharmacyLocationsDocument, options);
      }
export function useGetPharmacyLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPharmacyLocationsQuery, GetPharmacyLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPharmacyLocationsQuery, GetPharmacyLocationsQueryVariables>(GetPharmacyLocationsDocument, options);
        }
export type GetPharmacyLocationsQueryHookResult = ReturnType<typeof useGetPharmacyLocationsQuery>;
export type GetPharmacyLocationsLazyQueryHookResult = ReturnType<typeof useGetPharmacyLocationsLazyQuery>;
export type GetPharmacyLocationsQueryResult = Apollo.QueryResult<GetPharmacyLocationsQuery, GetPharmacyLocationsQueryVariables>;
export const UploadLabDocumentDocument = gql`
    mutation UploadLabDocument($file: String!, $fileName: String!, $patientId: String!) {
  uploadDocument(
    input: {file: $file, fileName: $fileName, description: "User lab order uploaded during medical questionnaire.", patientId: $patientId, tags: []}
  ) {
    id
  }
}
    `;
export type UploadLabDocumentMutationFn = Apollo.MutationFunction<UploadLabDocumentMutation, UploadLabDocumentMutationVariables>;

/**
 * __useUploadLabDocumentMutation__
 *
 * To run a mutation, you first call `useUploadLabDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadLabDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadLabDocumentMutation, { data, loading, error }] = useUploadLabDocumentMutation({
 *   variables: {
 *      file: // value for 'file'
 *      fileName: // value for 'fileName'
 *      patientId: // value for 'patientId'
 *   },
 * });
 */
export function useUploadLabDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UploadLabDocumentMutation, UploadLabDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadLabDocumentMutation, UploadLabDocumentMutationVariables>(UploadLabDocumentDocument, options);
      }
export type UploadLabDocumentMutationHookResult = ReturnType<typeof useUploadLabDocumentMutation>;
export type UploadLabDocumentMutationResult = Apollo.MutationResult<UploadLabDocumentMutation>;
export type UploadLabDocumentMutationOptions = Apollo.BaseMutationOptions<UploadLabDocumentMutation, UploadLabDocumentMutationVariables>;
export const GetProviderScheduleDocument = gql`
    query getProviderSchedule($eaProviderId: String!, $timezone: String!) {
  getProviderSchedule(eaProviderId: $eaProviderId, timezone: $timezone) {
    schedule {
      monday {
        start
        end
        breaks {
          start
          end
        }
      }
      tuesday {
        start
        end
        breaks {
          start
          end
        }
      }
      wednesday {
        start
        end
        breaks {
          start
          end
        }
      }
      thursday {
        start
        end
        breaks {
          start
          end
        }
      }
      friday {
        start
        end
        breaks {
          start
          end
        }
      }
      saturday {
        start
        end
        breaks {
          start
          end
        }
      }
      sunday {
        start
        end
        breaks {
          start
          end
        }
      }
    }
  }
}
    `;

/**
 * __useGetProviderScheduleQuery__
 *
 * To run a query within a React component, call `useGetProviderScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProviderScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProviderScheduleQuery({
 *   variables: {
 *      eaProviderId: // value for 'eaProviderId'
 *      timezone: // value for 'timezone'
 *   },
 * });
 */
export function useGetProviderScheduleQuery(baseOptions: Apollo.QueryHookOptions<GetProviderScheduleQuery, GetProviderScheduleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProviderScheduleQuery, GetProviderScheduleQueryVariables>(GetProviderScheduleDocument, options);
      }
export function useGetProviderScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProviderScheduleQuery, GetProviderScheduleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProviderScheduleQuery, GetProviderScheduleQueryVariables>(GetProviderScheduleDocument, options);
        }
export type GetProviderScheduleQueryHookResult = ReturnType<typeof useGetProviderScheduleQuery>;
export type GetProviderScheduleLazyQueryHookResult = ReturnType<typeof useGetProviderScheduleLazyQuery>;
export type GetProviderScheduleQueryResult = Apollo.QueryResult<GetProviderScheduleQuery, GetProviderScheduleQueryVariables>;
export const UpdateProviderScheduleDocument = gql`
    mutation updateProviderSchedule($eaProviderId: String!, $timezone: String!, $schedule: ScheduleInput!) {
  updateProviderSchedule(
    eaProviderId: $eaProviderId
    timezone: $timezone
    schedule: $schedule
  ) {
    message
  }
}
    `;
export type UpdateProviderScheduleMutationFn = Apollo.MutationFunction<UpdateProviderScheduleMutation, UpdateProviderScheduleMutationVariables>;

/**
 * __useUpdateProviderScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateProviderScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProviderScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProviderScheduleMutation, { data, loading, error }] = useUpdateProviderScheduleMutation({
 *   variables: {
 *      eaProviderId: // value for 'eaProviderId'
 *      timezone: // value for 'timezone'
 *      schedule: // value for 'schedule'
 *   },
 * });
 */
export function useUpdateProviderScheduleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProviderScheduleMutation, UpdateProviderScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProviderScheduleMutation, UpdateProviderScheduleMutationVariables>(UpdateProviderScheduleDocument, options);
      }
export type UpdateProviderScheduleMutationHookResult = ReturnType<typeof useUpdateProviderScheduleMutation>;
export type UpdateProviderScheduleMutationResult = Apollo.MutationResult<UpdateProviderScheduleMutation>;
export type UpdateProviderScheduleMutationOptions = Apollo.BaseMutationOptions<UpdateProviderScheduleMutation, UpdateProviderScheduleMutationVariables>;
export const NotificationUpdateDocument = gql`
    mutation NotificationUpdate($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    message
  }
}
    `;
export type NotificationUpdateMutationFn = Apollo.MutationFunction<NotificationUpdateMutation, NotificationUpdateMutationVariables>;

/**
 * __useNotificationUpdateMutation__
 *
 * To run a mutation, you first call `useNotificationUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationUpdateMutation, { data, loading, error }] = useNotificationUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotificationUpdateMutation(baseOptions?: Apollo.MutationHookOptions<NotificationUpdateMutation, NotificationUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationUpdateMutation, NotificationUpdateMutationVariables>(NotificationUpdateDocument, options);
      }
export type NotificationUpdateMutationHookResult = ReturnType<typeof useNotificationUpdateMutation>;
export type NotificationUpdateMutationResult = Apollo.MutationResult<NotificationUpdateMutation>;
export type NotificationUpdateMutationOptions = Apollo.BaseMutationOptions<NotificationUpdateMutation, NotificationUpdateMutationVariables>;
export const GenerateMetriportConnectUrlDocument = gql`
    mutation GenerateMetriportConnectUrl($userId: String!) {
  generateMetriportConnectUrl(userId: $userId) {
    url
  }
}
    `;
export type GenerateMetriportConnectUrlMutationFn = Apollo.MutationFunction<GenerateMetriportConnectUrlMutation, GenerateMetriportConnectUrlMutationVariables>;

/**
 * __useGenerateMetriportConnectUrlMutation__
 *
 * To run a mutation, you first call `useGenerateMetriportConnectUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateMetriportConnectUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateMetriportConnectUrlMutation, { data, loading, error }] = useGenerateMetriportConnectUrlMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGenerateMetriportConnectUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateMetriportConnectUrlMutation, GenerateMetriportConnectUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateMetriportConnectUrlMutation, GenerateMetriportConnectUrlMutationVariables>(GenerateMetriportConnectUrlDocument, options);
      }
export type GenerateMetriportConnectUrlMutationHookResult = ReturnType<typeof useGenerateMetriportConnectUrlMutation>;
export type GenerateMetriportConnectUrlMutationResult = Apollo.MutationResult<GenerateMetriportConnectUrlMutation>;
export type GenerateMetriportConnectUrlMutationOptions = Apollo.BaseMutationOptions<GenerateMetriportConnectUrlMutation, GenerateMetriportConnectUrlMutationVariables>;
export const SubscribeEmailDocument = gql`
    mutation SubscribeEmail($input: SubscribeEmailInput!) {
  subscribeEmail(input: $input) {
    message
  }
}
    `;
export type SubscribeEmailMutationFn = Apollo.MutationFunction<SubscribeEmailMutation, SubscribeEmailMutationVariables>;

/**
 * __useSubscribeEmailMutation__
 *
 * To run a mutation, you first call `useSubscribeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeEmailMutation, { data, loading, error }] = useSubscribeEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubscribeEmailMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeEmailMutation, SubscribeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeEmailMutation, SubscribeEmailMutationVariables>(SubscribeEmailDocument, options);
      }
export type SubscribeEmailMutationHookResult = ReturnType<typeof useSubscribeEmailMutation>;
export type SubscribeEmailMutationResult = Apollo.MutationResult<SubscribeEmailMutation>;
export type SubscribeEmailMutationOptions = Apollo.BaseMutationOptions<SubscribeEmailMutation, SubscribeEmailMutationVariables>;
export const CreateOrFindCheckoutDocument = gql`
    mutation CreateOrFindCheckout($input: CreateCheckoutInput!) {
  createOrFindCheckout(input: $input) {
    message
    checkout {
      _id
    }
  }
}
    `;
export type CreateOrFindCheckoutMutationFn = Apollo.MutationFunction<CreateOrFindCheckoutMutation, CreateOrFindCheckoutMutationVariables>;

/**
 * __useCreateOrFindCheckoutMutation__
 *
 * To run a mutation, you first call `useCreateOrFindCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrFindCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrFindCheckoutMutation, { data, loading, error }] = useCreateOrFindCheckoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrFindCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrFindCheckoutMutation, CreateOrFindCheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrFindCheckoutMutation, CreateOrFindCheckoutMutationVariables>(CreateOrFindCheckoutDocument, options);
      }
export type CreateOrFindCheckoutMutationHookResult = ReturnType<typeof useCreateOrFindCheckoutMutation>;
export type CreateOrFindCheckoutMutationResult = Apollo.MutationResult<CreateOrFindCheckoutMutation>;
export type CreateOrFindCheckoutMutationOptions = Apollo.BaseMutationOptions<CreateOrFindCheckoutMutation, CreateOrFindCheckoutMutationVariables>;
export const GetSurveyDocument = gql`
    query getSurvey($id: String!) {
  getSurvey(id: $id) {
    _id
    score
  }
}
    `;

/**
 * __useGetSurveyQuery__
 *
 * To run a query within a React component, call `useGetSurveyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSurveyQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyQuery, GetSurveyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyQuery, GetSurveyQueryVariables>(GetSurveyDocument, options);
      }
export function useGetSurveyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyQuery, GetSurveyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyQuery, GetSurveyQueryVariables>(GetSurveyDocument, options);
        }
export type GetSurveyQueryHookResult = ReturnType<typeof useGetSurveyQuery>;
export type GetSurveyLazyQueryHookResult = ReturnType<typeof useGetSurveyLazyQuery>;
export type GetSurveyQueryResult = Apollo.QueryResult<GetSurveyQuery, GetSurveyQueryVariables>;
export const SubmitSurveyDocument = gql`
    mutation SubmitSurvey($input: NPSInput!) {
  submitSurvey(input: $input) {
    _id
  }
}
    `;
export type SubmitSurveyMutationFn = Apollo.MutationFunction<SubmitSurveyMutation, SubmitSurveyMutationVariables>;

/**
 * __useSubmitSurveyMutation__
 *
 * To run a mutation, you first call `useSubmitSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSurveyMutation, { data, loading, error }] = useSubmitSurveyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitSurveyMutation(baseOptions?: Apollo.MutationHookOptions<SubmitSurveyMutation, SubmitSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitSurveyMutation, SubmitSurveyMutationVariables>(SubmitSurveyDocument, options);
      }
export type SubmitSurveyMutationHookResult = ReturnType<typeof useSubmitSurveyMutation>;
export type SubmitSurveyMutationResult = Apollo.MutationResult<SubmitSurveyMutation>;
export type SubmitSurveyMutationOptions = Apollo.BaseMutationOptions<SubmitSurveyMutation, SubmitSurveyMutationVariables>;
export const GetAddressSuggestionsDocument = gql`
    query GetAddressSuggestions($query: AddressQuery!) {
  addressSuggestions(query: $query) {
    placeId
    address
  }
}
    `;

/**
 * __useGetAddressSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetAddressSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressSuggestionsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetAddressSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<GetAddressSuggestionsQuery, GetAddressSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddressSuggestionsQuery, GetAddressSuggestionsQueryVariables>(GetAddressSuggestionsDocument, options);
      }
export function useGetAddressSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressSuggestionsQuery, GetAddressSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddressSuggestionsQuery, GetAddressSuggestionsQueryVariables>(GetAddressSuggestionsDocument, options);
        }
export type GetAddressSuggestionsQueryHookResult = ReturnType<typeof useGetAddressSuggestionsQuery>;
export type GetAddressSuggestionsLazyQueryHookResult = ReturnType<typeof useGetAddressSuggestionsLazyQuery>;
export type GetAddressSuggestionsQueryResult = Apollo.QueryResult<GetAddressSuggestionsQuery, GetAddressSuggestionsQueryVariables>;
export const GetAddressDetailsDocument = gql`
    query GetAddressDetails($place_id: String!) {
  addressDetail(placeId: $place_id) {
    line1
    line2
    country
    state
    postalCode
    city
  }
}
    `;

/**
 * __useGetAddressDetailsQuery__
 *
 * To run a query within a React component, call `useGetAddressDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressDetailsQuery({
 *   variables: {
 *      place_id: // value for 'place_id'
 *   },
 * });
 */
export function useGetAddressDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>(GetAddressDetailsDocument, options);
      }
export function useGetAddressDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>(GetAddressDetailsDocument, options);
        }
export type GetAddressDetailsQueryHookResult = ReturnType<typeof useGetAddressDetailsQuery>;
export type GetAddressDetailsLazyQueryHookResult = ReturnType<typeof useGetAddressDetailsLazyQuery>;
export type GetAddressDetailsQueryResult = Apollo.QueryResult<GetAddressDetailsQuery, GetAddressDetailsQueryVariables>;
export const GetSignupPartnerByTitleDocument = gql`
    query getSignupPartnerByTitle($title: String!) {
  getSignupPartnerByTitle(title: $title) {
    partner {
      _id
      title
      logoUrl
      flowType
    }
    partnerProviders {
      _id
      title
    }
  }
}
    `;

/**
 * __useGetSignupPartnerByTitleQuery__
 *
 * To run a query within a React component, call `useGetSignupPartnerByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSignupPartnerByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSignupPartnerByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetSignupPartnerByTitleQuery(baseOptions: Apollo.QueryHookOptions<GetSignupPartnerByTitleQuery, GetSignupPartnerByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSignupPartnerByTitleQuery, GetSignupPartnerByTitleQueryVariables>(GetSignupPartnerByTitleDocument, options);
      }
export function useGetSignupPartnerByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSignupPartnerByTitleQuery, GetSignupPartnerByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSignupPartnerByTitleQuery, GetSignupPartnerByTitleQueryVariables>(GetSignupPartnerByTitleDocument, options);
        }
export type GetSignupPartnerByTitleQueryHookResult = ReturnType<typeof useGetSignupPartnerByTitleQuery>;
export type GetSignupPartnerByTitleLazyQueryHookResult = ReturnType<typeof useGetSignupPartnerByTitleLazyQuery>;
export type GetSignupPartnerByTitleQueryResult = Apollo.QueryResult<GetSignupPartnerByTitleQuery, GetSignupPartnerByTitleQueryVariables>;
export const UploadDocumentDocument = gql`
    mutation UploadDocument($input: DocUploadInput!) {
  uploadDocument(input: $input) {
    id
  }
}
    `;
export type UploadDocumentMutationFn = Apollo.MutationFunction<UploadDocumentMutation, UploadDocumentMutationVariables>;

/**
 * __useUploadDocumentMutation__
 *
 * To run a mutation, you first call `useUploadDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadDocumentMutation, { data, loading, error }] = useUploadDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UploadDocumentMutation, UploadDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadDocumentMutation, UploadDocumentMutationVariables>(UploadDocumentDocument, options);
      }
export type UploadDocumentMutationHookResult = ReturnType<typeof useUploadDocumentMutation>;
export type UploadDocumentMutationResult = Apollo.MutationResult<UploadDocumentMutation>;
export type UploadDocumentMutationOptions = Apollo.BaseMutationOptions<UploadDocumentMutation, UploadDocumentMutationVariables>;
export const CompleteTaskDocument = gql`
    mutation CompleteTask($input: CompleteUserTaskInput!) {
  completeUserTask(input: $input) {
    completed
  }
}
    `;
export type CompleteTaskMutationFn = Apollo.MutationFunction<CompleteTaskMutation, CompleteTaskMutationVariables>;

/**
 * __useCompleteTaskMutation__
 *
 * To run a mutation, you first call `useCompleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTaskMutation, { data, loading, error }] = useCompleteTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<CompleteTaskMutation, CompleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteTaskMutation, CompleteTaskMutationVariables>(CompleteTaskDocument, options);
      }
export type CompleteTaskMutationHookResult = ReturnType<typeof useCompleteTaskMutation>;
export type CompleteTaskMutationResult = Apollo.MutationResult<CompleteTaskMutation>;
export type CompleteTaskMutationOptions = Apollo.BaseMutationOptions<CompleteTaskMutation, CompleteTaskMutationVariables>;