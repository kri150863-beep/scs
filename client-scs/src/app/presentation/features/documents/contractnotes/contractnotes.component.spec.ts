import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractnotesComponent } from './contractnotes.component';

describe('ContractnotesComponent', () => {
  let component: ContractnotesComponent;
  let fixture: ComponentFixture<ContractnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractnotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
