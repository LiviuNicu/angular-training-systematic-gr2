import { Component, OnInit } from "@angular/core";
import { Player } from "src/app/interfaces/player";
import { GameService } from "src/app/services/game.service";

@Component({
  selector: "app-socre-display",
  templateUrl: "./socre-display.component.html",
  styleUrls: ["./socre-display.component.scss"]
})
export class SocreDisplayComponent implements OnInit {
  public players: Player[] = [];
  public newPlayer: Player = {
    name: "",
    score: 0,
    isServing: false,
    winner: false
  };
  public winner: Player;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.playersAdObs.subscribe((players: Player[]) => {
      this.players = players;
    });
  }

  addPlayer(player: Player): void {
    const playerToAdd = JSON.parse(JSON.stringify(player));
    // this.players.push(playerToAdd);
    this.gameService.addPlayer(playerToAdd);
    this.newPlayer = {
      name: "",
      score: 0,
      isServing: false,
      winner: false
    };
  }

  getSum(players: Player[]) {
    return players.reduce((sum, currentItem) => {
      return (sum += currentItem.score);
    }, 0);
  }

  verifyWinner() {
    this.winner = this.players.find(item => item.score === 21);
    if (this.winner) {
      this.addToWinnersHistory();
    }
  }

  addToWinnersHistory() {
    this.gameService.addToHistory(this.players).subscribe(response => {
      console.log(response);
    });
  }

  updatePlayer() {
    const sum = this.getSum(this.players);

    if (sum % 5 === 0) {
      this.players.map(item => {
        item.isServing = !item.isServing;
        return item;
      });
    }

    this.verifyWinner();
    this.gameService.updatePlayers(this.players);
  }

  newPlayers() {
    //this.players = [];
    this.gameService.updatePlayers([]);
    this.winner = null;
  }

  resetScore() {
    this.players.map(item => {
      item.score = 0;
      return item;
    });
    this.winner = null;
    this.gameService.updatePlayers(this.players);
  }
}
