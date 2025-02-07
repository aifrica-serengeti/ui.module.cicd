import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMockComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuMockComponent;
  let fixture: ComponentFixture<MenuMockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMockComponent]
    });
    fixture = TestBed.createComponent(MenuMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
