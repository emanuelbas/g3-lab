import { Component, OnInit } from '@angular/core';
import { productSales, productSalesMulti} from './products'

var estudiosPorEstado = [

  {
    "name": "Estado 1",
    "value": 5001
  }, {
    "name": "Estado 2",
    "value": 7322
  }
]

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  productSales : any[] = []
  productSalesMulti : any[] = []
  estudiosPorEstado : any[] = []

  constructor() {
    Object.assign(this ,  {estudiosPorEstado, productSales, productSalesMulti})
   }

   getEstudiosPorEstado = () =>{

   }

  ngOnInit(): void {

  }

}
