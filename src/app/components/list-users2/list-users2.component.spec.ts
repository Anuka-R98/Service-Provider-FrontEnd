import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsers2Component } from './list-users2.component';

describe('ListUsers2Component', () => {
  let component: ListUsers2Component;
  let fixture: ComponentFixture<ListUsers2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsers2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsers2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
