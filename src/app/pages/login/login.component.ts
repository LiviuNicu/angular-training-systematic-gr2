import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: any = { email: "", password: "" };
  public error: string = "";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(): void {
    console.log(this.user);
    if (this.validateEmail(this.user.email)) {
      this.authService.login(this.user).subscribe((response: any) => {
        if (response && response.token) {
          this.router.navigate(["/private/score"]);
        } else {
          this.error = "Invalid email or password";
        }
      });
    } else {
      this.error = "Email is invalid";
      setTimeout(() => {
        this.error = "";
      }, 2000);
    }
  }

  isNotValid(): boolean {
    return !this.user.email || !this.user.password;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
