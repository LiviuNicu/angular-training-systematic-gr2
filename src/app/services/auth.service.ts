import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  public url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: Object
  ) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      withCredentials: false
    };
  }
  getToken() {
    if (isPlatformBrowser(this.platformID)) {
      return localStorage.getItem("token");
    }
  }
  logout() {
    if (isPlatformBrowser(this.platformID)) {
      localStorage.removeItem("token");
    }
    this.router.navigate(["/login"]);
  }
  login(credentials): Observable<any> {
    return this.http
      .post(this.url + "user/login", credentials, this.getHeaders())
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            if (isPlatformBrowser(this.platformID)) {
              localStorage.setItem("token", response.token);
            }
          }
        }),
        catchError(this.handleError("login"))
      );
  }

  register(data): Observable<any> {
    return this.http
      .post(this.url + "user/register", data, this.getHeaders())
      .pipe(catchError(this.handleError("register")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
      }

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
