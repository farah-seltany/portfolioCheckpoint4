import { Component, OnInit } from '@angular/core';
import { Competence } from '../shared/competence';
import { CompetencesService } from '../shared/competences.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  comps : Competence[] = [];

  constructor(private compService: CompetencesService) { }

  ngOnInit() {
    this.getComps();
  }

  getComps()
  {
    this.compService.getComp().subscribe(result => this.comps = result);
  }

}
