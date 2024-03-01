import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "app-login-redirect",
  standalone: true,
  imports: [],
  templateUrl: "./login-redirect.component.html",
  styleUrl: "./login-redirect.component.scss",
})
export class LoginRedirectComponent {
  constructor(userService: UserService, router: Router) {
    userService.user$.subscribe((user) => {
      if (user) {
        router.navigate([
          "projects",
          user.projects[0].projectId,
          "iterations",
          "current",
        ]);
      } else {
        router.navigate(["login"]);
      }
    });
  }
}
