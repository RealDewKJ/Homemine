import { Component, Input } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-ratings.component.html'
})
export class StarRatingsComponent {

  @Input()
  stars!: number;

  @Input()
  size: number = 1;

  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6
    }
  }


  getStartImage(current:number): string {
    const previousHalf = current - 0.5;
    const imageNmae =
    this.stars >= current
    ? 'star-full'
    : this.stars >= previousHalf
    ? 'star-half'
    : 'star-empty'
    return `/assets/stars/${imageNmae}.svg`
  }
}
