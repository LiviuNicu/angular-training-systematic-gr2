import { Component, OnInit } from "@angular/core";
import { Player } from "src/app/interfaces/player";
import { GameService } from "src/app/services/game.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  public players: Player[] = [];
  public name: string = "";
  public textChanged: Subject<string> = new Subject<string>();
  public isServingState: boolean = false;
  constructor(private gameService: GameService) {}

  ngOnInit() {
    console.log("SUNT PE SEARCH SI NU SUNT LOGAT");
    this.search("");
    this.textChanged.pipe(debounceTime(3000)).subscribe(response => {
      this.search(response);
    });
  }

  setServingState(value) {
    this.isServingState = value;
  }

  onFieldChanged() {
    this.textChanged.next(this.name);
  }

  search(name) {
    this.gameService.search({ name: name }).subscribe((response: Player[]) => {
      this.players = response;
    });
  }
}
