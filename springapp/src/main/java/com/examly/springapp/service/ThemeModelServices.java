package com.examly.springapp.service;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Service


public class ThemeModelServices {
    @Autowired
    private ThemeModelRepository themeModelRepository;

    public ThemeModelServices(ThemeModelRepository themeModelRepository){
        this.themeModelRepository = themeModelRepository;
    }


    public ThemeModel addTheme(ThemeModel themeModel){
       return themeModelRepository.save(themeModel);
    }
    // for editing the theme
    public String editTheme(int themeId, ThemeModel updatedTheme){
        Optional<ThemeModel> themeid = themeModelRepository.findByThemeId(themeId);
        if(themeid.isPresent()) {

            ThemeModel theme = themeid.get();
            theme.setThemeName(updatedTheme.getThemeName());
            theme.setThemeimgUrl(updatedTheme.getThemeimgUrl());
            theme.setThemeDescription(updatedTheme.getThemeDescription());
            theme.setThemephotographer(updatedTheme.getThemephotographer());
            theme.setThemeVideographer(updatedTheme.getThemeVideographer());
            theme.setThemeReturnGift(updatedTheme.getThemeReturnGift());
            theme.setCost(updatedTheme.getCost());

            themeModelRepository.save(theme);
            return "Themes edited";
        }
        else{
            return "Themes not edited";
        }
    }


    //for deleting the theme
    public String deleteTheme(Integer themeId){
        Optional<ThemeModel> themeModel=themeModelRepository.findByThemeId(themeId);
        if(themeModel.isPresent()){
            themeModelRepository.deleteById(themeId);
            return "Theme details deleted";
        }
        return "Theme not Found";
    }

    public ThemeModel getTheme(Integer id){
        Optional<ThemeModel> themeModel=themeModelRepository.findById(id);
        if(themeModel.isPresent()){
            return themeModel.get();
        }
        return null;
    }

    public List<ThemeModel> getTheme(){
        return themeModelRepository.findAll();
    }
}







//........................ pratik
