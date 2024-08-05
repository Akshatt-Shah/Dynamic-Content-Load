import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaitemComponent } from './areaitem.component';

describe('AreaitemComponent', () => {
  let component: AreaitemComponent;
  let fixture: ComponentFixture<AreaitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaitemComponent]
    });
    fixture = TestBed.createComponent(AreaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
