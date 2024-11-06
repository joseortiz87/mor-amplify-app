import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { uploadData } from "aws-amplify/storage";

@Component({
  selector: 'app-sleep-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-image-upload.component.html',
  styleUrl: './sleep-image-upload.component.css'
})
export class SleepImageUploadComponent {
  file: File | null = null;
  uploadSuccess: boolean = false;
  progress = 0;

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  async uploadFile(): Promise<void> {
    if (this.file) {

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(this.file);
      const name = this.file.name;
    
      fileReader.onload = async (event) => {
        try {
          let data : any = null;
          if(event.target) data = event.target.result;
          const result = await uploadData({
            path: name,
            // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
            data: data,
            options: {
              onProgress: ({ transferredBytes, totalBytes }) => {
                if (totalBytes) {
                  this.progress = Math.round((transferredBytes / totalBytes) * 100);
                  console.log(
                    `Upload progress ${Math.round(
                      (transferredBytes / totalBytes) * 100
                    )} %`
                  );
                }
              },
            },
          }).result;
          console.log("Path from Response: ", result.path);
        } catch (error) {
          console.log("Error : ", error);
        }
      }
    }
  }
}
