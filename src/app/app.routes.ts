import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SleepImageUploadComponent } from './sleep-image-upload/sleep-image-upload.component';

export const routes: Routes = [
    { path: 'user', component: UserComponent },
    { path: 'sleep-image-upload', component: SleepImageUploadComponent },
    { path: '', redirectTo: '/user', pathMatch: 'full' }
];
