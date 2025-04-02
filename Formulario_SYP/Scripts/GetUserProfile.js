(function($){

  $(document).ready(function(){	  				
    // Ensure that the SP.UserProfiles.js file is loaded before the custom code runs.
    SP.SOD.executeOrDelayUntilScriptLoaded(loadUserData, 'SP.UserProfiles.js');	
  });
	
  var userProfileProperties = [];
//  var user = context.get_web().get_currentUser();
 // var context = SP.ClientContext.get_current();
  
  function loadUserData(){
		
    //Get Current Context	
    var clientContext = new SP.ClientContext.get_current();
    var user = clientContext.get_web().get_currentUser();
	
    //Get Instance of People Manager Class
    var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
    
    //Properties to fetch from the User Profile
    var profilePropertyNames = ["Manager","WorkEmail", "PublicSiteRedirect"];
    
    //Domain\Username of the user (If you are on SharePoint Online) 
    var targetUser = "i:0#.f|membership|rmontalvo@universal.com.do";
	//var targetUser = user.get_loginName();
    
    //If you are on On-Premise:
    //var targetUser = domain\\username
    
    //Create new instance of UserProfilePropertiesForUser
    var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(clientContext, targetUser, profilePropertyNames);
    userProfileProperties = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
    
    //Execute the Query.
    clientContext.load(userProfilePropertiesForUser);
    clientContext.executeQueryAsync(onSuccess, onFail);
    
  }
    
  function onSuccess() {
    
    var messageText = "\"Manager\" property is " + userProfileProperties[0];
    messageText += "\"Work Email\" property is " + userProfileProperties[1];
    messageText += "\"Public Site\" property is " + userProfileProperties[2];
    alert(messageText);
      
  }
	
  function onFail(sender, args) {
    alert("Error: " + args.get_message());
  }	
    							
})(jQuery);