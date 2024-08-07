export class AuthModel {
  authToken: string;
  userData:string;
  /* refreshToken: string;
  expiresIn: Date; */

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.userData = auth.userData;
    /* this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn; */
  }
}
