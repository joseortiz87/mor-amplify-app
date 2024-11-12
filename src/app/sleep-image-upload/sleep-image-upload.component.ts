import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from "aws-amplify/storage";
import type { Schema } from '../../../amplify/data/resource';
import { SleepAnalysisComponent } from '../sleep-analysis/sleep-analysis.component';

const client = generateClient<Schema>();

@Component({
  selector: 'app-sleep-image-upload',
  standalone: true,
  imports: [CommonModule, SleepAnalysisComponent],
  templateUrl: './sleep-image-upload.component.html',
  styleUrl: './sleep-image-upload.component.css'
})
export class SleepImageUploadComponent {
  file: File | null = null;
  uploadSuccess: boolean = false;
  progress = 0;
  imagePreviewUrl: string | ArrayBuffer | undefined | null = null; // To store and display image preview
  result: any = null;

  onFileSelected(event: any): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.showImagePreview();
    }
  }

    // Method to display image preview
  showImagePreview(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result; // Store the preview URL
      };
      reader.readAsDataURL(this.file); // Generate a data URL for image preview
    }
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

          this.callSleepAnalysis(result.path);

        } catch (error) {
          console.log("Error : ", error);
        }
      }
    }
  }

  async callSleepAnalysis(imagePath: string): Promise<void> {
    try {
      const response : any = await client.queries.doSleepAnalysis({
        imageKey: imagePath,
        userId: ''
      });
      console.log("Sleep Analysis Result: ", response);
      // Parse the string inside result.data to JSON
      const parsedData = JSON.parse(response.data);

      // Now you can access properties like a JSON object
      console.log(parsedData.statusCode);       // 200
      console.log(parsedData.isSleeping);       // false
      console.log(parsedData.confidence);       // 99.99864196777344
      console.log(parsedData.message);          // "Sleep analysis completed"
      this.result = response.data;

    } catch (error) {
      console.log("Error in Sleep Analysis: ", error);
    }
  }
}
