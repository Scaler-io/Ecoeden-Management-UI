import {CreateUserRequest, UserFormModel} from '../models/user';

export class UserFormMapper {
  public static mapToUserCreateRequest(form: UserFormModel): CreateUserRequest {
    return {
      userName: form.userName,
      password: form.password,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      roles: form.roles
    };
  }
}
