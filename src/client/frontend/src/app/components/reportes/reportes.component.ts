import { Component, OnInit } from '@angular/core';
import { productSales, productSalesMulti, multi} from './products'
import { EstudioService } from '../../services/estudio.service'


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  estados : any[] = []
  ganancias : any[] = []
  duraciones : any[] = []
  productSalesMulti : any[] = []
  estudiosPorEstado : any[] = []
  xAxisLabels : string = "Estados"
  xAxis : boolean = true

  constructor(private service: EstudioService) {
    Object.assign(this ,  { productSalesMulti})
   }

  ngOnInit(): void {
    this.service.getEstudiosPorEstado().subscribe((res)=>{
      this.estados = res
    })
    this.service.getGanancias().subscribe((res)=>{
      this.ganancias = res
    })
    this.service.getDuracionAnual().subscribe((res)=>{
      this.duraciones = res
      console.log(res)
    })
  }

}
