import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CapturePhotoModule } from './capture-photo/capture-photo.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => CapturePhotoModule,
      },
    ],
  }
];



@NgModule({
  declarations: [
    AppComponent, 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CapturePhotoModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
