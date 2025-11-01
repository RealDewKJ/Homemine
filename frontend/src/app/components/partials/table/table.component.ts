import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @Input() headers: string[] = [];

constructor() {
}
ngOnInit(): void {

}
}
