import { provideRouter } from "@angular/router";
import { ApplicationConfig, InjectionToken, importProvidersFrom, isDevMode } from "@angular/core";
import { appRoutes } from "./app-routes";

import { HttpClientModule } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { USERS_KEY, userReducer } from "./store/users.reducers";
import { UsersEffects } from "./store/users.effects";


export const LOCAL_STORAGE_USERS_KEY = new InjectionToken<string>('LOCAL_STORAGE_USERS_KEY');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideStore({
      [USERS_KEY]: userReducer,
}),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        trace: false,
        traceLimit: 75,
    }),
    provideEffects(UsersEffects),
    {
      provide: LOCAL_STORAGE_USERS_KEY,
      useValue: 'users'
    }
],
}

