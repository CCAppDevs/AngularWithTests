import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new customer when addCustomer is called', () => {
    service.addCustomer().subscribe((customers: any) => {
      expect(customers).toBeTruthy();
      expect(customers.length).toBe(2);
      const secondCustomer = customers.find((customer: any) => customer.customerID === 2);
      expect(secondCustomer.firstName).toBe('Bob');
    });

    const mockReq = testingController.expectOne('api/customers');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(CUSTOMERS));
  });
});
