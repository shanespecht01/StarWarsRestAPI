import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject,tap } from 'rxjs';
import { compileDeclareInjectorFromMetadata } from '@angular/compiler';
import { People } from '../models/People';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiConnection: string = "swapi.dev/api";

  
  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient) { }

  PeopleData: any[] = [];

  public get10People() {    
    var page1 = this.httpClient.get(`https://${this.apiConnection}/people`)
    page1.subscribe(data => {
    (data as any).results.forEach((people: any) => {
      this.PeopleData.push((people as any));
    });
  });
  
  return this.PeopleData
}

  public getAllPeople() {
    var page1 = this.httpClient.get(`https://${this.apiConnection}/people`)
    page1.subscribe(data => {
      (data as any).results.forEach((people: any) => {
        this.PeopleData.push((people as any));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePages((data as any).next);
      }
    });
    //console.log(this.PeopleData)
    return this.PeopleData

  }
  
  private getAllPeoplePages(url: string){
    var page1 = this.httpClient.get(url)
    page1.subscribe(data => {
      (data as any).results.forEach((people: any) => {
        this.PeopleData.push((people as any));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePages((data as any).next);
      }
    });
  }

  public getAllPlanets() {
    return this.httpClient.get(`https://${this.apiConnection}/planets`)
  }

  public getAllFilms() {
    return this.httpClient.get(`https://${this.apiConnection}/films`)
  }

  public getAllSpecies() {
    return this.httpClient.get(`https://${this.apiConnection}/species`)
  }

  public getAllVehicles() {
    return this.httpClient.get(`https://${this.apiConnection}/vehicles`)
  }

  public getAllStarships() {
    return this.httpClient.get(`https://${this.apiConnection}/starships`)
  }

}
