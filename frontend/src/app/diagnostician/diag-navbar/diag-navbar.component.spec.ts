import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagNavbarComponent } from './diag-navbar.component';

describe('DiagNavbarComponent', () => {
  let component: DiagNavbarComponent;
  let fixture: ComponentFixture<DiagNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
