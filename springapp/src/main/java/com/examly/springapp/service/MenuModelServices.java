package com.examly.springapp.service;

import com.examly.springapp.repository.MenuModelRepository;
import com.examly.springapp.models.MenuModel;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class MenuModelServices {

    private MenuModelRepository menuModelRepository;

    @Autowired
    public MenuModelServices(MenuModelRepository menuModelRepository) {
        this.menuModelRepository = menuModelRepository;
    }

    // For adding menu.........................pratik
    public void addMenu(MenuModel menuModel) {
        menuModelRepository.save(menuModel);
    }

    // For editing menu.........................
    public String editMenu(Integer menuId, MenuModel updatedMenu) {
        Optional<MenuModel> existingMenu = menuModelRepository.findById(menuId);
        if (existingMenu.isPresent()) {
            MenuModel menu = existingMenu.get();

            // put all the tables column need to be edited
            menu.setFoodMenuType(updatedMenu.getFoodMenuType());
            menu.setFoodMenuItems(updatedMenu.getFoodMenuItems());
            menu.setFoodMenuCost(updatedMenu.getFoodMenuCost());
            menu.setImageUrl(updatedMenu.getImageUrl());


            menuModelRepository.save(menu);
            return "Menu edited";
        } else {
            return "Menu not found";
        }
    }
// For deleting menu.........................
    public String deleteMenu(Integer menuId) {
        Optional<MenuModel> existingMenu = menuModelRepository.findById(menuId);
        if (existingMenu.isPresent()) {
            menuModelRepository.deleteById(menuId);
            return "Menu details deleted";
        } else {
            return "Menu not found";
        }
    }

    // not working lines
    public MenuModel getMenu(Integer menuId) {
        if (menuId != null) {
            Optional<MenuModel> existingMenu = menuModelRepository.findById(menuId);
            return existingMenu.get();
        }
        return null;
    }


    public List<MenuModel> getMenu() {
        return menuModelRepository.findAll();
    }
}















//.................////////....... pratik