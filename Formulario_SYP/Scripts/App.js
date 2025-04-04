﻿'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

var collList;


(function () {

    // This code runs when the DOM is ready and creates a context object which is 
    // needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName(); 
    });

    // This function prepares, loads, and then executes a SharePoint query to get 
    // the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
	
       // $('#message').text('Hola ' + user.get_title());
	    $('#txtSolicitante').val(user.get_title());
		$('#txtCorreo').val(user.get_email());
		$('#txtFechaHora').val(new Date().toLocaleString());
		GetCodigoEMP(user.get_email());
		
		$.get("https://services.universal.com.do/Uniforms/api/bsolicitudes", function(data) {
			  console.log(data);
		});
		
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
		

})();