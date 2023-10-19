import { Injectable, signal, computed } from '@angular/core';
import { SalesProduct } from '../Model/Salesproduct';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  productlist = signal<SalesProduct[]>([]);
  productitem = signal<SalesProduct>({
    slno: 0,
    code: '',
    name: '',
    price: 0,
    qty: 1,
    total: 0
  })

  AddProduct(_product: SalesProduct) {
    this.productlist.mutate(previous => previous.push(_product))
  }

  UpdateProduct(_product: SalesProduct) {
    let newarry = this.productlist().map(item => {
      return item.slno === _product.slno ? _product : item
    });
    this.productlist.set(newarry);
  }

  RemoveProduct(slno: number) {
    this.productlist.update(previous => previous.filter(item => item.slno !== slno));
  }

  GetProductbyCode(slno: number) {
    this.productitem.set(this.productlist().find(item => item.slno === slno) as SalesProduct);
  }

  totalqty = computed(() => this.productlist().length);
  summarytotal = computed(() => this.productlist().reduce((prev: any, curr: SalesProduct) => {
    return prev + curr.total
  }, 0))

  summarytax = computed(() => (this.summarytotal() * 7) / 100);
  summarynettotal = computed(() => (this.summarytotal() + this.summarytax()));

}
