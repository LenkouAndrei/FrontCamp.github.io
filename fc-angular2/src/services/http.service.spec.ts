import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {HttpService} from './http.service';

describe('GithubApiService', () => {
  let injector: TestBed;
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    injector = getTestBed();
    service = injector.get(HttpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<INewsAPISource[]>', () => {
      const dummyUsers = [
        {
          category: 'category',
          country: 'country',
          description: 'description',
          id: 'id',
          language: 'language',
          name: 'name',
          sortBysAvailable: ['sortBysAvailable', 'sortBys'],
          url: 'url',
        },
        {
          category: 'category2',
          country: 'country2',
          description: 'description2',
          id: 'id2',
          language: 'language2',
          name: 'name2',
          sortBysAvailable: ['sortBysAvailable2', 'sortBys2'],
          url: 'url2',
        }
      ];

      service.getSourceList().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne( `https://newsapi.org/v1/sources?&apiKey=b7898b8ae1f042849321a38b58c68df0`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });
});
