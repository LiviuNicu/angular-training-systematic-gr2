import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "src/app/interfaces/player";

@Component({
  selector: "app-player-details",
  templateUrl: "./player-details.component.html",
  styleUrls: ["./player-details.component.scss"]
})
export class PlayerDetailsComponent implements OnInit {
  @Input() details: Player;
  @Input() winner: Player;
  @Output() actionScoreChanged: EventEmitter<Player> = new EventEmitter<
    Player
  >();
  constructor() {}

  ngOnInit() {}

  addToScore() {
    console.log(this.winner);
    if (!this.winner) {
      this.details.score++;
      this.actionScoreChanged.emit(this.details);
    }
  }
}
