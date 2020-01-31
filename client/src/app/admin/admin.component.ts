import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Skill } from '../shared/skill';
import { Competence } from '../shared/competence';
import { Realisation } from '../shared/realisation';
import { UserService } from '../shared/user.service';
import { SkillsService } from '../shared/skills.service';
import { CompetencesService } from '../shared/competences.service';
import { RealService } from '../shared/real.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient, private fb:FormBuilder, private userService:UserService, private skillService: SkillsService, private compService:CompetencesService, private realServie: RealService) { }

  user: User;
  comps : Competence[] = [];
  skills: Skill[] = [];
  reals: Realisation[] = [];
  updateIsActive: boolean = true;
  saveIsActive: boolean = false;
  addComp: boolean = false;

  updateRealForm = this.fb.group({
    image: ['']
  })

  ngOnInit() {
    this.getUser();
    this.getSkills();
    this.getReal();
    this.getComp();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateRealForm.get('image').setValue(file);
    }
  }

  getUser()
  {
    this.userService.getUsers().subscribe(result => this.user = result[0]);
  }

  getSkills()
  {
    this.skillService.getAll().subscribe(result => this.skills = result);
  }

  getComp()
  {
    this.compService.getComp().subscribe(result => this.comps = result);
  }

  getReal()
  {
    this.realServie.getReals().subscribe(result => this.reals = result);
  }

  updateUser(user)
  {
    this.toggle();
    if(this.updateRealForm.value.image)
    {

    } else
    {
      this.userService.updateUser(user).subscribe(result => result);
    }
  }

  updateSkill(skill)
  {
    this.toggle();
    this.skillService.updateSkill(skill).subscribe(result => result);
  }

  updateComp(comp)
  {
    this.toggle();
    if(this.updateRealForm.value.image)
    {
      const formData = new FormData();
      formData.append('image', this.updateRealForm.get('image').value);
      this.http.post<any>(`${this.realServie.realUrl}/upload`, formData )
        .subscribe(
          (res) => {
            comp.image = res.data.name;
            this.compService.updateComp(comp).subscribe(result => result);
  
          });
    } else
    {
    this.compService.updateComp(comp).subscribe(result => result);
    }
  }

  updateReal(real)
  {
    this.toggle();
    if(this.updateRealForm.value.image)
    {
      const formData = new FormData();
      formData.append('image', this.updateRealForm.get('image').value);
      this.http.post<any>(`${this.realServie.realUrl}/upload`, formData )
        .subscribe(
          (res) => {
            real.image = res.data.name;
            this.realServie.updateReal(real).subscribe(result => result);
  
          });
    } else {
      this.realServie.updateReal(real).subscribe(result => result);

    }

  }

  toggle()
  {
    this.saveIsActive =! this.saveIsActive;
    this.updateIsActive =! this.updateIsActive;
  }

  deleteComp(comp)
  {
    this.compService.deleteComp(comp).subscribe((result) => {
      let index = this.comps.findIndex(t => t.title === comp.title);
      this.comps.splice(index, 1);
      return this.comps;
    }
      );
  }

  deleteReal(real)
  {
    this.realServie.deleteReal(real).subscribe((result) => {
      let index = this.reals.findIndex(t => t.title === real.title);
      this.reals.splice(index, 1);
      return this.reals;
    }
      );
  }

 

}
