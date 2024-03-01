import { Routes } from "@angular/router";
import { LoginRedirectComponent } from "./login/login-redirect/login-redirect.component";
import { LoginComponent } from "./login/login.component";
import { IterationComponent } from "./projects/iterations/iteration.component";
import { ProjectComponent } from "./projects/project.component";
import { projectGuard } from "./projects/project.guard";
import { authGuard } from "./shared/user/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    children: [
      {
        path: "redirect",
        component: LoginRedirectComponent,
      },
    ],
  },
  {
    path: "projects/:projectId",
    canActivate: [authGuard, projectGuard],
    component: ProjectComponent,
    children: [
      {
        path: "iterations/:iterationId",
        component: IterationComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login/redirect",
  },
];
