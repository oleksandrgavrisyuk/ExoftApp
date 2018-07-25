import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishDialogComponent } from './create-dish-dialog.component';

describe('CreateDishDialogComponent', () => {
  let component: CreateDishDialogComponent;
  let fixture: ComponentFixture<CreateDishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
