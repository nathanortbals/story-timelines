import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProjectService } from "../project.service";

@Component({
  selector: "app-iteration",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./iteration.component.html",
  styleUrl: "./iteration.component.scss",
})
export class IterationComponent {
  constructor(public projectService: ProjectService) {}
}
