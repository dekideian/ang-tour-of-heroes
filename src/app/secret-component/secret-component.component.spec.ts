import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretComponentComponent } from './secret-component.component';

describe('SecretComponentComponent', () => {
  let component: SecretComponentComponent;
  let fixture: ComponentFixture<SecretComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
