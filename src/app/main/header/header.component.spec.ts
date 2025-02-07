import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMockComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderMockComponent;
  let fixture: ComponentFixture<HeaderMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMockComponent]
    });
    fixture = TestBed.createComponent(HeaderMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
