
// This code is used to send to a SharePoint list all the fields values and attachments.
$(document).ready(function(){
	$('#button').click(function(){
		//SaveItemToList();
	});
});

var  hostUrl="https://segurosuniversal.sharepoint.com/misolicitudes";
var itemID;
var currentcontext;
var BizagyCase;
var personasEvaluar= "";
var xml;

function SaveItemToList() {
	
		cleanTextbox("txtDescReq");
		SP.UI.ModalDialog.showWaitScreenWithNoClose('Creando caso', 'Espere mientras creamos el caso en el sistema...');
		
	   $('.table > tbody:nth-child(2) tr').each(function(){		 
		personasEvaluar +="Departamento:"+ $(this).first('td').find('#ddlEvaDepartam option:selected').val()+";"+
						"Puesto:"+ $(this).first('td').find('#ddlEvaPuesto option:selected').val()+";"+
						"NombreCompleto:"+ $(this).first('td').find('#txtNombComp').val()+";"+
						"Observaciones:"+ $(this).first('td').find('#txtEvaObs').val()+';'+
						"Correopersona:"+ $(this).first('td').find('#txtEvaEmail').val()+";||";		
	  });
	
	xml = constructXML( 
		$('#ddlEmpresa option:selected').val(),
		$('#ddlProcBiz option:selected').val(),
		$('#txtSolicitante').val(),
		$('#txtCorreo').val(),
		$('#txtSupervisor').val(),
		$('#txtSupCorreo').val(),
		$('#txtCodigo').val(),
		$('#ddlArea option:selected').val(), 
		$('#ddlDireccion option:selected').val(),
		$('#ddlDepartamento option:selected').val(),
		$('#ddlPuesto option:selected').val(),
		$('#txtTelefono').val(),
		($('#infoCorrecSi').prop('checked') == true ? "Si" : "No" ),
		$('#txtFechaHora').val(),
		"AdjDoc",
		$('#EstadoSolicitud').val(),
		$('#ddlRequerimiento option:selected').val(),
		$('#FechaVencim').val(),
		$('#ddlSistemas option:selected').val(),
		$('#ddlTiProductiv option:selected').val(),
		$('#ddlReqNotAudi option:selected').val(),
		$('#txtNomObserv').val(),
		$('#txtDescReq').val(),
		( $('#casoAsociSi').prop('checked') == true ? "true" : "false" ),
		$('#txtNumCasoAsoc').val());
	 
	    CreateCase(xml);
 
}

function onGetWebFail(sender, args){
	alert('Failed to get lists filtered. Error:' + args.get_message());
}




function CreateFile(inputID,size)
{
    // Ensure the HTML5 FileReader API is supported
    if (window.FileReader)
    {
      var  input = document.getElementById(inputID);
        if (input)
        {
			for(var i=0; i< size;i++){
            var file = input.files[i];
            var fr = new FileReader();
            fr.onload = receivedBinary;
            fr.readAsDataURL(file);	
			}
        }
    }
    else
    {
        alert("The HTML5 FileSystem APIs are not fully supported in this browser.");
    }
}
 
// Callback function for onload event of FileReader
function receivedBinary()
{
    // Get the ClientContext for the app web
    clientContext = new SP.ClientContext.get_current();
    // Use the host web URL to get a parent context - this allows us to get data from the parent
    parentCtx = new SP.AppContextSite(clientContext, hostUrl);
    parentWeb = parentCtx.get_web();
    parentList = parentWeb.get_lists().getByTitle("Documents");
 
    fileCreateInfo = new SP.FileCreationInformation();
    fileCreateInfo.set_url(file.name);
    fileCreateInfo.set_overwrite(true);
    fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
 
    // Read the binary contents of the base 64 data URL into a Uint8Array
    // Append the contents of this array to the SP.FileCreationInformation
    var arr = convertDataURIToBinary(this.result);
    for (var i = 0; i < arr.length; ++i)
    {
        fileCreateInfo.get_content().append(arr[i]);
    }
 
    // Upload the file to the root folder of the document library
    newFile = parentList.get_rootFolder().get_files().add(fileCreateInfo);
    clientContext.load(newFile);
    clientContext.executeQueryAsync( function(){ onSuccess(newFile); }, onFailure);
 

}

 
 
