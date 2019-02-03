import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public readonly loadMore = 'Load More';
  public articlesList = [
    {
      imagePath: 'assets/mock-image.jpg',
      headLine: 'Head Line 1',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkAddress: 'www.google.com',
      date: '19, Jan 2019',
      time: '14:00'
    },
    {
      imagePath: 'assets/mock-image.jpg',
      headLine: 'Head Line 1',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkAddress: 'www.google.com',
      date: '19, Jan 2019',
      time: '14:00'
    },
    {
      imagePath: 'assets/mock-image.jpg',
      headLine: 'Head Line 1',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkAddress: 'www.google.com',
      date: '19, Jan 2019',
      time: '14:00'
    },
    {
      imagePath: 'assets/mock-image.jpg',
      headLine: 'Head Line 1',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkAddress: 'www.google.com',
      date: '19, Jan 2019',
      time: '14:00'
    },
    {
      imagePath: 'assets/mock-image.jpg',
      headLine: 'Head Line 1',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      linkAddress: 'www.google.com',
      date: '19, Jan 2019',
      time: '14:00'
    }
  ];
}
