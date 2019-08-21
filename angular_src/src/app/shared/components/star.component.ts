import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from "@angular/core";


@Component({
  selector: 'app-star',
  templateUrl: "./star.component.html"


})
export class StarComponent implements OnInit {
  starWidth: number;
  @Input() rating: number;
  // @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    console.log(this.rating);
    this.starWidth = ((this.rating) * 100) / 10;
  }

}