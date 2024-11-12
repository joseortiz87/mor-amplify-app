// sleep-analysis.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sleep-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sleep-analysis.component.html',
  styleUrls: ['./sleep-analysis.component.css']
})
export class SleepAnalysisComponent implements OnInit {
  @Input()
  analysisResult!: string;
  parsedData: any;

  ngOnInit(): void {
    // Parse JSON string if needed
    if (this.analysisResult) {
      this.parsedData = JSON.parse(this.analysisResult);
    }

    // Initialize chart for confidence level
    this.initializeChart();
  }

  initializeChart(): void {
    if (this.parsedData && this.parsedData.confidence) {
      const ctx = document.getElementById('confidenceChart') as HTMLCanvasElement;
      
      /*new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Confidence', 'Remaining'],
          datasets: [{
            data: [this.parsedData.confidence, 100 - this.parsedData.confidence],
            backgroundColor: ['#60A5FA', '#E5E7EB'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });*/

    }
  }
}