function onSuccess(newFile)
{
    // File successfully uploaded
	alert('file created');
	var item = newFile.get_listItemAllFields();
    clientContext.load(item);
    clientContext.executeQueryAsync();
 
	
    item.set_item('Formulario', 'SYP');
	item.set_item('ItemID',  itemID );
    item.update();
	 clientContext.executeQueryAsync();
    alert("File uploaded successfuly!");
}
 
function onFailure()
{
    // Error occurred
    alert("Request failed: " + arguments[1].get_message());
}
 
// Utility function to remove base64 URL prefix and store base64-encoded string in a Uint8Array
// Courtesy: https://gist.github.com/borismus/1032746
function convertDataURIToBinary(dataURI)
{
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
 
    for (i = 0; i < rawLength; i++)
    {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}
 

function SaveItemToView() {
		
	currentcontext = new SP.ClientContext.get_current();
	var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
	var web = hostcontext.get_web();
	 
	currentcontext.load(web);
	currentcontext.executeQueryAsync();
	
	var list = web.get_lists().getByTitle('View_Formulario_SYP');
	var itemCreateInfo = new SP.ListItemCreationInformation();
	var oListItem = list.addItem(itemCreateInfo);
		oListItem.set_item('Title', 'New Item');
		oListItem.set_item('Solicitudes', '<a href="https://segurosuniversal.sharepoint.com/misolicitudes/Formulario_SYP/Pages/Default.aspx?D=a@yh@husk&ItemID='+itemID+'">Formulario: '+itemID+'</a>');
	    oListItem.set_item('Id_caso',idCaso);
		oListItem.update();

	
	currentcontext.load(oListItem);
	currentcontext.executeQueryAsync(
		function(){
			// cerrar
			var modalDialog = SP.UI.ModalDialog;
			modalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 'Cancelled'); 
			$('[id*="btnEnviar"]').prop("disabled", true);
			alert('Su caso número ' + idCaso + ' se ha creado de manera satisfactoria');
			setTimeout( function(){  
				window.location = 'https://segurosuniversal.sharepoint.com/misolicitudes/Paginas/sistemasyprocesos.aspx';
			}, 1000);
			}, 
		function(){ 
			alert('Su caso no ha podido crearse de manera satisfactoria. Por favor, verifique que haya llenado los campos correspondientes o comuníquese con el administrador del sistema.'); 
			}
		);
  
}


 var response;
 

 
function CreateCase(xml){
	 
	
	$.ajax({
		type: "POST",
		data: '='+xml,
		url: 'https://app-seguros-formulariosuniversal-prod-eastus2.azurewebsites.net/api/bsolicitudes',
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		success: handleHtml,
		error: ajaxFailed
	});
	
}

var theData;
function handleHtml(data){
	console.log('success call to EvoPoint webservice');
    theData = data;
	BizagyCase = theData;
	SaveInfo();
	ContinueWithSaving();
}

var errorD;
function ajaxFailed(xhr, textStatus, error) {
	var modalDialog = SP.UI.ModalDialog;
	modalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 'Cancelled'); 
    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
    alert("responseText: " + xhr.responseText);
	BizagyCase = 'error: '+ xhr.responseText;
}
function SaveInfo()
{
	if ($('#GetCodigo').val() == null || $('#GetCodigo').val() == '')
	{
			currentcontext = new SP.ClientContext.get_current();
			var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
			var web = hostcontext.get_web();
			currentcontext.load(web);
			currentcontext.executeQueryAsync();
			var list = web.get_lists().getByTitle('CodigosUsers');
			var itemCreateInfo = new SP.ListItemCreationInformation();
			var oListItem = list.addItem(itemCreateInfo);
			oListItem.set_item('Title', $('#txtCorreo').val());
			oListItem.set_item('Codigo',$('#txtCodigo').val());
			oListItem.set_item('CorreoSupervisor',$('#txtSupCorreo').val());
			oListItem.set_item('NombreSupervisor',$('#txtSupervisor').val());
			oListItem.update();
			
			currentcontext.load(oListItem);
			currentcontext.executeQueryAsync(function(){  console.log('Informacion guardada') },console.log('La informacion no se puedo guardar.'));
	}
}

