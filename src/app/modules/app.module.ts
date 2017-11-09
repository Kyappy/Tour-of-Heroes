import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppComponent} from '../components/app/app.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {HeroDetailComponent} from '../components/hero-detail/hero-detail.component';
import {HeroSearchComponent} from '../components/hero-search/hero-search.component';
import {HeroesComponent} from '../components/heroes/heroes.component';
import {MessagesComponent} from '../components/messages/messages.component';
import {HeroService} from '../services/hero.service';
import {InMemoryDataService} from '../services/in-memory-data.service';
import {MessageService} from '../services/message.service';
import {AppRoutingModule} from './app-routing.module';

/**
 * App module.
 */
@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
	],
	declarations: [
		AppComponent,
		DashboardComponent,
		HeroesComponent,
		HeroDetailComponent,
		MessagesComponent,
		HeroSearchComponent
	],
	providers: [HeroService, MessageService],
	bootstrap: [AppComponent]
})
export class AppModule {}