import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { LibComponent } from './lib';

describe(LibComponent, () => {
  let component: LibComponent;
  let fixture: ComponentFixture<LibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
