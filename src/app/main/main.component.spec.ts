import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMockComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainMockComponent;
  let fixture: ComponentFixture<MainMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMockComponent]
    });
    fixture = TestBed.createComponent(MainMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
