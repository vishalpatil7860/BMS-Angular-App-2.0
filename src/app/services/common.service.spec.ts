import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        HttpClientTestingModule,
        HttpTestingController
      ]
    });
    service = TestBed.inject(CommonService);  
  });

  beforeEach(() => {
    service = new CommonService(null);
  });

  it('[Common Service Definition Check]: Should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should behave...', () => {
  //   service.createUser(user);

  //   expect(user['cid').toBe('R-353');
  //   // service.
  // });
 
});


function user(user: string) {
  user = user;
}

