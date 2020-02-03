import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { PublicMenuComponent } from "src/app/components/public-menu/public-menu.component";
import { ReactiveFormsModule } from "@angular/forms";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  function updateForm(name, email, password, confirm_password) {
    component.myForm.controls["name"].setValue(name);
    component.myForm.controls["email"].setValue(email);
    component.myForm.get(["passwords", "password"]).setValue(password);
    component.myForm
      .get(["passwords", "confirm_password"])
      .setValue(confirm_password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, PublicMenuComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("empty form should be invalid", () => {
    updateForm("", "", "", "");
    expect(component.myForm.valid).toBe(false);
  });

  it("form should be valid", () => {
    updateForm("test", "test@test.com", "12345", "12345");
    expect(component.myForm.valid).toBe(true);
  });

  it("form should be invalid because email is invalid", () => {
    updateForm("test", "test", "12345", "12345");
    expect(component.myForm.valid).toBe(false);
    console.log(component.myForm.controls.email.errors);
    expect(component.myForm.controls["email"].getError("email")).toBeTruthy();
  });
});
