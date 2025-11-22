import { Routes } from '@angular/router';
import { CreateTaskComponent } from './pages/create-task/create.task.component/create.task.component';
import { EditTaskComponent } from './pages/edit-task/edit.task.component/edit.task.component';
import { ListTaskComponent } from './pages/list-task/list.task.component/list.task.component';

export const routes: Routes = [
    {path:"", redirectTo:"tasks", pathMatch:"full"},
    {path:"tasks",component: ListTaskComponent},
    {path:"edit/:id",component: EditTaskComponent},
    {path:"create",component: CreateTaskComponent},
    {path:"**",redirectTo:"tasks"} //poderia criar uma component UI 404
];
