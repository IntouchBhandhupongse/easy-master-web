import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export type Master = {
  hn: string;
  first_name: string;
  last_name: string;
  tel: string;
  email: string;
}

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent implements OnInit{

  dataSource = new MatTableDataSource<Master>();
  isLoadingData: boolean = false;
  Coloumn = ['operation', 'hn', 'name', 'tel', 'email'];

  length = 0;
  page = 1;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatTable)table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }

  async ngOnInit() {

  }

  ngAfterViewInit() {
    //SetSort and paninator DataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
