

import { Component, OnInit, DoCheck } from '@angular/core';
import { BehaviorSubject, noop } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.scss']
})
export class MobileCameraComponent implements OnInit{
  capturedImageUrl: string | undefined;
  landscapeMode: boolean = false;
  // deviceWidth: number = window.innerWidth;
  // deviceHeight: number = window.innerHeight;


  constructor() { }

  ngOnInit() {
    // window.addEventListener('resize', () => {
    //   this.deviceWidth = window.innerWidth;
    //   this.deviceHeight = window.innerHeight;
    // });

  }

  
  takePhoto(photoSource: HTMLInputElement): void {
    console.log('inside take photo')
    this.capturedImageUrl = 'inside take photo'
    if (photoSource.files && photoSource.files.length > 0) {
      const photoSourceObj = photoSource.files[0];
      const reader = new FileReader();

      // reader.onload = (e) => {
      //   this.capturedImageUrl = 'inside onload'
      //   this.capturedImageUrl = reader.result as string;
      //   console.log('Captured Image URL:', this.capturedImageUrl);

      //   // this.capturedImageUrl = imageUrl;

      // };

      const handleEvent = (event: Event) => {
        this.capturedImageUrl = reader.result as string;
        console.log('Captured Image URL:', this.capturedImageUrl);

        const img = new Image();
          img.src = this.capturedImageUrl;

          if (!img.complete) {
              img.onload = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                console.log('Aspect Ratio:', aspectRatio);
              };
            }

      }
      
      // Read the selected image file as a data URL
      reader.readAsDataURL(photoSourceObj);
      reader.addEventListener("load", handleEvent);
      
    }
  }

  toggleLandscapeMode() {
    this.landscapeMode = !this.landscapeMode;
  }



}

