import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { mergeAll, of, switchAll } from 'rxjs';
import { People } from '../../models/People';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  data: People[] = [];

  jsonheader: any[] = [
    'this_film',
    'home_planet',
    'age',
    'last_name',
    'name',
    'height',
    'mass',
    'gender',
    'hair_color',
    'eye_color',
    'skin_color',
    'birth_year',
    'url'
  ];

  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.getPeopleByFilm()
  }

  ngOnDestroy(): void {
  }

  getPeopleByFilm() {
    of(this.SwapiService.getPeopleByFilm()).pipe().subscribe((result:People[]) => {
      const uniqueArray = result.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === result.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });
      this.data = uniqueArray
    });
  }

  downloadFile() {
    const myClonedArray: any[] = [];
    this.data.map((a: any) => myClonedArray.push(Object.assign({}, (a as any))));
    const a = document.createElement("a");
    a.href = "data:text/csv," + this.ConvertToCSV(
      ((JSON.parse(JSON.stringify(myClonedArray))).sort(
        ((a: People, b: People) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))).sort(
          ((a: People, b: People) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0))).sort(
            ((a: People, b: People) => (a.home_planet > b.home_planet) ? 1 : ((b.home_planet > a.home_planet) ? -1 : 0))).sort(
              ((a: People, b: People) => (a.this_film > b.this_film) ? 1 : ((b.this_film > a.this_film) ? -1 : 0)))), this.jsonheader);
    let filename = "sampleCSVDownload";
    a.setAttribute("download", filename + ".csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }
}
