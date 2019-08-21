import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookPersonalProfileComponent } from './cook-personal-profile.component';

describe('CookPersonalProfileComponent', () => {
  let component: CookPersonalProfileComponent;
  let fixture: ComponentFixture<CookPersonalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookPersonalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
