import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmitieComponent } from './amitie.component';

describe('AmitieComponent', () => {
  let component: AmitieComponent;
  let fixture: ComponentFixture<AmitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmitieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
