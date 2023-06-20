export interface IJob {
  id: string
  title: string
  location: string
  experience: string
  type: string
  detail: string
  user: {
    company: ICompany
  }
}

export interface ICompany {
  id: string
  companyName: string
  employerId: string
  logo: string
  about: string
}
export interface IProfile {
  contact: string
  cv: string
  id: string
  social: string
  education: string
  userId: string
}
