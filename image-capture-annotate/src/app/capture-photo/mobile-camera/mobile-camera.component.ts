import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

interface Shape {
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

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
  lastX!: number;
  lastY!: number;

  shapes = ['Rectangle','Line']
  selectedShape = 'Rectangle'
  annotationsList: Shape[]=[];

  capturedImageUrl!: string;
  landscapeMode: boolean = false;
  image!: HTMLImageElement;

  constructor() { }

  ngOnInit() {}

    ngAfterViewInit() {
      if (this.imageElement && this.imageElement.nativeElement && this.canvasElement && this.canvasElement.nativeElement) {
        // Set the canvas size to match the image size 
        this.image = this.imageElement.nativeElement;
        const canvas = this.canvasElement.nativeElement;

        this.image.onload = () => {
          canvas.width = this.image.width;
          canvas.height = this.image.height;
        }
      } 
      else {
        console.error('Image or canvas element not found in ngAfterViewInit.');
      }
    }

  // Method to handle the 'Take Photo' button click event
  takePhoto(photoSource: HTMLInputElement): void {
    console.log('Inside take photo');

    // Check if there are files selected in the input element
    if (photoSource.files && photoSource.files.length > 0) {
      // Get the first selected file
      const photoSourceObj = photoSource.files[0];

      // Create a FileReader to read the file content
      const reader = new FileReader();

      // Event handler to set the capturedImageUrl when the file reading is complete
      const handleEvent = (event: Event) => {
        try {
          // Set the capturedImageUrl to the result of reading the file as a data URL
          this.capturedImageUrl = reader.result as string;
        } catch (error) {
          console.error('Error setting captured image URL:', error);
        }
      };

      // Event handler to handle errors during file reading
      const handleError = (error: ProgressEvent<FileReader>) => {
        console.error('Error reading the file:', error);
      };

      // Read the selected image file as a data URL
      reader.readAsDataURL(photoSourceObj);

      // Add an event listener to handle the 'load' event (when the reading is complete)
      reader.addEventListener('load', handleEvent);

      // Add an event listener to handle errors during file reading
      reader.addEventListener('error', handleError);
    }
  }


    // Method to handle the start of drawing when a touch event begins
  startDrawing(event: TouchEvent): void {
    try {
      // Prevent the default touch behavior
      event.preventDefault();

      console.log('Start drawing...');

      // Check if editing is allowed
      if (!this.isEditing) {
        return;
      }

      // Get the coordinates of the touch
      const touch = event.touches[0];
      if (touch) {
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        console.log('Coordinates:', this.startX, this.startY);
      } else {
        console.error('Error: Touch object is undefined.');
      }
    } catch (error) {
      console.error('Error during startDrawing:', error);
    }
  }


  // Method to handle touch movement for drawing shapes
  touchMove(event: TouchEvent): void {
    try {
      console.log('Touch move');

      // Prevent the default touch behavior
      event.preventDefault();
      event.stopPropagation();

      // Check if editing is allowed and start coordinates are defined
      if (!this.isEditing || this.startX === undefined || this.startY === undefined) {
        return;
      }

      console.log(event);

      // Get the coordinates of the current touch
      const touch = event.touches[0];
      if (!touch) {
        console.error('Error: Touch object is undefined.');
        return;
      }

      // Update the last coordinates
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;

      // Get the 2D rendering context of the canvas
      const ctx = this.canvasElement.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D rendering context.');
        return;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

      // Set the drawing styles
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2.5;

      // Draw the selected shape based on the user's choice
      if (this.selectedShape === 'Rectangle') {
        ctx.strokeRect(this.startX, this.startY, this.lastX - this.startX, this.lastY - this.startY);
      } else if (this.selectedShape === 'Line') {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.lastX, this.lastY);
        ctx.stroke();
        ctx.closePath();
      }
    } catch (error) {
      console.error('Error during touchMove:', error);
    }
  }


  // Method to handle the end of touch, completing the drawing process
  touchEnd(event: TouchEvent): void {
    try {
      // Create a shape object representing the drawn shape
      const shape: Shape = {
        type: this.selectedShape,
        startX: this.startX,
        startY: this.startY,
        endX: this.lastX,
        endY: this.lastY
      };

      console.log(shape);

      // Add the shape to the list of annotations
      this.annotationsList.push(shape);
      console.log('Annotations list:', this.annotationsList);

      // Get the 2D rendering context of the canvas
      const ctx = this.canvasElement.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D rendering context.');
        return;
      }

      // Clear the entire canvas
      ctx.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);

      // Set the drawing styles
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2.5;

      // Redraw all shapes, including the newly added one
      this.redrawShapes(ctx);
    } catch (error) {
      console.error('Error during touchEnd:', error);
    }
  }


  // Method to redraw all shapes stored in the annotationsList
  redrawShapes(ctx: CanvasRenderingContext2D): void {
    try {
      // Set the drawing styles
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2.5;

      // Iterate through each shape in the annotationsList
      this.annotationsList.forEach((shape) => {
        // Draw the shape based on its type
        if (shape.type === 'Rectangle') {
          ctx.strokeRect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
        } else if (shape.type === 'Line') {
          ctx.beginPath();
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          ctx.stroke();
          ctx.closePath();
        }
      });
    } catch (error) {
      // Handle any unexpected errors during the redrawShapes process
      console.error('Error during redrawShapes:', error);
    }
  }


  downloadImage(): void {
    try {
      // Create a temporary canvas to draw the annotated image
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
  
      // Check if the image and canvas context are available
      if (!this.image || !tempCtx) {
        console.error('Image or canvas context not available.');
        return;
      }
  
      // Set the temporary canvas size to match the image size
      tempCanvas.width = this.image.width;
      tempCanvas.height = this.image.height;
  
      console.log('Image dimensions:', this.image.width, '||', this.image.height);
  
      // Draw the original image on the temporary canvas
      tempCtx.drawImage(this.image, 0, 0, tempCanvas.width, tempCanvas.height);
  
      // Draw the annotations on the temporary canvas
      this.redrawShapes(tempCtx);
  
      // Convert the annotated image to a data URL
      const annotatedImageURL = tempCanvas.toDataURL('image/png');
  
      // Create a link element and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = annotatedImageURL;
      downloadLink.download = 'annotated_image.png';
      downloadLink.click();
    } catch (error) {
      console.error('Error during downloadImage:', error);
    }
  }
  

  // Method to download the coordinates as a JSON file
downloadCoordinates(): void {
  try {
    // Create a link element for the download
    const downloadLink = document.createElement('a');

    // Convert the annotations array to a formatted JSON string
    const annotationsJson = JSON.stringify(this.annotationsList, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([annotationsJson], { type: 'application/json' });

    // Set up the download link
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'annotations.json';

    // Trigger the download
    downloadLink.click();
  } catch (error) {
    console.error('Error during downloadCoordinates:', error);
  }
}

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

}

