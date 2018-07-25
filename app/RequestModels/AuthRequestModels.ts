export class SignInRequestModel {
  login: string;
  password: string;
}

export class SignOutRequestModel {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export class EditProfileRequestModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
}
