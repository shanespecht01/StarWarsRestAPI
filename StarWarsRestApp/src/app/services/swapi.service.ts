import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { People } from '../models/People';


@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private apiConnection: string = "swapi.dev/api";

  constructor(private httpClient: HttpClient) { }

  PeopleData: People[] = [];
  FilmPeopleData: People[] = [];

  public getAllPeopleSorted() {
    var page1 = this.httpClient.get(`https://${this.apiConnection}/people`)
    page1.subscribe(data => {
      (data as any).results.forEach((people: People) => {
        (people as People).last_name = (this.transformname((people as People).name,true));
        (people as People).first_name = (this.transformname((people as People).name,false));
        (people as People).age = (this.transformbirth((people as People).birth_year));
        this.PeopleData.push((people as People));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePagesSorted((data as any).next);
      }
      this.PeopleData.sort((a:People,b:People) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => 
      (this.getPlanet(a.homeworld).subscribe(data => {(data as any).name}) > this.getPlanet(b.homeworld).subscribe(data => {(data as any).name})) ? 1 : 
      ((this.getPlanet(b.homeworld).subscribe(data => {(data as any).name}) > this.getPlanet(a.homeworld).subscribe(data => {(data as any).name})) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
    });
    return this.PeopleData
  }
  
  private getAllPeoplePagesSorted(url: string){
    var page1 = this.httpClient.get(url)
    page1.subscribe(data => {
      (data as any).results.forEach((people: People) => {
        (people as People).last_name = (this.transformname((people as People).name,true));
        (people as People).first_name = (this.transformname((people as People).name,false));
        (people as People).age = (this.transformbirth((people as People).birth_year));
        this.PeopleData.push((people as People));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePages((data as any).next);
      }
      this.PeopleData.sort((a:People,b:People) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => 
      (this.getPlanet(a.homeworld).subscribe(data => {(data as any).name}) > this.getPlanet(b.homeworld).subscribe(data => {(data as any).name})) ? 1 : 
      ((this.getPlanet(b.homeworld).subscribe(data => {(data as any).name}) > this.getPlanet(a.homeworld).subscribe(data => {(data as any).name})) ? -1 : 0))
      this.PeopleData.sort((a:People,b:People) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
    });
  }

  public getAllPeople() {
    var page1 = this.httpClient.get(`https://${this.apiConnection}/people`)
    page1.subscribe(data => {
      (data as any).results.forEach((people: People) => {
        (people as People).last_name = (this.transformname((people as People).name,true));
        (people as People).first_name = (this.transformname((people as People).name,false));
        this.PeopleData.push((people as People));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePages((data as any).next);
      }
    });
    return this.PeopleData
  }
  
  private getAllPeoplePages(url: string){
    var page1 = this.httpClient.get(url)
    page1.subscribe(data => {
      (data as any).results.forEach((people: People) => {
        (people as People).last_name = (this.transformname((people as People).name,true));
        (people as People).first_name = (this.transformname((people as People).name,false));
        this.PeopleData.push((people as People));
      });
      if ((data as any).next !== null) {
        this.getAllPeoplePages((data as any).next);
      }
    });
  }

  public getPeopleByFilm() {
    var films = this.httpClient.get(`https://${this.apiConnection}/films`)
    films.subscribe(data => {
      (data as any).results.forEach((film: any) => {
        if ((film as any).episode_id % 2 === 0)
        {
          (film as any).characters.forEach((character: any) => {
            this.getPerson(character).subscribe(people => {
              (people as People).last_name = (this.transformname((people as People).name,true)); 
              (people as People).first_name = (this.transformname((people as People).name,false));
              (people as People).age = (this.transformbirth((people as People).birth_year));
              (people as People).this_film = (film as any).title;
              this.getPlanet((people as People).homeworld).subscribe(data => {
                if(!(data as any).name)
                {
                  (people as People).home_planet = "N/A"
                }
                else
                {
                  (people as People).home_planet = (data as any).name
                }
              })
              this.FilmPeopleData.push((people as People));
            })
          });
        }
      });
    });
    return this.FilmPeopleData
  }

  public getPerson(url: string) {
    return this.httpClient.get(url)
  }

  public getAllPlanets() {
    return this.httpClient.get(`https://${this.apiConnection}/planets`)
  }

  private getPlanet(url: string) {
    return this.httpClient.get(url)
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

  private transformname(input: string, last: boolean): string {
    var lastSpaceIndex = input.lastIndexOf(' ');
    var firstName = input.substring(0, lastSpaceIndex);
    var lastName = input.substring(lastSpaceIndex+1);
    
    if (last)
    {
      if (firstName === "")
        return ""
      else
        return lastName
    }
    else {
      if (firstName === "")
        return lastName
      else
        return firstName
    }
  }

  private transformbirth(input: string): string {
    if (input === "unknown")
        return ""
      else
        return input.slice(0, -3)
   
  }

}
