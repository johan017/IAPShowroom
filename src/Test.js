// Require selenium webdriver
let webdriver = require("selenium-webdriver");

// Require webdriver for chrome
// browser called chromedriver
require("chromedriver");

// Build new window of chrome
let driver = new webdriver.Builder()
	.forBrowser("chrome").build();

// Open geeksforgeeks using get method
driver.get("http://localhost:3000/");
