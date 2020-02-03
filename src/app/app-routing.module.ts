import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { SocreDisplayComponent } from "./pages/socre-display/socre-display.component";
import { HistoryComponent } from "./pages/history/history.component";
import { SearchComponent } from "./pages/search/search.component";
import { GetHistoryDataResolver } from "./resolvers/get-history-data.service";
import { PublicGuard } from "./guards/public.guard";
import { PrivateGuard } from "./guards/private.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [PublicGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [PublicGuard]
  },
  {
    path: "private",
    children: [
      {
        path: "score",
        component: SocreDisplayComponent,
        canActivate: [PrivateGuard]
      },
      {
        path: "history/:playerName",
        component: HistoryComponent,
        resolve: {
          history: GetHistoryDataResolver
        },
        canActivate: [PrivateGuard]
      },
      {
        path: "search",
        component: SearchComponent,
        canActivate: [PrivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
