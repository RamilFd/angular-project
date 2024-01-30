import { Routes } from '@angular/router';

// компоненты, которые сопоставляются с маршрутами
import { UsersListComponent } from "./components/users-list/users-list.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

// определение маршрутов
export const appRoutes: Routes = [
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: '',
    component: UsersListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
