import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { DataMatrixService } from '../data-matrix.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {
  dataMatrix: any[] = [];

  constructor(private dataMatrixService: DataMatrixService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataMatrixService.getDataMatrix().subscribe(data => {
      this.dataMatrix = data;
    });
  }
}
