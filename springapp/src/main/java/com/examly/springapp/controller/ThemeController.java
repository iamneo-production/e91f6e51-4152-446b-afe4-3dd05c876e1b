package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.beans.factory.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ThemeController {
    @Autowired
    private ThemeModelServices ThemeService;

    @PostMapping("admin/addTheme")
    public String saveNewTheme(@RequestBody ThemeModel themeModel) {
        ThemeService.addTheme(themeModel);
        return "theme added";
    }
//  for
    @DeleteMapping("admin/deleteTheme/{id}")
    private String deleteTheme(@PathVariable("id") Integer themeid) {
        ThemeService.deleteTheme(themeid);
        return "theme deleted";
    }


    @PutMapping("admin/editTheme/{id}")
    private String editTheme(@PathVariable("id") Integer themeid, @RequestBody ThemeModel updatedTheme) {
        ThemeService.editTheme(themeid, updatedTheme);
        return "theme edited";
    }


    @GetMapping("admin/viewTheme")
    public List<ThemeModel> viewtheme() {
        return ThemeService.getTheme();
    }
}


