
//Define base url for all operations
export const BaseUrl = "https://8080-ceddbecfbbacaefefbdecbeaedcfdfabbdb.project.examly.io";


export async function signUpUser(email, mobileNumber, password, userType, userName) {
    const user = {
      "email":email,
      "mobileNumber":mobileNumber,
      "password":password,
      "userRole":userType,
      "username":userName
    };
  //ceddbecfbbacaefefbdecbeaedcfdfabbdb ------------ pratik terminal
    try {

      const response = await fetch(`${BaseUrl}/user/signup`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          mobileNumber: mobileNumber,
          password: password,
          userRole: userType,
          username: userName,
        }),
      });
      const data = await response.json()
      alert(`${data.message}`);
      if(user.userRole==="admin"){
        window.location.href = "/admin/login";
      }else {
        window.location.href = "/user/login";
      }
      return data; 
    } catch (error) {
      alert("Error registering user/admin"+error.message);
      
    }
  }

export async function loginUser(email, password) {

      try{

        const res = await fetch(`${BaseUrl}/user/login`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        
        return res;
      }catch(error){
          alert("Error logging user/admin" + error.message);
          return error;
      }
    
}