var idCaso;
function ContinueWithSaving(){
			
			currentcontext = new SP.ClientContext.get_current();
			var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
			var web = hostcontext.get_web();
			currentcontext.load(web);
			currentcontext.executeQueryAsync();
			var list = web.get_lists().getByTitle('listSYP');
			var itemCreateInfo = new SP.ListItemCreationInformation();
			var oListItem = list.addItem(itemCreateInfo);
			oListItem.set_item('Title', 'New Item');
			oListItem.set_item('NombreCompleto',$('#txtSolicitante').val());
			oListItem.set_item('CorreoElectronico',$('#txtCorreo').val());
			oListItem.set_item('NombreSupervisor',$('#txtSupervisor').val());
			oListItem.set_item('CorreoElectronicoSupervisor' ,$('#txtSupCorreo').val());
			oListItem.set_item('Empresa',$('#ddlEmpresa option:selected').val());
			oListItem.set_item('Area' ,$('#ddlArea option:selected').val());
			oListItem.set_item('Direccion',$('#ddlDireccion option:selected').val());
			oListItem.set_item('Departamento',$('#ddlDepartamento option:selected').val());
			oListItem.set_item('Puesto',$('#ddlPuesto option:selected').val());
			oListItem.set_item('Telefono', $('#txtTelefono').val());
			oListItem.set_item('CodigoEmpleado', $('#txtCodigo').val());
			oListItem.set_item('CamposIncorrectos', $('#txtDigCamp').val());
			oListItem.set_item('InformacionCorrecta', ($('#infoCorrecSi').prop('checked') == true ? "Si" : "No" )); 
			oListItem.set_item('FechayHora', $('#txtFechaHora').val());
			oListItem.set_item('EstadoSolicitud',$('#EstadoSolicitud').val());	
			oListItem.set_item('TipoRequerimiento', $('#ddlRequerimiento option:selected').val());
	 		oListItem.set_item('CasoAsociadoOtro',( $('#casoAsociSi').prop('checked') == true ? "Si" : "No" )); 
			oListItem.set_item('DescripcionRequerimiento',$('#txtDescReq').val());
			oListItem.set_item('FechaVencimiento', $('#FechaVencim').val());	
			oListItem.set_item('NumeroObservacion', $('#txtNomObserv').val());
			oListItem.set_item('TipoRequerimientoNotasAuditoria', $('#ddlReqNotAudi option:selected').val());
			oListItem.set_item('Sistemas',$('#ddlSistemas option:selected').val());
			oListItem.set_item('PersonasEvaluar', personasEvaluar);
			//oListItem.set_item('BizagyXml',xml);
			oListItem.set_item('IdTipoProductividad',$('#ddlTiProductiv option:selected').val() );
			oListItem.set_item('Estatus',BizagyCase );
			if(BizagyCase !== "" ){
					idCaso = BizagyCase.split(':')[1];
					oListItem.set_item('BizagyProcessId',idCaso);
			}
		    oListItem.update();
			currentcontext.load(oListItem);
			currentcontext.executeQueryAsync(function(){  
				itemID = oListItem.get_id(); 
				SaveItemToView(); 
				},onGetWebFail);

//		if( $('#AdjDoc').prop('files').lenghth > 0 )
//			CreateFile('AdjDoc',$('#AdjDoc').prop('files').lenghth);
	 
	
}

