import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { of } from "rxjs";
import { ProjectService } from "./project.service";

export const projectGuard: CanActivateFn = (route, state) => {
  const projectService = inject(ProjectService);

  const projectId = parseInt(route.params["projectId"]);
  if (Number.isNaN(projectId)) {
    return of(false);
  }

  return projectService.setCurrentProject(projectId);
};
