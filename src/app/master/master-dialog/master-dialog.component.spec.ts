import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDialogComponent } from './master-dialog.component';

describe('MasterDialogComponent', () => {
  let component: MasterDialogComponent;
  let fixture: ComponentFixture<MasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
