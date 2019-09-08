import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { single } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public initialNewsData: any[];
  public displayedNews: any[];
  public sources: string[];
  public filterValue: string = '';
  public selectedCategory: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.news.subscribe((values) => {
      this.initialNewsData = values;
      this.displayedNews = values;
    });
    this.dataService.sources.subscribe((values) => {
      this.sources = values;
      this.selectedCategory = values[0];
      this.filterAndCategorize();
    });
  }

  filterValues() {
    this.filterAndCategorize();
  }

  onSelectChanged(selectedVal) {
    this.selectedCategory = selectedVal;
    this.filterAndCategorize();
  }

  filterAndCategorize() {
    this.displayedNews = this.initialNewsData.filter((singleItem) => {
      if (this.selectedCategory) {
        return singleItem.category === this.selectedCategory && singleItem.content.includes(this.filterValue);
      } else {
        return singleItem.content.includes(this.filterValue);
      }
    });
  }

}
