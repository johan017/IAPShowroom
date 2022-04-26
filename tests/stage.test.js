const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;

const HOME = "/home";


const production = false;
const apple = true;



const showroom = "https://iapshowroom.ece.uprm.edu";
const local = "http://localhost:3000";

const chromecapabilities = webdriver.Capabilities.chrome(); // for chrome to work the chromedriver must be accessible in the PATH variable
const firefoxcapabilities = webdriver.Capabilities.firefox(); // for firefox to work the chromedriver must be accessible in the PATH variable

const safari = "safari";

const IAPSHOWROOMHOSTNAME = production ? showroom : local;

const TESTUSER = "test123@gmail.com";
const TESTPASSWORD = "testpassword";

let chromedriver =  new webdriver.Builder()
                    .withCapabilities(chromecapabilities)
                    .build();

let firefoxdriver = new webdriver.Builder()
                    .withCapabilities(firefoxcapabilities)
                    .build();

let safaridriver;

if(apple) safaridriver = new webdriver.Builder().forBrowser(safari).build();

var drivers;

// drivers = [safaridriver, chromedriver, firefoxdriver];
drivers = apple ? [firefoxdriver, chromedriver, safaridriver] : [firefoxdriver, chromedriver];

beforeAll(async () => {
    for(let i = 0; i<drivers.length; i++){
        LoginToIAPShowroom(drivers[i]);
    }
}, 10000);
  
afterAll(async () => {
    for(let i = 0; i<drivers.length; i++){
        await drivers[i].close();
    }
});

async function LoginToIAPShowroom(driver){
    //To fetch IAP Showroom's Hostname from the browser.
    await driver.get(IAPSHOWROOMHOSTNAME);
         
    //To send a TESTUSER and TESTPASSWORD inputs by passing the values.
    await driver.findElement(By.name('email')).sendKeys(TESTUSER);
    await driver.findElement(By.name('password')).sendKeys(TESTPASSWORD);

     await driver.findElement(By.name("Log In")).click();


}

jest.setTimeout(40000);

test('this test navigates to Stage and verifies BBB iframe is inside and clicks microphone to join audio', async () => {
    // browser finds and click Stage in navbar

    for(let i = 0; i<drivers.length; i++){

        await drivers[i].get(IAPSHOWROOMHOSTNAME+HOME);

        let stageXpath = '//*[@id="root"]/div/div/nav/div/div/a[2]';
        await drivers[i].wait(until.elementLocated(By.xpath(stageXpath)), 6000);
        await drivers[i].findElement(By.xpath(stageXpath)).click();

        //To send a search query by passing the value in searchString.
        let BBB_iframe_Xpath = '//*[@id="root"]/div/div/div/div[2]/iframe[2]';
        await drivers[i].wait(until.elementLocated(By.xpath(BBB_iframe_Xpath)), 6000);
        
        // switch driver to iframe
        let BBB_iframe = await drivers[i].findElement(By.xpath(BBB_iframe_Xpath));
        await drivers[i].switchTo().frame(BBB_iframe);

        // microphone inside iframe is visible
        let BBB_mic_Xpath = '/html/body/div[5]/div/div/div[1]/div/div/span/button[1]/span[1]';
        await drivers[i].wait(until.elementLocated(By.xpath(BBB_mic_Xpath)), 20000);
        await drivers[i].findElement(By.xpath(BBB_mic_Xpath)).click();

    }
});

test('this test navigates to Stage and verifies BBB iframe is inside and clicks headphone to listen-only', async () => {
    // browser finds and click Stage in navbar
    for(let i = 0; i<drivers.length; i++){

        await drivers[i].get(IAPSHOWROOMHOSTNAME+HOME);

        let stageXpath = '//*[@id="root"]/div/div/nav/div/div/a[2]';
        await drivers[i].wait(until.elementLocated(By.xpath(stageXpath)), 6000);
        await drivers[i].findElement(By.xpath(stageXpath)).click();

        //To send a search query by passing the value in searchString.
        let BBB_iframe_Xpath = '//*[@id="root"]/div/div/div/div[2]/iframe[2]';
        await drivers[i].wait(until.elementLocated(By.xpath(BBB_iframe_Xpath)), 6000);
        
        // switch driver to iframe
        let BBB_iframe = await drivers[i].findElement(By.xpath(BBB_iframe_Xpath));
        await drivers[i].switchTo().frame(BBB_iframe);

        // microphone inside iframe is visible
        let BBB_headphone_Xpath = '/html/body/div[5]/div/div/div[1]/div/div/span/button[2]/span[1]';
        await drivers[i].wait(until.elementLocated(By.xpath(BBB_headphone_Xpath)), 30000);
        await drivers[i].findElement(By.xpath(BBB_headphone_Xpath)).click();

    }
});