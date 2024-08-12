/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Import your routes


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide your application routes
    provideHttpClient(),   // Provide HttpClient
    // Other providers if needed
  ],
})
  .catch((err) => console.error(err));
