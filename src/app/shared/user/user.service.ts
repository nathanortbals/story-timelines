import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, of, shareReplay, switchMap } from "rxjs";
import { PIVOTAL_API_URL } from "../constants";
import { User } from "./user";

const LOCAL_STORAGE_KEY = "pivotal.apikey";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiToken = new BehaviorSubject<string | null>(
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );

  public apiToken$ = this.apiToken.asObservable();

  public isAuthenticated$ = this.apiToken.pipe(
    map((apiToken) => apiToken !== null)
  );

  public user$ = this.apiToken.pipe(
    switchMap((apiToken) => {
      if (apiToken === null) {
        return of(null);
      }

      return this.httpClient.get<User>(`${PIVOTAL_API_URL}/me`, {
        headers: { "X-TrackerToken": apiToken },
      });
    }),
    shareReplay()
  );

  constructor(private httpClient: HttpClient) {}

  updateApiToken(newApiToken: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY, newApiToken);
    this.apiToken.next(newApiToken);
  }

  logOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.apiToken.next(null);
  }
}
