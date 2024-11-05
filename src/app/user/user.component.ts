import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { FormsModule } from '@angular/forms'; // Import FormsModule

const client = generateClient<Schema>();

interface User {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  date_of_birth: string | null;
  type: string | null;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: any[] = [];

  ngOnInit(): void {
    this.listUsers();
  }
  
  listUsers() {
    try {
      /*
      client.models.users.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.Users = items;
        },
      });*/
      console.log(client);
      client.models.User.list().then(items => {
        this.users = items.data;
      }).catch(error => {
        console.error('Error fetching users:', error);
      });
    } catch (error) {
      console.error('error fetching Users', error);
    }
  }
  
  createUser() {
    try {
      client.models.User.create({
        name: window.prompt('User name'),
      });
      this.listUsers();
    } catch (error) {
      console.error('error creating Users', error);
    }
  }
  
  deleteUser(id: string) {
    client.models.User.delete({ id })
  }

  async updateUser(user: User): Promise<void> {
    try {
      // Update user data
      await client.models.User.update({ // Update method may vary based on your client implementation
        id: user.id,
        email: user.email,
        date_of_birth: user.date_of_birth ? this.formatDate(user.date_of_birth) : null,
        type: user.type,
      });
      console.log(`User ${user.id} updated successfully!`);
      this.listUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}