import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  news = of([
    {
      heading: 'cats',
      category: 'Animals',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
      shortDesc: 'Lorem ipsum dolor sit amet',
      date: '08/21/2019',
      author: 'Samanda Baker',
      id: '1'
    },
    {
      heading: 'new cats',
      category: 'Animals',
      content: 'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      shortDesc: 'ex ea commodo consequat.',
      date: '03/07/2020',
      author: 'John Smith',
      id: '2'
    },
    {
      heading: 'Some history',
      category: 'Humans',
      content: 'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      shortDesc: 'ex ea commodo consequat.',
      date: '03/09/2020',
      author: 'John Snow',
      id: '3'
    }
  ]);

  sources = of([
    'Animals',
    'Humans',
    'Aliens'
  ]);

  constructor() { }
}




