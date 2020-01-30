import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from './skill';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillUrl = 'http://localhost:3000/skills';

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<Skill[]>(`${this.skillUrl}`);
  }

  updateSkill(skill)
  {
    return this.http.put<Skill>(`${this.skillUrl}/${skill.id}`, skill);
  }
}
