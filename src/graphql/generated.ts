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
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type AllTimeslotsInput = {
  eaServiceId: Scalars['String'];
  providerType?: InputMaybe<Role>;
  selectedDate: Scalars['DateTime'];
};

/** The type of answer */
export enum AnswerType {
  Array = 'ARRAY',
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  File = 'FILE',
  Number = 'NUMBER',
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

export type Checkout = {
  __typename?: 'Checkout';
  _id: Scalars['String'];
  billingAddress: Address;
  checkedOut: Scalars['Boolean'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  heightInInches: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  sameAsShippingAddress: Scalars['Boolean'];
  shippingAddress: Address;
  state: Scalars['String'];
  stripeCheckoutId: Scalars['String'];
  stripeClientSecret: Scalars['String'];
  stripeCustomerId: Scalars['String'];
  stripePaymentIntentId: Scalars['String'];
  stripeSubscriptionId: Scalars['String'];
  textOptIn?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  weightInLbs: Scalars['Float'];
  weightLossMotivator: Scalars['String'];
};

export type CheckoutResponse = {
  __typename?: 'CheckoutResponse';
  checkout: Checkout;
  message?: Maybe<Scalars['String']>;
};

export type Classification = {
  __typename?: 'Classification';
  calculated1hourPercent?: Maybe<Scalars['Float']>;
  calculated30minsPercent?: Maybe<Scalars['Float']>;
  calculatedPercentile?: Maybe<Scalars['Float']>;
  classification: Scalars['String'];
  date: Scalars['DateTime'];
  displayPercentile?: Maybe<Scalars['String']>;
  percentile: Scalars['String'];
};

export type CompletePaymentIntentInput = {
  paymentIntentId: Scalars['String'];
};

export type CompleteUserTaskInput = {
  _id: Scalars['String'];
  answers: Array<UserAnswersInput>;
};

export type CreateAppointmentInput = {
  eaProviderId: Scalars['String'];
  eaServiceId: Scalars['String'];
  endTimeInUtc: Scalars['DateTime'];
  notes?: InputMaybe<Scalars['String']>;
  providerType: Role;
  startTimeInUtc: Scalars['DateTime'];
  userTaskId: Scalars['String'];
};

export type CreateCheckoutInput = {
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  heightInInches: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  state: Scalars['String'];
  textOptIn?: InputMaybe<Scalars['Boolean']>;
  weightInLbs: Scalars['Float'];
  weightLossMotivator: Scalars['String'];
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
  updateUser?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
  zipCode: Scalars['String'];
};

export type CreateLabOrderResponse = {
  __typename?: 'CreateLabOrderResponse';
  labOrderId: Scalars['String'];
};

export type CreateStripeCustomerInput = {
  _id: Scalars['String'];
  billing?: InputMaybe<AddressInput>;
  sameAsShipping: Scalars['Boolean'];
  shipping: AddressInput;
};

export type CreateTaskInput = {
  /** If set to true, the task can be assigned multiple times to the same patient without the previously assigned task being completed. */
  canHaveMultiple?: InputMaybe<Scalars['Boolean']>;
  /** If set, the patient will have the set amount of days to complete the task until they become past due. */
  daysTillDue?: InputMaybe<Scalars['Float']>;
  /** If set to true, the task will be assigned to the patient as a high priority task. */
  highPriority?: InputMaybe<Scalars['Boolean']>;
  /** If set, this task will be assigned on a recurring interval. This is a cron expression. */
  interval?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** If set to true, notifies the patient's health coach when the task is past due. Requires hoursTillDue to be set. */
  notifyHealthCoachWhenPastDue?: InputMaybe<Scalars['Float']>;
  /** If set to true, notifies the patient's provider when the task is past due. Requires hoursTillDue to be set. */
  notifyProviderWhenPastDue?: InputMaybe<Scalars['Float']>;
  /** Notify patient when task is assigned. */
  notifyWhenAssigned?: InputMaybe<Scalars['Boolean']>;
  /** Notify patient when the task becomes past due. Requires hoursTillDue to be set. */
  notifyWhenPastDue?: InputMaybe<Scalars['Boolean']>;
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
  name: Scalars['String'];
  /** If no password is provided, an email will be sent to create one. */
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  /** Provider ID associated the user to a specific provider in our system. */
  providerId?: InputMaybe<Scalars['String']>;
  /** If no role is provided, defaults to Patient. */
  role?: InputMaybe<Role>;
  /** If not provided, will be set after checkout. */
  stripeCustomerId?: InputMaybe<Scalars['String']>;
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

export type EaAppointment = {
  __typename?: 'EAAppointment';
  eaAppointmentId: Scalars['String'];
  eaProvider: EaProvider;
  eaService: EaService;
  endTimeInUtc: Scalars['DateTime'];
  location: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  startTimeInUtc: Scalars['DateTime'];
};

export type EaAppointmentWithCustomer = {
  __typename?: 'EAAppointmentWithCustomer';
  eaAppointmentId: Scalars['String'];
  eaCustomer: EaCustomer;
  eaProvider: EaProvider;
  eaService: EaService;
  endTimeInUtc: Scalars['DateTime'];
  location: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  startTimeInUtc: Scalars['DateTime'];
};

export type EaCustomer = {
  __typename?: 'EACustomer';
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
};

export type EaProvider = {
  __typename?: 'EAProvider';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  numberOfPatients?: Maybe<Scalars['Float']>;
  timezone?: Maybe<Scalars['String']>;
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

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type GetUserTasksInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  archiveTask: UserTask;
  assignTaskToUser: UserTask;
  batchCreateOrUpdateProviders?: Maybe<BatchCreateOrUpdateProvidersResponse>;
  bulkAssignTasksToUser: Array<UserTask>;
  cancelAppointment: MessageResponse;
  classifyPatients: User;
  completePaymentIntent: MessageResponse;
  completeUpload: User;
  completeUserTask: UserTask;
  createAppointment: EaAppointment;
  createCustomer: Scalars['String'];
  createLabOrder: CreateLabOrderResponse;
  createOrFindCheckout: CheckoutResponse;
  createOrUpdateStripeSession: CheckoutResponse;
  createTask: Task;
  createUser: User;
  forgotPassword: MessageResponse;
  login: LoginResponse;
  requestSignedUrls: Array<SignedUrlResponse>;
  resetPassword: LoginResponse;
  scorePatients: Score;
  subscribeEmail: MessageResponse;
  updateAppointment: EaAppointment;
  updateProviderProfile: EaProviderProfile;
  updateSubscription: MessageResponse;
  updateUserTask: UserTask;
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
  eaAppointmentId: Scalars['String'];
};


export type MutationClassifyPatientsArgs = {
  userId: Scalars['String'];
};


export type MutationCompletePaymentIntentArgs = {
  input: CompletePaymentIntentInput;
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


export type MutationCreateLabOrderArgs = {
  userId: Scalars['String'];
};


export type MutationCreateOrFindCheckoutArgs = {
  input: CreateCheckoutInput;
};


export type MutationCreateOrUpdateStripeSessionArgs = {
  input: CreateStripeCustomerInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
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


export type MutationSubscribeEmailArgs = {
  input: SubscribeEmailInput;
};


export type MutationUpdateAppointmentArgs = {
  input: UpdateAppointmentInput;
};


export type MutationUpdateProviderProfileArgs = {
  eaProviderId: Scalars['String'];
  input: EaProviderProfileInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationUpdateUserTaskArgs = {
  input: UpdateUserTaskInput;
  taskId: Scalars['String'];
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

export type ProviderTimeslotsInput = {
  eaProviderId: Scalars['String'];
  eaServiceId: Scalars['String'];
  selectedDate: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  allTimeslots: TimeslotsResponse;
  allUserTasks: UserTaskList;
  allUserTasksByUserId?: Maybe<Array<UserTask>>;
  appointment: EaAppointment;
  appointments: Array<EaAppointment>;
  checkout: CheckoutResponse;
  getAProvider: EaProviderProfile;
  getAllPatientsByHealthCoach: Array<User>;
  getAllPatientsByPractitioner: Array<User>;
  getAllTasks: Array<Task>;
  getAllUserTasksByUser: Array<UserTask>;
  getUserById: User;
  me: User;
  pharmacyLocations: Array<PharmacyLocationResult>;
  places: Array<GooglePlacesSearchResult>;
  providerAppointments: Array<EaAppointmentWithCustomer>;
  providerTimeslots: TimeslotsResponse;
  reverseGeoCode: Array<GoogleReverseGeoCodeResult>;
  task?: Maybe<Task>;
  user: User;
  userSendbirdChannel: Array<UserSendbirdChannel>;
  userTask: UserTask;
  userTasks: UserTaskList;
  users: Array<User>;
};


export type QueryAllTimeslotsArgs = {
  input: AllTimeslotsInput;
};


export type QueryAllUserTasksByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryAppointmentArgs = {
  eaAppointmentId: Scalars['String'];
};


export type QueryAppointmentsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryCheckoutArgs = {
  id: Scalars['String'];
};


export type QueryGetAProviderArgs = {
  eaProviderId: Scalars['String'];
};


export type QueryGetAllUserTasksByUserArgs = {
  userId: Scalars['String'];
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


export type QueryProviderAppointmentsArgs = {
  eaProviderId: Scalars['String'];
};


export type QueryProviderTimeslotsArgs = {
  input: ProviderTimeslotsInput;
};


export type QueryTaskArgs = {
  id: Scalars['String'];
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
  provider?: InputMaybe<Scalars['Boolean']>;
  registration: Scalars['Boolean'];
  token: Scalars['String'];
};

/** The user roles a user can be assigned to */
export enum Role {
  Admin = 'Admin',
  CareCoordinator = 'CareCoordinator',
  Doctor = 'Doctor',
  HealthCoach = 'HealthCoach',
  Nutritionist = 'Nutritionist',
  Patient = 'Patient',
  Practitioner = 'Practitioner'
}

export type Score = {
  __typename?: 'Score';
  calculated1hourPercent?: Maybe<Scalars['Float']>;
  calculated30minsPercent?: Maybe<Scalars['Float']>;
  calculatedPercentile?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['DateTime']>;
  increased?: Maybe<Scalars['Boolean']>;
  increased1hour?: Maybe<Scalars['Boolean']>;
  increasedDiastolic?: Maybe<Scalars['Boolean']>;
  increasedSystolic?: Maybe<Scalars['Boolean']>;
  latest?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
  percentDifference?: Maybe<Scalars['Float']>;
  percentDifference1Hour?: Maybe<Scalars['Float']>;
  percentDifference30Mins?: Maybe<Scalars['Float']>;
  percentDifferenceDiastolic?: Maybe<Scalars['Float']>;
  percentDifferenceSystolic?: Maybe<Scalars['Float']>;
  percentile?: Maybe<Scalars['String']>;
  percentile1hour?: Maybe<Scalars['String']>;
  percentile30mins?: Maybe<Scalars['String']>;
  providerMessage?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  score1hour?: Maybe<Scalars['String']>;
  score30mins?: Maybe<Scalars['String']>;
  scoreDiastolic?: Maybe<Scalars['Float']>;
  scoreSystolic?: Maybe<Scalars['Float']>;
  task?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Float']>;
};

export type SignedUrlRequest = {
  contentType: Scalars['String'];
  key: Scalars['String'];
  metadata?: InputMaybe<Array<FileMetadataInput>>;
};

export type SignedUrlResponse = {
  __typename?: 'SignedUrlResponse';
  key: Scalars['String'];
  url: Scalars['String'];
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
  interval?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notifyHealthCoachWhenPastDue: Scalars['Boolean'];
  notifyProviderWhenPastDue: Scalars['Boolean'];
  notifyWhenAssigned?: Maybe<Scalars['Boolean']>;
  notifyWhenPastDue: Scalars['Boolean'];
  type: TaskType;
};

/** The type of task */
export enum TaskType {
  AdLibitum = 'AD_LIBITUM',
  BpLog = 'BP_LOG',
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
  eaProvider: EaProvider;
  endTimeInUtc: Scalars['DateTime'];
  startTimeInUtc: Scalars['DateTime'];
};

export type TimeslotsResponse = {
  __typename?: 'TimeslotsResponse';
  eaService: EaService;
  selectedDateInUtc: Scalars['DateTime'];
  timeslots: Array<Timeslot>;
  total: Scalars['Float'];
};

export type UpdateAppointmentInput = {
  eaAppointmentId: Scalars['String'];
  eaProviderId: Scalars['String'];
  eaServiceId: Scalars['String'];
  endTimeInUtc: Scalars['DateTime'];
  notes?: InputMaybe<Scalars['String']>;
  providerType: Role;
  startTimeInUtc: Scalars['DateTime'];
};

export type UpdateSubscriptionInput = {
  stripeSubscriptionId: Scalars['String'];
  subscriptionExpiresAt: Scalars['DateTime'];
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
  classifications?: Maybe<Array<Classification>>;
  dateOfBirth: Scalars['DateTime'];
  eaCustomerId?: Maybe<Scalars['String']>;
  eaHealthCoachId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailToken: Scalars['String'];
  emailTokenExpiresAt: Scalars['DateTime'];
  files: Array<File>;
  gender: Gender;
  heightInInches: Scalars['Float'];
  labOrderSent?: Maybe<Scalars['Boolean']>;
  meetingRoomUrl?: Maybe<Scalars['String']>;
  meetingUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  pharmacyLocation?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  provider?: Maybe<Provider>;
  role: Role;
  score: Array<Score>;
  sendbirdChannelUrl?: Maybe<Scalars['String']>;
  stripeCustomerId: Scalars['String'];
  stripeSubscriptionId: Scalars['String'];
  subscriptionExpiresAt: Scalars['DateTime'];
  textOptIn?: Maybe<Scalars['Boolean']>;
  timezone?: Maybe<Scalars['String']>;
  weightGoal?: Maybe<Scalars['Float']>;
  weights: Array<Weight>;
};

export type UserAnswer = {
  __typename?: 'UserAnswer';
  key: Scalars['String'];
  type: AnswerType;
  value: Scalars['String'];
};

export type UserAnswersInput = {
  key: Scalars['String'];
  type: AnswerType;
  value: Scalars['String'];
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
  value: Scalars['Float'];
};

export type UserTasksQueryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  completed?: InputMaybe<Scalars['Boolean']>;
}>;


export type UserTasksQueryQuery = { __typename?: 'Query', userTasks: { __typename?: 'UserTaskList', total: number, userTasks?: Array<{ __typename?: 'UserTask', _id: string, dueAt?: any | null, pastDue?: boolean | null, createdAt?: any | null, task?: { __typename?: 'Task', _id: string, name?: string | null, type: TaskType } | null }> | null } };


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