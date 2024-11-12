import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { SleepImageUploadComponent } from './sleep-image-upload/sleep-image-upload.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgChartsModule } from 'ng2-charts';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule, UserComponent, CommonModule, FormsModule, SleepImageUploadComponent, TopBarComponent, NgChartsModule],
})
export class AppComponent implements OnInit {
  title = 'amplify-angular-template';
  menuOpen = false;
    
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
