import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyspacePage } from './myspace.page';

describe('MyspacePage', () => {
  let component: MyspacePage;
  let fixture: ComponentFixture<MyspacePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
