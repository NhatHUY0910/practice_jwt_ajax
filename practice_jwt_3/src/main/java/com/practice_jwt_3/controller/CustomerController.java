package com.practice_jwt_3.controller;

import com.practice_jwt_3.model.Customer;
import com.practice_jwt_3.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping
    public ResponseEntity<List<Customer>>showAll(){
        return new ResponseEntity<>(customerService.findAllCustomers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer>pickOne(@PathVariable("id") Long id){
        return new ResponseEntity<>(customerService.findCustomerById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Customer customer){
        customerService.saveCustomer(customer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Customer customer){
        Customer existingCustomer = customerService.findCustomerById(id);
        if(existingCustomer != null){
            customer.setId(id);
            customerService.saveCustomer(customer);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id){
        customerService.deleteCustomerById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
