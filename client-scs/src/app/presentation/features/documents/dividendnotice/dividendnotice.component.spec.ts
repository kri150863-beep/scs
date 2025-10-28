import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendnoticeComponent } from './dividendnotice.component';

describe('DividendnoticeComponent', () => {
  let component: DividendnoticeComponent;
  let fixture: ComponentFixture<DividendnoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividendnoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividendnoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
