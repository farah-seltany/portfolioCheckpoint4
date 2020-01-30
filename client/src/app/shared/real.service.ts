import { Injectable } from '@angular/core';
import { Realisation } from './realisation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RealService {

  realUrl = 'http://localhost:3000/realisations'

  constructor(private http: HttpClient) { }

  getReals()
  {
    return this.http.get<Realisation[]>(`${this.realUrl}`);
  }

  updateReal(real)
  {
    return this.http.put<Realisation>(`${this.realUrl}/${real.id}`, real);
  }

  addReal(real)
  {
    return this.http.post<Realisation>(`${this.realUrl}`, real);
  }

  deleteReal(real)
  {
    return this.http.delete<Realisation>(`${this.realUrl}/${real.id}`);
  }
}
