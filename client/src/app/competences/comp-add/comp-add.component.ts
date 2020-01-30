import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompetencesService } from 'src/app/shared/competences.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comp-add',
  templateUrl: './comp-add.component.html',
  styleUrls: ['./comp-add.component.scss']
})
export class CompAddComponent implements OnInit {

  addComp: boolean = false;

  addCompForm = this.fb.group({
    title : [null],
    rating : [null],
    image: [null]
  })

  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder, private compService: CompetencesService) { }

  ngOnInit() {
  }


  showAddComp()
  {
    this.addComp =! this.addComp;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addCompForm.get('image').setValue(file);
    }

  }
  addComps(comp)
  {
    comp = this.addCompForm.value;
    const formData = new FormData();
    formData.append('image', this.addCompForm.get('image').value);
    this.http.post<any>(`${this.compService.compUrl}/upload`, formData )
      .subscribe(
        (res) => {
          console.log(res);
          comp.image = res.data.name;

          this.compService.addComp(comp).subscribe(result => result);
        });
  }

}
