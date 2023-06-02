import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(val => {
      this.isLoading = val;
      this.cdr.detectChanges();
    });
  }
  
}
