import { Component, OnInit } from '@angular/core';
import { productSales, productSalesMulti, multi} from './products'
import { EstudioService } from '../../services/estudio.service'

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
  multi : any[] = []
  productSalesMulti : any[] = []
  estudiosPorEstado : any[] = []
  xAxisLabels : string = "Estados"
  xAxis : boolean = true

  constructor(private service: EstudioService) {
    Object.assign(this ,  {estudiosPorEstado, productSalesMulti})
   }

   getEstudiosPorEstado = () =>{

   }

  ngOnInit(): void {
    this.service.getEstudiosPorEstado().subscribe((res)=>{
      this.productSales = res
    })
    this.service.getGanancias().subscribe((res)=>{
      this.multi = res
    })
  }

}
