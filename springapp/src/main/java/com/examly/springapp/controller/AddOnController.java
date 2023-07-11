package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.beans.factory.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AddOnController {
    @Autowired
    private AddOnModelServices addOnService;

    @PostMapping("admin/addAddon")
    public String saveNewAddOn(@RequestBody AddOnModel addOnModel) {
        addOnService.addAddOn(addOnModel);
        return "Add-on added";
    }

    @DeleteMapping("admin/deleteAddOn/{id}")
    private String deleteAddOn(@PathVariable("id") Integer addOnId) {
        return addOnService.deleteAddOn(addOnId);
    }

    @PutMapping("admin/editAddon/{id}")
    private String editAddOn(@PathVariable("id") Integer addOnId, @RequestBody AddOnModel updatedAddOn) {
        return addOnService.editAddOn(addOnId, updatedAddOn);
    }

    //for test cases
    @GetMapping("/admin/add-on")
    public List<AddOnModel> viewAddOn() {
        return addOnService.getAddOnList();
    }

    
}







//.......................***********. pratik