import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  onRegister(userObj: any) {
    // console.log(userObj);
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/register/', userObj);
  }
  onLogin(userObj: any) {
    // console.log(userObj);
    return this.http.post<{ msg: string, posts: any[] }>('http://localhost:3001/getuser/', userObj);
  }
}
