import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocreDisplayComponent } from './socre-display.component';

describe('SocreDisplayComponent', () => {
  let component: SocreDisplayComponent;
  let fixture: ComponentFixture<SocreDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocreDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
