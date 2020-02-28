import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCenterComponent } from './voting-center.component';

describe('VotingCenterComponent', () => {
  let component: VotingCenterComponent;
  let fixture: ComponentFixture<VotingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
