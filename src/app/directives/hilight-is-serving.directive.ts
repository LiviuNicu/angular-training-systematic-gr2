import { Directive, Input, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appHilightIsServing]"
})
export class HilightIsServingDirective implements OnInit {
  @Input() isServing;
  constructor(private element: ElementRef) {}
  ngOnInit() {
    if (this.isServing) {
      this.element.nativeElement.style.color = "red";
    }
  }
}
