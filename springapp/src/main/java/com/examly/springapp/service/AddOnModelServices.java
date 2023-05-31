package com.examly.springapp.service;
//........................ pratik
import com.examly.springapp.models.AddOnModel;
import com.examly.springapp.repository.AddOnModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddOnModelServices {
    private  AddOnModelRepository addOnModelRepository;

    @Autowired
    public AddOnModelServices(AddOnModelRepository addOnModelRepository) {
        this.addOnModelRepository = addOnModelRepository;
    }

    public void addAddOn(AddOnModel addOnModel) {
        addOnModelRepository.save(addOnModel);
    }

    public String editAddOn(Integer addOnId, AddOnModel updatedAddOn) {
        Optional<AddOnModel> existingAddOn = addOnModelRepository.findById(addOnId);
        if (existingAddOn.isPresent()) {
            AddOnModel addOn = existingAddOn.get();
            addOn.setAddOnName(updatedAddOn.getAddOnName());
            addOn.setAddOnDescription(updatedAddOn.getAddOnDescription());
            addOn.setAddOnPrice(updatedAddOn.getAddOnPrice());
            addOn.setImgUrlAddons(updatedAddOn.getImgUrlAddons());

            addOnModelRepository.save(addOn);
            return "AddOn edited";
        } else {
            return "AddOn not found";
        }
    }

    public String deleteAddOn(Integer addOnId) {
        Optional<AddOnModel> existingAddOn = addOnModelRepository.findById(addOnId);
        if (existingAddOn.isPresent()) {
            addOnModelRepository.deleteById(addOnId);
            return "AddOn details deleted";
        } else {
            return "AddOn not found";
        }
    }

    public AddOnModel getAddOn(Integer addOnId) {
        Optional<AddOnModel> existingAddOn = addOnModelRepository.findById(addOnId);
        return existingAddOn.orElse(null);
    }

    public List<AddOnModel> getAddOnList() {
        return addOnModelRepository.findAll();
    }

}









//......................... pratik