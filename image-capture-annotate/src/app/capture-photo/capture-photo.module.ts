import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MobileCameraComponent } from './mobile-camera/mobile-camera.component';

const routes: Routes = [
  { path: '', component: MobileCameraComponent },
  // Add more routes as needed
];


@NgModule({
  declarations: [
    MobileCameraComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class CapturePhotoModule { }
