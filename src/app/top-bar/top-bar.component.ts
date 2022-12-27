import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  selector: boolean = false;
  

  selectorDropdown() {
    this.selector = !this.selector;
  }
  
  selected: string = "Collections";
  isToggle: number;
/*   isToggle: number = 1; */


  constructor() { }

  ngOnInit() {
  }

}
