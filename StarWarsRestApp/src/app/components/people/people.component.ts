import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { People } from '../../models/People';
//import * as alertify from 'alertifyjs'
import { SplitPipe } from '../../split.pipe';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [SplitPipe]
})
export class PeopleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
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

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.getAllPeople();
  }

  ngAfterViewInit(): void  {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  getAllPeople() {
    const table =of(this.SwapiService.getAllPeople());
    table.subscribe(result => {
      this.peopledata = result;
      this.dataSource = new MatTableDataSource<People>(this.peopledata)
      //this.rerender();
    });
  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
}
 