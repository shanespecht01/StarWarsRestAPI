import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { People } from '../../models/People';
import { SplitPipe } from '../../split.pipe';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [SplitPipe]
})
export class PeopleComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'height',
    'mass',
    'hair_color',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
    // 'homeworld',
    // 'species',
    // 'films',
    // 'vehicles',
    // 'starships',
    // 'created',
    // 'edited',
    // 'url'
  ];
  dataSource: any;
  peopledata: any;
  filters: any;
  filterKeys: any;
  filterEntity: any;
  filterType: any;

  reducer = (accumulator: boolean, currentValue: boolean) => accumulator && currentValue;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.getAllPeople();
  }

  ngOnDestroy(): void {
    //this.getPeopleByFilm()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllPeople() {
    const table = of(this.SwapiService.getAllPeople());
    table.subscribe(result => {
      this.peopledata = result;
      this.dataSource = new MatTableDataSource<People>(this.peopledata)
    });
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;

    const filvaluearr: any[] = filvalue.split('|');
    console.log(filvaluearr)

    this.dataSource.filter = filvaluearr;
  }

  applyFilter(column: string, filterValue: string) {
    if (!this.filters[column]) {
      this.filters[column] = ""
    }
    this.filters[column] = filterValue;
    this.filterKeys = Object.keys(this.filters)
    this.dataSource.filter = JSON.stringify(this.filters);
    //this.getAllPeople()
  }

  setupFilter() {
    return (d: any, filter: string) => {
      let conditions: any;
      conditions = [];
      this.filterKeys.forEach((filterKey: string) => {
        conditions.push(this.searchString(d[filterKey], this.filters[filterKey]))
      });
      return conditions.reduce(this.reducer);
    };
  }

  searchString(columnValue: string, filterVales: string) {
    const textToSearch = columnValue && columnValue.toLowerCase() || '';
    return textToSearch.indexOf(filterVales.toLowerCase()) !== -1;
  }
}