function validateFields(){
	
	var inputs = $('input[required*="true"]');
	var selecteds = $('select[required*="true"]')
	var emptyInputs = new Array();
	var emptySelects = new Array();
	var inputsValid=true;
	var selectsValid= true;
	
	inputs.each(function(){  if( $(this).val() == "" ){ emptyInputs.push($(this).prop('id') );  }  });
	selecteds.each(function(){    
             $(this).children('option').each( function(){ 
                if( $(this).prop('selected')==true && $(this).val() == "-1" || $(this).val() == null){  
                     emptySelects.push( $(this).parent().prop('id') )  
                }    
			 });
		});
		
	
	if(emptyInputs.length > 0 ){
		if( $('#infoCorrecSi').prop('checked') == false && emptyInputs.indexOf('txtDigCamp') > 0){
			inputsValid = false;	
		}  
		if( $('#casoAsociSi').prop('checked') == true && emptyInputs.indexOf('txtNumCasoAsoc') > 0 ){
			inputsValid = false;	
		}
		if($('#ddlRequerimiento option:selected').val() == "6")
		{
			if ($('#ddlReqNotAudi option:selected').val() =='-1' || $('#FechaVencim').val() == '' || $('#txtNomObserv').val() == '')
			{
				inputsValid = false;
			}
		}
		if ($('#txtSupervisor').val() == '' || $('#txtSupCorreo').val() == '' || $('#txtCodigo').val() == '' || $('#txtTelefono').val() == '' || $('#txtDescReq').val() == '')
		{
			inputsValid = false;
		}
		if($('#ddlRequerimiento option:selected').val() == '2' && $('#ddlTiProductiv option:selected').val() =='-1')
		{
			inputsValid = false;
		}
		if($('#ddlRequerimiento option:selected').val() == '3' && $('#ddlSistemas option:selected').val() =='-1')
		{
			inputsValid = false;
		}
		if($('#ddlRequerimiento option:selected').val() == '3' && $('#ddlSistemas option:selected').val() =='4' && $('#ddlProcBiz option:selected').val() =='-1')
		{
			inputsValid = false;
		}
 
	}
	else {
		inputsValid = true;
	}	
	
	if(emptySelects.length > 0 ){
		if( $('#ddlEmpresa option:selected').val()=="-1" || $('#ddlArea option:selected').val()=="-1" || $('#ddlDireccion option:selected').val()=="-1" || $('#ddlDepartamento option:selected').val()=="-1" || $('#ddlPuesto option:selected').val()=="-1" || $('#ddlRequerimiento option:selected').val() =="-1"  ){
			inputsValid = false;	
		}
		if($('#ddlRequerimiento option:selected').val() == "6" && $('#ddlReqNotAudi option:selected').val() == "-1"){
			selectsValid = false;
		}
		if($('#ddlRequerimiento option:selected').val() == "3" && $('#ddlSistemas option:selected').val() == "-1"){
			selectsValid = false;
		}
		if($('#ddlRequerimiento option:selected').val() == "2" && $('#ddlTiProductiv option:selected').val() == "-1"){
			selectsValid = false;
		}
	}
	else {
		selectsValid = true;
	}
	
	
	if( selectsValid && inputsValid){
		SaveItemToList();
	}
	else{
		alert('Necesitas completar todos los campos requeridos (*) antes de enviar el caso');
	}
	
}



function cleanTextbox(id){
	var string = $('#'+id).val();
	string = string.replace(/á/g,'a');
	string = string.replace(/é/g,'e');
	string = string.replace(/í/g,'i');
	string = string.replace(/ó/g,'o');
	string = string.replace(/ú/g,'u');
	string = string.replace(/Á/g,'A');
	string = string.replace(/É/g,'E');
	string = string.replace(/Í/g,'I');
	string = string.replace(/Ó/g,'O');
	string = string.replace(/Ú/g,'U'); 
	string = string.replace(/ñ/g,'n');
	string = string.replace(/Ñ/g,'N'); 
	string = string.replace(/[&\/\\@#,+^()$~%.'":*?<>{}_]/g,'');
	$('#'+id).val(string);
	
}

function cleanStringField(StringValue){
	var string = StringValue;
	string = string.replace(/á/g,'a');
	string = string.replace(/é/g,'e');
	string = string.replace(/í/g,'i');
	string = string.replace(/ó/g,'o');
	string = string.replace(/ú/g,'u');
	string = string.replace(/Á/g,'A');
	string = string.replace(/É/g,'E');
	string = string.replace(/Í/g,'I');
	string = string.replace(/Ó/g,'O');
	string = string.replace(/Ú/g,'U'); 
	string = string.replace(/ñ/g,'n');
	string = string.replace(/Ñ/g,'N'); 
	string = string.replace(/[&\/\\@#,+^()$~%'":*?<>{}_]/g,'');
	
	return string;
	
}