import { Component } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-productsummary',
  templateUrl: './productsummary.component.html',
  styleUrls: ['./productsummary.component.css']
})
export class ProductsummaryComponent {

  constructor(public service:MasterService){
    
  }
}
