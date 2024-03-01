import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Project } from "./project";
import { ProjectService } from "./project.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: "./project.component.html",
  styleUrl: "./project.component.scss",
})
export class ProjectComponent {
  user$: Observable<User | null>;
  currentProject$: Observable<Project | null>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.user$ = userService.user$;
    this.currentProject$ = projectService.currentProject$;
  }

  logOut() {
    this.userService.logOut();
  }
}
