import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';

class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    return `${date.getFullYear()}`;
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
        parse: { dateInput: 'YYYY' },
        display: { dateInput: 'YYYY', monthYearLabel: 'YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'YYYY' },
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

  onYearSelected(date: Date, datepicker: MatDatepicker<Date>) {
    const normalizedYear = date.getFullYear();
    this.myForm.controls['date'].setValue(new Date(normalizedYear, 12, 0));
    datepicker.close();
    console.log(this.myForm.controls['date'].value);
  }

}
