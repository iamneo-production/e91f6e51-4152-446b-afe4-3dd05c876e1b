const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
 
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.click('#signupLink');
      await page.waitForNavigation();
      await page.type('#email', 'test@gmail.com');
      await page.type('#username', 'testuser');
      await page.type('#mobileNumber', '9876543210');
      await page.type('#password', 'Test@123');
      await page.type('#confirmPassword', 'Test@123');
      await page.click('#submitButton');
      await page.waitForNavigation();
      await page.waitForSelector('#loginButton',{timeout:3000});
      console.log('TESTCASE:FE_signup:success');
    }
     catch(e){
      console.log('TESTCASE:FE_signup:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{

    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.type('#email', 'test@gmail.com');
      await page.type('#password', 'Test@123');
      await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#logout',{timeout:3000});
      console.log('TESTCASE:FE_login:success');
    }
     catch(e){
      console.log('TESTCASE:FE_login:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{

    await page.setViewport({
      width:1200,
      height:800,
    })
    await page.type('#email', 'test@gmail.com');
    await page.type('#password', 'Test@123');
    await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#logout',{timeout:3000});
      await page.click('#UserBookEvent');
      await page.waitForSelector('#eventGrid1',{timeout:3000});
      await page.click('#eventGrid1');
      await page.waitForSelector('#nextPageButton',{timeout:3000});
      await page.click('#nextPageButton');
      await page.waitForSelector('#bookEvent',{timeout:3000});
      console.log('TESTCASE:FE_userBookEventOperation:success');
    }
     catch(e){
      console.log('TESTCASE:FE_userBookEventOperation:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{

  await page.setViewport({
    width:1200,
    height:800,
  })
  await page.type('#email', 'test@gmail.com');
  await page.type('#password', 'Test@123');
  await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#UserViewBookEvent');
    await page.waitForSelector('#viewBookingBody',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_userViewBookingOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_userViewBookingOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{

  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#adminTheme');
    await page.waitForSelector('#addTheme',{timeout:3000});
    await page.click('#adminFoodMenu');
    await page.waitForSelector('#addItemButton',{timeout:3000});
    console.log('TESTCASE:FE_adminThemeAndFoodMenuOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminThemeAndFoodMenuOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{

  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#logout',{timeout:3000});
    await page.click('#adminAddOns');
    await page.waitForSelector('#addOnsGrid1',{timeout:3000});
    await page.click('#editOns1');
    await page.waitForSelector('#updateAddOns',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_adminAddOnsOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminAddOnsOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();