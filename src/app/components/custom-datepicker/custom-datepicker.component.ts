import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    const dateFormatted = formatDate(date, 'YYYY/MM', 'en-GB');
    return dateFormatted;
  }
}

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'YYYY/MM' },
        display: { 
          dateInput: 'YYYY/MM', 
          monthYearLabel: 'MMMM YYYY', 
          dateA11yLabel: 'LL', 
          monthYearA11yLabel: 'MMMM YYYY' 
        },
      },
    },
  ],
})
export class CustomDatepickerComponent {

  myForm: FormGroup = new FormGroup({
    date: new FormControl('')
  });

  constructor() {
  }

  onMonthSelected(date: Date, datepicker: MatDatepicker<Date>) {
    this.myForm.controls['date'].setValue(date);
    datepicker.close();
    console.log(formatDate(date, 'YYYY/MM/dd HH:mm', 'en-GB'));
  }

}
