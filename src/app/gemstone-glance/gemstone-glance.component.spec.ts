import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GemstoneGlanceComponent } from './gemstone-glance.component';

describe('GemstoneGlanceComponent', () => {
  let component: GemstoneGlanceComponent;
  let fixture: ComponentFixture<GemstoneGlanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GemstoneGlanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GemstoneGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
