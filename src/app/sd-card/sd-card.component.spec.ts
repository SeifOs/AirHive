import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdCardComponent } from './sd-card.component';

describe('SdCardComponent', () => {
  let component: SdCardComponent;
  let fixture: ComponentFixture<SdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
