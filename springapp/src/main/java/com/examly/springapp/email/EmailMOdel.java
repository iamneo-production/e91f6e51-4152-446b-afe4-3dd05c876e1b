package com.examly.springapp.email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
 
public class EmailMOdel {
    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
