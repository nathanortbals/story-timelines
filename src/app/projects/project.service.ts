import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { PIVOTAL_API_URL } from "../shared/constants";
import { UserService } from "../shared/user/user.service";
import { Project } from "./project";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private cachedProjects: { [id: number]: Project | null } = {};

  private currentProject = new BehaviorSubject<Project | null>(null);

  currentProject$ = this.currentProject.asObservable();

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  setCurrentProject(projectId: number): Observable<boolean> {
    const cachedProject = this.cachedProjects[projectId];

    if (cachedProject) {
      this.currentProject.next(cachedProject);
      return of(true);
    }

    return this.userService.apiToken$.pipe(
      switchMap((apiToken) => {
        if (!apiToken) {
          return of(null);
        }

        console.log(apiToken);

        return this.httpClient.get<Project>(
          `${PIVOTAL_API_URL}/projects/${projectId}`,
          {
            headers: { "X-TrackerToken": apiToken },
          }
        );
      }),
      tap((project) => {
        this.cachedProjects[projectId] = project;
        this.currentProject.next(project);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
