import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  private id: string;
  public selectedNews: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.params.newsId;
  }

  ngOnInit() {
    this.dataService.news.pipe(
      map((newsArray) => {
        return newsArray.find((val) => {
          return val.id === this.id;
        });
      })
    ).subscribe((value) => {
      this.selectedNews = value;
    });
  }
}
