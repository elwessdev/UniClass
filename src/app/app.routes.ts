import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './home/class/class.component';
import { CardsComponent } from './home/cards/cards.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", component: LandingComponent },
    { path: "signin", component: SigninComponent },
    { path: "signup", component: SignupComponent },
    {
        path: "home",
        component: HomeComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "",
                component: CardsComponent,
            },
            {
                path: 'details',
                component: ClassComponent,
            },
        ],
    },
    { path: '**', redirectTo: '/signin' }, // Redirect all other paths to the sign-in page
];