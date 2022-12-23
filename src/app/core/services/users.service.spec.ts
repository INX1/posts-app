import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from '../models/user';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  const dummyUsers: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an Observable of User[]', () => {
      service.getUsers().subscribe((users) => {
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(
        `https://jsonplaceholder.typicode.com/users`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });

  describe('getUser', () => {
    it('should return an Observable of User', () => {
      const userId = 1;

      service.getUser(userId).subscribe((user) => {
        expect(user).toEqual(dummyUsers[0]);
      });

      const req = httpMock.expectOne(
        `https://jsonplaceholder.typicode.com/users/1`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers[0]);
    });
  });
});
