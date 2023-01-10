export interface Break {
  start: string
  end: string
}

export interface Day {
  start: string
  end: string
  breaks: Break[]
}

export interface WorkingPlan {
  monday?: Day
  tuesday?: Day
  wednesday?: Day
  thursday?: Day
  friday?: Day
  saturday?: Day
  sunday?: Day
}

export interface Break5 {
  start: string
  end: string
}

export interface Settings {
  username: string
  password: string
  notifications: boolean
  googleSync: boolean
  googleCalendar: string
  googleToken: string
  syncFutureDays: number
  syncPastDays: number
  calendarView: string
  workingPlan: WorkingPlan
}

export interface IEaProvider {
  id: number
  firstName: string
  lastName: string
  email: string
  mobile: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  notes: string
  services: number[]
  settings: Settings
}
