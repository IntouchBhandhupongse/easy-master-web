import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCircleArrowLeft, faFloppyDisk, faX } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { MasterService } from '../../_services/master.service';

@Component({
  selector: 'app-master-dialog',
  templateUrl: './master-dialog.component.html',
  styleUrl: './master-dialog.component.scss'
})
export class MasterDialogComponent {

  form!: FormGroup;

  // FA ICON
  faCircleArrowLeft = faCircleArrowLeft;
  faFloppyDisk = faFloppyDisk;
  faX = faX;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MasterDialogComponent>,
    private fb: FormBuilder,
    private masterService: MasterService,

  ) {

    this.form = this.fb.group({
      id: [''],
      hn: [''],
      first_name: [''],
      last_name: [''],
      tel: [''],
      email: [''],
    });

    if (data.master) {
      delete data.master.created_at;
      delete data.master.updated_at;
      delete data.master.is_active;
      // console.log(data.master);

      this.form.patchValue(data.master);
    }
  }

  onAdd() {
    let reqdata = {
      ...this.form.value,
    }

    if (!this.form.valid) {
      let error_text = "กรุณาตรวจสอบความครบถ้วนของข้อมูล";

      Swal.fire({
        title: error_text,
        icon: 'warning',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#104E8E',
      });

      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'ยืนยันการบันทึกข้อมูล',
      html: '<h4 style="margin: 0px;">กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนคลิกปุ่ม "ยืนยัน"</h4>',
      showCancelButton: true,
      confirmButtonColor: '#008b8b',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed === true) {

        Swal.fire({
          title: 'กำลังดำเนินการ',
          imageUrl: "assets/loading/loading-buffering.gif",
          imageWidth: 100,
          imageHeight: 100,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            this.masterService.postmaster(reqdata).subscribe(
              {
                next: (res) => {
                  Swal.close();
                  if (res) {
                    Swal.fire({
                      icon: 'success',
                      title: 'บันทึกสำเร็จ',
                      showConfirmButton: false,
                      allowOutsideClick: false,
                      timer: 2000,
                      timerProgressBar: true,
                    }).then(() => {
                      this.dialogRef.close(true);
                    })
                  }
                },
                error: (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อมูลผิดพลาด',
                    confirmButtonText: 'ปิดหน้าจอ',
                  })
                }
              }
            );
          }
        });
      }
    });
  }

  onSave() {
    let reqdata = {
      ...this.form.value,
    }

    if (!this.form.valid) {
      let error_text = "กรุณาตรวจสอบความครบถ้วนของข้อมูล";

      Swal.fire({
        title: error_text,
        icon: 'warning',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#104E8E',
      });

      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'ยืนยันการบันทึกข้อมูล',
      html: '<h4 style="margin: 0px;">กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนคลิกปุ่ม "ยืนยัน"</h4>',
      showCancelButton: true,
      confirmButtonColor: '#008b8b',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed === true) {

        Swal.fire({
          title: 'กำลังดำเนินการ',
          imageUrl: "assets/loading/loading-buffering.gif",
          imageWidth: 100,
          imageHeight: 100,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            this.masterService.putmaster(this.form.value.id, reqdata).subscribe(
              {
                next: (res) => {
                  Swal.close();
                  if (res) {
                    Swal.fire({
                      icon: 'success',
                      title: 'บันทึกสำเร็จ',
                      showConfirmButton: false,
                      allowOutsideClick: false,
                      timer: 2000,
                      timerProgressBar: true,
                    }).then(() => {
                      this.dialogRef.close(true);
                    })
                  }
                },
                error: (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อมูลผิดพลาด',
                    confirmButtonText: 'ปิดหน้าจอ',
                  })
                }
              }
            );
          }
        });
      }
    });
  }

  onDelete() {
    Swal.fire({
      icon: 'question',
      title: 'ยืนยันการลบ',
      showCancelButton: true,
      confirmButtonColor: '#f08080',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed === true) {

        Swal.fire({
          title: 'กำลังดำเนินการ',
          imageUrl: "assets/loading/loading-buffering.gif",
          imageWidth: 100,
          imageHeight: 100,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            this.masterService.deletemaster(this.form.value.id).subscribe(
              {
                next: (res) => {
                  Swal.close();
                  if (res) {
                    Swal.fire({
                      icon: 'success',
                      title: 'บันทึกสำเร็จ',
                      showConfirmButton: false,
                      allowOutsideClick: false,
                      timer: 2000,
                      timerProgressBar: true,
                    }).then(() => {
                      this.dialogRef.close(true);
                    })
                  }
                },
                error: (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อมูลผิดพลาด',
                    confirmButtonText: 'ปิดหน้าจอ',
                  })
                }
              }
            );
          }
        });
      }
    });
  }
}
