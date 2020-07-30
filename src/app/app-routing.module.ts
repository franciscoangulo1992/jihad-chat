// import {ModuleWithProviders} from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'sobre-jihad', component: AboutComponent},
  {path: 'chat-bot', component: ChatbotComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
