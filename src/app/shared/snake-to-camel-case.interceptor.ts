import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable()
export class SnakeToCamelCaseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: this.keysToCamelCase(event.body),
          });
        }

        return event;
      })
    );
  }

  private keysToCamelCase(arg: any | any[]): any | any[] {
    if (Array.isArray(arg)) {
      return arg.map((argItem) => this.keysToCamelCase(argItem));
    }

    if (arg === Object(arg)) {
      return Object.fromEntries(
        Object.entries(arg).map(([key, value]) => [
          this.toCamelCase(key),
          this.keysToCamelCase(value),
        ])
      );
    }

    return arg;
  }

  // https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
  private toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, (substr) => {
      return substr.toUpperCase().replace("-", "").replace("_", "");
    });
  }
}
