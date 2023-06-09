import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRetailComponent } from './create-retail.component';

describe('CreateRetailComponent', () => {
  let component: CreateRetailComponent;
  let fixture: ComponentFixture<CreateRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
