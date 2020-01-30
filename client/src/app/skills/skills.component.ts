import { Component, OnInit } from '@angular/core';
import { Skill } from '../shared/skill';
import { SkillsService } from '../shared/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills: Skill [] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills()
  {
    this.skillsService.getAll().subscribe(result => this.skills = result);
  }

}
