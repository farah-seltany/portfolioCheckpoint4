import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competence } from './competence';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  compUrl = 'http://localhost:3000/competences'

  constructor(private http: HttpClient) { }

  getComp()
  {
    return this.http.get<Competence[]>(`${this.compUrl}`);
  }

  updateComp(comp)
  {
    return this.http.put<Competence>(`${this.compUrl}/${comp.id}`, comp);
  }

  addComp(comp)
  {
    return this.http.post<Competence>(`${this.compUrl}`, comp);

  }

  deleteComp(comp)
  {
    return this.http.delete<Competence>(`${this.compUrl}/${comp.id}`);
  }
}
