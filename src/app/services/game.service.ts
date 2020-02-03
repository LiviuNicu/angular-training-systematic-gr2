import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { Player } from "../interfaces/player";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public url = environment.url;
  private players = new BehaviorSubject<Player[]>([]);
  public playersAdObs = this.players.asObservable();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  addPlayer(player: Player): void {
    this.players.next([...this.players.getValue(), player]);
  }
  updatePlayers(players: Player[]) {
    this.players.next(players);
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: "Bearer " + this.authService.getToken()
      }),
      withCredentials: false
    };
  }

  addToHistory(players: Player[]): Observable<any> {
    return this.http
      .post(this.url + "game/add", players, this.getHeaders())
      .pipe(catchError(this.handleError("addToHistory")));
  }

  getHistory(): Observable<any> {
    return this.http
      .get(this.url + "game/getHistory", this.getHeaders())
      .pipe(catchError(this.handleError("getHistory")));
  }

  search(data): Observable<Player[]> {
    // data = {nama: ""} if name is empty all the players will be received
    return this.http
      .post(this.url + "game/players/search", data, this.getHeaders())
      .pipe(catchError(this.handleError("search"))) as Observable<Player[]>;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {
        this.router.navigate(["/login"]);
      }

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
