import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Register } from './register/register';
import { MatchScorecard } from './scorecard/match-scorecard';
import { MatchDetails } from './scorecard/match-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'register', component: Register },
  { path: 'scorecard', component: MatchScorecard },
  { path: 'scorecard/:id', component: MatchDetails }
];
