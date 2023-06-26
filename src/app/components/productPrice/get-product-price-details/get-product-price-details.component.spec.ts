import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductPriceDetailsComponent } from './get-product-price-details.component';

describe('GetProductPriceDetailsComponent', () => {
  let component: GetProductPriceDetailsComponent;
  let fixture: ComponentFixture<GetProductPriceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductPriceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProductPriceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
