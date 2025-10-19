import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVisibilityComponent } from './password-visibility.component';

describe('PasswordVisibilityComponent', () => {
  let component: PasswordVisibilityComponent;
  let fixture: ComponentFixture<PasswordVisibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordVisibilityComponent]
    });
    fixture = TestBed.createComponent(PasswordVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
