import { Component, effect } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { SalesProduct } from 'src/app/Model/Salesproduct';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent {

  btntext = 'Add Product';

  constructor(private builder: FormBuilder, public service: MasterService) {
    effect(() => {
      this.productform.setValue({
        slno: this.service.productitem().slno,
        code: this.service.productitem().code,
        name: this.service.productitem().name,
        qty: this.service.productitem().qty,
        price: this.service.productitem().price,
        total: this.service.productitem().total
      })
      if (this.service.productitem().slno > 0) {
        this.btntext = 'Update';
      }

    })
  }

  productform = this.builder.group({
    slno: this.builder.control(0),
    code: this.builder.control(''),
    name: this.builder.control(''),
    qty: this.builder.control(1),
    price: this.builder.control(0),
    total: this.builder.control(0)
  })

  AddProduct() {

    let _qty = this.productform.value.qty as number;
    let _price = this.productform.value.price as number;
    let _total = _qty * _price;
    let _slno = this.productform.value.slno as number;

    const _obj: SalesProduct = {
      slno: 0,
      code: this.productform.value.code as string,
      name: this.productform.value.name as string,
      price: _price,
      qty: _qty,
      total: _total
    }
    if (_slno == 0) {
      const _maxid=this.service.productlist().length>0?Math.max(...this.service.productlist().map(item=>item.slno)):0;
      _obj.slno=_maxid+1;
      this.service.AddProduct(_obj);
    } else {
      _obj.slno=_slno;
      this.service.UpdateProduct(_obj);
    }
    this.productform.setValue({
      slno: 0, code: '', name: '',
      qty: 1,
      price: 0,
      total: 0
    })
    this.btntext = 'Add Product';
  }
  productchange(element: any) {
    let productname = element.target['options'][element.target['options'].selectedIndex].text;
    this.productform.controls['name'].setValue(productname);
  }

}
