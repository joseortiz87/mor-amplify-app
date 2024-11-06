import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepImageUploadComponent } from './sleep-image-upload.component';

describe('SleepImageUploadComponent', () => {
  let component: SleepImageUploadComponent;
  let fixture: ComponentFixture<SleepImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepImageUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
