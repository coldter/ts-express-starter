export interface IUserInfoRO {
  id: string;
  email: string;
  name: string;
  dob: Date | null;
  countryCode: string;
  mobile: string;
  profileImage: string | null;
  createdAt: Date;
}
