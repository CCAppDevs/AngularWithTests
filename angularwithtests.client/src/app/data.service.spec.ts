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
      expect(secondCustomer?.firstName).toBe('Bob');
    })
    // assert
    // the call is a get request
    // the call is targetting /api/customers
    const mockReq = testingController.expectOne({ url: '/api/customers', method: 'GET' });
    mockReq.flush(CUSTOMERS);
  });


  it('should add a new customer when addCustomer is called', () => {
    let john: Customer = {
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        phone: '5553333'
    };

    service.addCustomer(john).subscribe(cust => {
      expect(cust).toBeTruthy();
      expect(cust.firstName).toBe('John');
    })

    const mockReq = testingController.expectOne({ url: '/api/customers', method: 'POST' });
    mockReq.flush(john);
  });

  it('should delete a customer when deleteCustomer is called', () => {
    service.deleteCustomer(1).subscribe(result => {
      expect(result).toBeNull();
    });
    const mockReq = testingController.expectOne({ url: '/api/customers/1', method: 'DELETE' });
    mockReq.flush(null);
  });

  it('should get one by id when getById is called', () => {
    let customer: Customer = {
        id: 2,
        firstName: 'Test',
        lastName: 'Customer',
        phone: '1234567'
    }

    service.getById(2).subscribe(cust => {
      expect(cust).toBeTruthy();
      expect(cust.firstName).toBe('Test');
      expect(cust.id).toBe(2);
    })

    const mockReq = testingController.expectOne({ url: '/api/customers/2', method: 'GET' });
    mockReq.flush(customer);
  });

  it('should return an error when getById is called with an invalid ID number', () => {

  });
});
