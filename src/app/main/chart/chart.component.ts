import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { SumaryServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css'],
    animations: [appModuleAnimation()]
  })
export class ChartComponent extends AppComponentBase implements OnInit {
  basicData: any;

  basicOptions: any;
  data: any;
  products: [];
  cols: any[];

  options: any;
  
  visible = false;
  date: Date;
  loading = false;

  totalSales = 0;

  constructor(
    injector: Injector,
    private _sumaryService: SumaryServiceProxy) {
    super(injector);
  }

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
      this.date = new Date();  

      this._sumaryService.GetRevenueStructure(this.date.toLocaleString()).subscribe((result) => {
        this.data = {
            labels: result.items.labels,
            datasets: result.items.datasets
        };
    
        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
      });

      this._sumaryService.GetAllSales(this.date.toLocaleString()).subscribe((result) => {
        this.totalSales = result;
      });

      console.log(this.date.toLocaleString());

      this._sumaryService.GetProductSale(this.date.toLocaleString()).subscribe((result) => {
        this.basicData = {
            labels: result.items.labels,
            datasets: result.items.datasets
        };
      });

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }

  showDialog() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  confirmModal() {
    this.loading = true;
    console.log(this.date.toLocaleString())
    this.visible = false;
  }
}

