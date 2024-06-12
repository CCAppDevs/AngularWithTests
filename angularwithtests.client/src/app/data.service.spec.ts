import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from './Customer';

const CUSTOMERS: Customer[] = [
  {
    firstName: "Alice",
    lastName: "Jones",
    id: 1,
    phone: '5551212'
  },
  {
    firstName: "Bob",
    lastName: "Jones",
    id: 2,
    phone: '5551213'
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

  it('should get all customers', () => {
    service.getAllCustomers().subscribe((customers: Customer[]) => {
      expect(customers).toBeTruthy();
      expect(customers.length).toBe(2);
      const secondCustomer = customers.find((cust: Customer) => cust.id === 2);
      expect(secondCustomer?.firstName).toBe('Bob');
    });
    const mockReq = testingController.expectOne('/api/customers');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(CUSTOMERS));
  })

  it('should add a new customer when addCustomer is called', () => {
    let john: Customer = {
      firstName: "John",
      lastName: "Doe",
      id: 0,
      phone: '5551214'
    };
    console.log("toast")
    service.addCustomer(john).subscribe(customer => {
      console.log("toast", customer)
      console.log(customer);
      expect(customer).toBeTruthy();
      expect(customer.firstName).toBe('John');
    });

    const mockReq = testingController.expectOne({ url: '/api/customers', method: 'POST' });
    expect(mockReq).toBeTruthy();
    mockReq.flush(john);
  });
});
