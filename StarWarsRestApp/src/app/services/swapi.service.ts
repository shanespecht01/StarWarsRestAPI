import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiConnection: string = "swapi.dev/api";
  constructor(private httpClient: HttpClient) { }

  public getAllPeople() {
    return this.httpClient.get(`https://${this.apiConnection}/people/`)
  }

  public getAllPlanets() {
    return this.httpClient.get(`https://${this.apiConnection}/planets/`)
  }

  public getAllFilms() {
    return this.httpClient.get(`https://${this.apiConnection}/films/`)
  }

  public getAllSpecies() {
    return this.httpClient.get(`https://${this.apiConnection}/species/`)
  }

  public getAllVehicles() {
    return this.httpClient.get(`https://${this.apiConnection}/vehicles/`)
  }

  public getAllStarships() {
    return this.httpClient.get(`https://${this.apiConnection}/starships/`)
  }
}
