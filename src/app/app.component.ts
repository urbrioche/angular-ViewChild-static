import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // https://angular.io/guide/static-query-migration
  // angular8，加入了static
  @ViewChild('imStatic', { static: true }) imStatic: ElementRef;
  @ViewChild('imNotStatic', { static: false }) imNotStatic: ElementRef;
  @ViewChild('imStaticNgIf', { static: true }) imStaticNgIf: ElementRef;
  @ViewChild('imNotStaticNgIf', { static: false }) imNotStaticNgIf: ElementRef;

  // Angular9之後預設static:false
  // 沒有特別指定static的話只能在ngAfterViewInit拿到
  // 不會像之前的版本有的在ngOnInit，有的在ngAfterViewInit，這讓行為一致
  // @ViewChild('imStatic') imStatic: ElementRef;
  // @ViewChild('imNotStatic') imNotStatic: ElementRef;
  // @ViewChild('imStaticNgIf') imStaticNgIf: ElementRef;
  // @ViewChild('imNotStaticNgIf') imNotStaticNgIf: ElementRef;

  name = 'Angular ' + VERSION.major;

  show = true;

  ngOnInit(): void {
    console.log(
      'ngOnInit',
      'static',
      (this.imStatic?.nativeElement as HTMLDivElement)?.innerHTML
    );

    // static: false，不會在ngOnInit出現
    console.log(
      'ngOnInit',
      'non static',
      (this.imNotStatic?.nativeElement as HTMLDivElement)?.innerHTML
    );

    // 這個會是最大的問題，兩邊都抓不到
    console.log(
      'ngOnInit',
      'ngIf static',
      (this.imStaticNgIf?.nativeElement as HTMLDivElement)?.innerHTML
    );

    console.log(
      'ngOnInit',
      'ngIf non static',
      (this.imNotStaticNgIf?.nativeElement as HTMLDivElement)?.innerHTML
    );
  }

  ngAfterViewInit(): void {
    console.log(
      'ngAfterViewInit',
      'static',
      (this.imStatic?.nativeElement as HTMLDivElement)?.innerHTML
    );

    // static: true，會在ngAfterViewInit才出現
    console.log(
      'ngAfterViewInit',
      'non static',
      (this.imNotStatic?.nativeElement as HTMLDivElement)?.innerHTML
    );

    // 這個會是最大的問題，兩邊都抓不到
    console.log(
      'ngAfterViewInit',
      'ngIf static',
      (this.imStaticNgIf?.nativeElement as HTMLDivElement)?.innerHTML
    );

    console.log(
      'ngAfterViewInit',
      'ngIf non static',
      (this.imNotStaticNgIf?.nativeElement as HTMLDivElement)?.innerHTML
    );
  }
}
