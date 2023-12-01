import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KontakPage } from './kontak.page';

describe('KontakPage', () => {
  let component: KontakPage;
  let fixture: ComponentFixture<KontakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KontakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
