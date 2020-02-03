import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Player } from "src/app/interfaces/player";
import { GameService } from "src/app/services/game.service";
import { Observable } from "rxjs";
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit {
  public history: any;
  public allHistory: any;
  public players: Observable<Player[]>;
  public selectedPlayer: string = "all";
  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.activatedRoute);
    this.history = this.activatedRoute.snapshot.data.history;
    this.allHistory = JSON.parse(JSON.stringify(this.history || null));
    this.players = this.gameService.search({ name: "" });
    this.activatedRoute.params.subscribe(params => {
      this.selectedPlayer = params.playerName;
      this.filterTable();
    });
  }

  changeRoute(event) {
    this.router.navigate(["/private/history/" + event.value]);
  }

  filterTable() {
    if (this.selectedPlayer !== "all") {
      this.history = [];
      if (this.allHistory && this.allHistory.length) {
        this.allHistory.map(item => {
          item.players.map(player => {
            if (player.name === this.selectedPlayer) {
              this.history.push(item);
            }
            return player;
          });
          return item;
        });
      }
    } else {
      this.history = this.allHistory;
    }
  }
}
