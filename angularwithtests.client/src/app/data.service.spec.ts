import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from './Customer';

const CUSTOMERS: Customer[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Person',
    phone: '5551111'
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Jones',
    phone: '5551212'
  }
]

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


  it('should get all customers when getAllCustomers is called', () => {
    // arrange

    // act
    service.getAllCustomers().subscribe((results: Customer[]) => {
      expect(results).toBeTruthy();
      expect(results.length).toBe(2);
      const secondCustomer = results.find((c: Customer) => c.id === 2);
      expect(secondCustomer?.firstName).toBe('Alice');
    })
    // assert
    // the call is a get request
    // the call is targetting /api/customers
    const mockReq = testingController.expectOne('/api/customers');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(CUSTOMERS));
  });


  it('should add a new customer when addCustomer is called', () => {

  })
});
