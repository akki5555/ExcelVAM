import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgniteuiAngularComponent } from './igniteui-angular.component';

describe('IgniteuiAngularComponent', () => {
  let component: IgniteuiAngularComponent;
  let fixture: ComponentFixture<IgniteuiAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgniteuiAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgniteuiAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
