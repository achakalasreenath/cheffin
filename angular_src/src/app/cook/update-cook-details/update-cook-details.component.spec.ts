import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCookDetailsComponent } from './update-cook-details.component';

describe('UpdateCookDetailsComponent', () => {
  let component: UpdateCookDetailsComponent;
  let fixture: ComponentFixture<UpdateCookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCookDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
