import { Component, OnInit } from '@angular/core';

import 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf-calendario',
  templateUrl: './pdf-calendario.component.html',
  styleUrls: ['./pdf-calendario.component.css']
})
export class PdfCalendarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  docDefinition = {
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],
  
          body: [
            [ 'First', 'Second', 'Third', 'The last one' ],
            [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
            [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
          ]
        }
      }
    ]
  };

}
