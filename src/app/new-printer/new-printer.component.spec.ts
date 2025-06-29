import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrinterComponent } from './new-printer.component';

describe('NewPrinterComponent', () => {
  let component: NewPrinterComponent;
  let fixture: ComponentFixture<NewPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPrinterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
