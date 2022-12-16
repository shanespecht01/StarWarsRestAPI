import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: any = DataTableDirective;
  //dtElement: any = DataTableDirective;
  results: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private SwapiService: SwapiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      autoWidth: true,
      responsive: true,
    };
    this.getAllPeople();
  }
   
  getAllPeople() {
    this.SwapiService.getAllPeople().subscribe(data => {
      //console.log(data as any)
      this.results = (data as any).results;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next(null);
    });
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.header()).on('keyup change', function () {
          if (that.search() !== (this as HTMLInputElement)['value']) {
            that.search((this as HTMLInputElement)['value']).draw();
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}