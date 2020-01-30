import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RealService } from 'src/app/shared/real.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-real-add',
  templateUrl: './real-add.component.html',
  styleUrls: ['./real-add.component.scss']
})
export class RealAddComponent implements OnInit {

  addReal: boolean = false;

  addRealForm = this.fb.group({
    title: [null],
    subtitle: [null],
    description: [null],
    lien: [null],
    image: [null]
  })

  constructor(private fb: FormBuilder, private realService: RealService, private http: HttpClient) { }

  ngOnInit() {
  }

  showAddComp()
  {
    this.addReal =! this.addReal;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addRealForm.get('image').setValue(file);
    }
  }


  addReals(real)
  {
    real = this.addRealForm.value;
    const formData = new FormData();
    formData.append('image', this.addRealForm.get('image').value);
    this.http.post<any>(`${this.realService.realUrl}/upload`, formData )
      .subscribe(
        (res) => {
          console.log(res);
          real.image = res.data.name;

          this.realService.addReal(real).subscribe(result => result);
        });
  }


}
