import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  @ViewChild('form', {static: true}) form: any;
  public newItem;

  constructor() { }

  ngOnInit() {
    this.newItem = {
      heading: '',
      shortDesc: '',
      date: '',
      author: '',
      category: '',
      content: ''
    }
  }

  onSubmit() {
    console.log(this.form.form.value);
  }

}
