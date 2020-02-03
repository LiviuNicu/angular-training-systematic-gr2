import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { GameService } from "../services/game.service";

@Injectable({
  providedIn: "root"
})
export class GetHistoryDataResolver implements Resolve<any> {
  constructor(private gameService: GameService) {}

  resolve(): Observable<any> {
    return this.gameService.getHistory();
  }
}
