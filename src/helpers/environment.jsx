let APIURL = "";

console.log(`HOST NAME: ${window.location.hostname}`);
switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;

  case "jbv-mybudget-tracker-client.herokuapp.com":
	APIURL = "https://jbv-mybudget-tracker.herokuapp.com";
    break;
	
	default: 
       alert('URL Error!');
       break;
}
export default APIURL;