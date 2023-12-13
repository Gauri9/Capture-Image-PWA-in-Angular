import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MobileCameraComponent } from './mobile-camera/mobile-camera.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: '', component: MobileCameraComponent },
];


@NgModule({
  declarations: [
    MobileCameraComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, 
    MatSelectModule,
    MatFormFieldModule,
  ],

})
export class CapturePhotoModule { }
