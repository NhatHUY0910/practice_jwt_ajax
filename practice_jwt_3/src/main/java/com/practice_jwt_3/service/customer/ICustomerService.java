package com.practice_jwt_3.service.customer;

import com.practice_jwt_3.model.Customer;

import java.util.List;

public interface ICustomerService {
    List<Customer> findAllCustomers();

    Customer findCustomerById(Long id);

    void saveCustomer(Customer customer);

    void updateCustomer(Customer customer);

    void deleteCustomerById(Long id);
}
