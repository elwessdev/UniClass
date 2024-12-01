import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ClassComponent } from './class/class.component';
import { CardsComponent } from './cards/cards.component';
import { AuthGuard } from './auth.guard';  // Import your AuthGuard

export const routes: Routes = [
    { path: "", component: HomeComponent },
    // { path: "signin", component: SigninComponent },
    // { path: "signup", component: SignupComponent },
    // { path: "home", component: HomeComponent},
    // {
    //     path: "home", 
    //     component: HomeComponent,
    //     canActivateChild: [AuthGuard],  // Apply the AuthGuard here to protect this route
    //     children: [
    //         {
    //             path: "",
    //             component: CardsComponent,
    //         },
    //         {
    //             path: 'details',
    //             component: ClassComponent,
    //         },
    //     ],
    // },
    // { path: '**', redirectTo: '/signin' }, // Redirect all other paths to the sign-in page
];