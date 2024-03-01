import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { UserService } from "../shared/user/user.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  constructor(
    private readonly pivotalService: UserService,
    router: Router
  ) {
    pivotalService.user$.subscribe((user) => {
      if (user) {
        router.navigate([
          "projects",
          user.projects[0].projectId,
          "iterations",
          "current",
        ]);
      }
    });
  }

  tokenForm = new FormGroup({
    token: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const token = this.tokenForm.value.token!;

    this.pivotalService.updateApiToken(token);
  }
}
