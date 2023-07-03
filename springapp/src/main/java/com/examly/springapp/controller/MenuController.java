package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.beans.factory.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MenuController {
 @Autowired
 private MenuModelServices menuService;

 @PostMapping("admin/addMenu")
 public String saveNewMenu(@RequestBody MenuModel menuModel) {
  menuService.addMenu(menuModel);
  return "menu added";
 }

 @DeleteMapping("admin/deleteMenu/{id}")
 private String deleteMenu(@PathVariable("id") Integer foodmenuid) {
  return menuService.deleteMenu(foodmenuid);

 }

 @PutMapping("admin/editMenu/{id}")
 private String editMenu(@PathVariable("id") Integer foodmenuid, @RequestBody MenuModel updatedMenu) {
  return menuService.editMenu(foodmenuid, updatedMenu);

 }

    //for testcases
    @GetMapping("/admin/menu")
    public List<MenuModel> viewMenu() {
    return menuService.getMenu();
    }

}









//.......................###############. pratik
