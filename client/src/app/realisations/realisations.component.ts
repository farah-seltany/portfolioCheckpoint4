import { Component, OnInit } from '@angular/core';
import { Realisation } from '../shared/realisation';
import { RealService } from '../shared/real.service';

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss']
})
export class RealisationsComponent implements OnInit {

  reals: Realisation[] = [];

  constructor(private realService: RealService) { }

  ngOnInit() {
    this.getReals();
  }

  getReals()
  {
    this.reals = [];
    this.realService.getReals().subscribe(result => this.reals = result);
  }

}
