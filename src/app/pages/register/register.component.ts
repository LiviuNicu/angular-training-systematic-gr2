import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public myForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: ["", [Validators.required, Validators.minLength(5)]],
          confirm_password: ["", [Validators.required, Validators.minLength(5)]]
        },
        { validator: this.passwordConfirming }
      )
    });
  }

  doRegister() {
    this.submitted = true;
    console.log(this.myForm);
    if (this.myForm.valid) {
      this.authService
        .register(this.myForm.value)
        .subscribe((response: any) => {
          if (response && response.success) {
            this.router.navigate(["/login"]);
          }
        });
    }
  }

  passwordConfirming(g: AbstractControl): { invalid: boolean } {
    if (g.get("password").value !== g.get("confirm_password").value) {
      return { invalid: true };
    }
  }
}
