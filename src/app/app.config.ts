import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { SnakeToCamelCaseInterceptor } from "./shared/snake-to-camel-case.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SnakeToCamelCaseInterceptor,
      multi: true,
    },
  ],
};
