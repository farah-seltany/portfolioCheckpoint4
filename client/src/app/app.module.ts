import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion';
import { CarousselComponent } from './caroussel/caroussel.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { CompetencesComponent } from './competences/competences.component';
import { RealisationsComponent } from './realisations/realisations.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CompAddComponent } from './competences/comp-add/comp-add.component';
import { RealAddComponent } from './realisations/real-add/real-add.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    CarousselComponent,
    HomeComponent,
    SkillsComponent,
    CompetencesComponent,
    RealisationsComponent,
    ContactComponent,
    AdminComponent,
    CompAddComponent,
    RealAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
