import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { PublicMenuComponent } from "./components/public-menu/public-menu.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SocreDisplayComponent } from './pages/socre-display/socre-display.component';
import { SearchComponent } from './pages/search/search.component';
import { HistoryComponent } from './pages/history/history.component';
import { PrivateMenuComponent } from './components/private-menu/private-menu.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { IsServingFilterPipe } from './pipes/is-serving-filter.pipe';
import { HilightIsServingDirective } from './directives/hilight-is-serving.directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PublicMenuComponent,
    SocreDisplayComponent,
    SearchComponent,
    HistoryComponent,
    PrivateMenuComponent,
    PlayerDetailsComponent,
    IsServingFilterPipe,
    HilightIsServingDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
