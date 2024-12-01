import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';  // Standalone component
import { provideRouter } from '@angular/router';
import {routes} from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),importProvidersFrom(BrowserAnimationsModule)],
})
.catch(err => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { AppComponent } from './app/app.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { environment } from './environments/environment';
// import {routes} from "./app/app.routes";

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(),
//     importProvidersFrom(
//       AngularFireModule.initializeApp(environment.firebase),
//       AngularFireAuthModule
//     ),
//   ],
// });