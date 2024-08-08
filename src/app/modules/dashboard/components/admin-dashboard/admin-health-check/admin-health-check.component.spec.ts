import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthCheckComponent } from './admin-health-check.component';

describe('AdminHealthCheckComponent', () => {
  let component: AdminHealthCheckComponent;
  let fixture: ComponentFixture<AdminHealthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHealthCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminHealthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
