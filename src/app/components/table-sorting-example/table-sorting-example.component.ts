import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Filters, MainService } from 'src/app/services/main.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'table-sorting-example',
  styleUrls: ['table-sorting-example.component.scss'],
  templateUrl: 'table-sorting-example.component.html',
})
export class TableSortingExampleComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'avatar'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(filters?: Filters): void {
    this.mainService.fetchData(filters).subscribe((data: any) => {
      this.dataSource.data = data;
    })
  }

  onSortChange(sortState: Sort) {
    const filters: Filters = {
      sortBy: sortState.active,
      order: sortState.direction ? sortState.direction : undefined,
    };
    if(!filters.order) {
      filters.sortBy = undefined;
    }
    this.getData(filters);
  }

  onPaginationChange(pagination: any) {
    // To add pagination, the current filters should be added as class attributes and used along with pagination in the API call
    // Example:
    // getData(): void {
    //   this.mainService.fetchData(this.filters, this.pagination).subscribe((data: any) => {
    //     this.dataSource.data = data;
    //   })
    // }
  }
}
