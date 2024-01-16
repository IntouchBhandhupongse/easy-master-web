import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../_services/master.service';
import { faFilePen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MasterDialogComponent } from './master-dialog/master-dialog.component';

export type Master = {
  id: string;
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
export class MasterComponent implements OnInit {

  dataSource = new MatTableDataSource<Master>();
  isLoadingData: boolean = false;
  Coloumn = ['operation', 'hn', 'first_name', 'tel', 'email'];

  length = 0;
  page = 1;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];

  // FA ICON
  faFilePen = faFilePen;
  faPlus = faPlus;

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
  ) {
  }

  async ngOnInit() {
    this.getMaster();
  }

  getMaster() {
    this.isLoadingData = true;

    this.masterService.getall().subscribe((res: any) => {
      if (res) {
        this.length = res.length;
        this.dataSource.data = res;

      } else {
        this.length = 0;
        this.dataSource.data = [];
      }
      this.isLoadingData = false;
    });
  }

  onClick(master?: Master) {
    const dialogRef = this.dialog.open(MasterDialogComponent, {
      panelClass: 'full-screen-modal',
      disableClose: true,
      width: '75%',
      data: {master},
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMaster();
      }
    });
  }

  ngAfterViewInit() {
    //SetSort and paninator DataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
