import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCardComponent } from './p-card.component';

describe('PCardComponent', () => {
  let component: PCardComponent;
  let fixture: ComponentFixture<PCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
