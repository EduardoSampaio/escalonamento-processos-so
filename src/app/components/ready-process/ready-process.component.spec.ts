import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyProcessComponent } from './ready-process.component';

describe('ReadyProcessComponent', () => {
  let component: ReadyProcessComponent;
  let fixture: ComponentFixture<ReadyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
