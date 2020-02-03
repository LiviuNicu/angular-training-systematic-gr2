import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { PublicMenuComponent } from "src/app/components/public-menu/public-menu.component";
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginBtn: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, PublicMenuComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginBtn = fixture.debugElement.query(By.css("#loginBtn"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("email should be invalid", () => {
    const validateEmail = component.validateEmail("asd");
    expect(validateEmail).toBe(false);
  });
  it("email should be valid", () => {
    const validateEmail = component.validateEmail("asd@asd.com");
    expect(validateEmail).toBe(true);
  });
  it("Login button should be disabled", () => {
    expect(loginBtn.nativeElement.disabled).toBe(true);
  });
  it("Login button should be enabled", () => {
    component.user.email = "test@test.com";
    component.user.password = "test";
    expect(loginBtn.nativeElement.disabled).toBe(true);
    fixture.detectChanges();
    expect(loginBtn.nativeElement.disabled).toBe(false);
  });

  it("error text if email is invalid should be correct", () => {
    component.user.email = "test";
    component.user.password = "test";
    expect(component.error).toBe("");
    component.login();
    expect(component.error).toContain("Email is invalid");
  });

  it("login function should be called when you click login btn", () => {
    spyOn(component, "login");
    loginBtn.nativeElement.click();
    expect(component.login).toHaveBeenCalledTimes(0);

    component.user.email = "test@test.com";
    component.user.password = "test";
    fixture.detectChanges();
    loginBtn.nativeElement.click();

    expect(component.login).toHaveBeenCalledTimes(1);
  });
});
