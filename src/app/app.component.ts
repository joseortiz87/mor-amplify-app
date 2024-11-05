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

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule, UserComponent, CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  title = 'amplify-angular-template';
    
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
