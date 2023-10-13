import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsummaryComponent } from './productsummary.component';

describe('ProductsummaryComponent', () => {
  let component: ProductsummaryComponent;
  let fixture: ComponentFixture<ProductsummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsummaryComponent]
    });
    fixture = TestBed.createComponent(ProductsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
