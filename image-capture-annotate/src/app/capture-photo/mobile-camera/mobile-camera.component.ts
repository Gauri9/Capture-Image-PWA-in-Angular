import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-camera',
  templateUrl: './mobile-camera.component.html',
  styleUrls: ['./mobile-camera.component.scss']
})
export class MobileCameraComponent implements OnInit{
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  isEditing = false;
  startX!: number;
  startY!: number;

  capturedImageUrl!: string;
  landscapeMode: boolean = false;

  constructor() { }

  ngOnInit() {}

    ngAfterViewInit() {
      if (this.imageElement && this.imageElement.nativeElement &&
          this.canvasElement && this.canvasElement.nativeElement) {
        // Set the canvas size to match the image size
        const image = this.imageElement.nativeElement;
        const canvas = this.canvasElement.nativeElement;

        canvas.width = image.width;
        canvas.height = image.height;
        console.log('width || height',image.width, image.height)
      } else {
        console.error('Image or canvas element not found in ngAfterViewInit.');
      }
    }



  startDrawing(event: TouchEvent) {
    event.preventDefault();
    console.log('start drawing...')
    if (!this.isEditing) return;
    const touch = event.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    console.log('co-ordinates:-',this.startX,this.startY)
  }

  touchMove(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log('touchmove');
    if (!this.isEditing || this.startX === undefined || this.startY === undefined) return;

    const ctx = this.canvasElement.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D rendering context.');
      return;
    }

    console.log('ctx',ctx)
    const touch = event.touches[0];
    const width = touch.clientX - this.startX;
    const height = touch.clientY - this.startY;

    ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.startX, this.startY, width, height);
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  
  takePhoto(photoSource: HTMLInputElement): void {
    console.log('inside take photo')
    if (photoSource.files && photoSource.files.length > 0) {
      const photoSourceObj = photoSource.files[0];
      const reader = new FileReader();    

      const handleEvent = (event: Event) => {
        this.capturedImageUrl = reader.result as string;
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

