import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirHiveCardComponent } from './air-hive-card.component';

describe('AirHiveCardComponent', () => {
  let component: AirHiveCardComponent;
  let fixture: ComponentFixture<AirHiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirHiveCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirHiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
