//This code is used to load a form previous values ONLY if a query string with the ID of the form have been specified

 var hostweburl ="https://segurosuniversal.sharepoint.com/misolicitudes";
 var array;
 var ItemID;
 
$(document).ready(function(){
	
	if( window.location.search != ""){
		
		if(window.location.search.indexOf('&') > 0 ){
			array = ( window.location.search.indexOf('&') > 0 ? window.location.search.split('&') : window.location.search);
		    array.forEach( function(value, index, array1){
		                  var queryString = array1[index].split('='); 
		                  if(queryString[0] == "ItemID"){ 
		                        ItemID= queryString[1]; 
		                  }
		              });	
		}
		
	       
	}  
	 
	
	if(ItemID){ 
	
	    LoadFormValues(ItemID);
	}
	else{
		
		setTimeout(function(){
			console.log('No previous info'); 
			console.log($('#txtCorreo').val() )
			fillSPFormEmpty($('#txtCorreo').val());	
		},600);
		
	}
	
	 
}); 

 var targetListItem;
 
function LoadFormValues(ItemID){
	 
    var clientContext = new SP.ClientContext(); 
    var hostcontext = new SP.AppContextSite(clientContext, hostweburl);
    var web = hostcontext.get_web();
     
    clientContext.load(web);
    clientContext.executeQueryAsync();
    
     var targetList =  web.get_lists().getByTitle('listSYP');
      targetListItem = targetList.getItemById(ItemID);
     clientContext.load(targetListItem);
     clientContext.executeQueryAsync( function(){ onQuerySucceeded(); } , function(){  onQueryFailed(); } );
   }

   function onQuerySucceeded() {
		 
	 getDropDownValue( targetListItem.get_item('Empresa'),'ddlEmpresa','Empresa', 'NEmpresa');	 
	 getDropDownValue( targetListItem.get_item('Area'),'ddlArea','AreaSol', 'NAreaSol');	 
	 getDropDownValue( targetListItem.get_item('Direccion'),'ddlDireccion','DireccionSol', 'NDireccionSol');	 
	 getDropDownValue( targetListItem.get_item('Departamento'),'ddlDepartamento','DeptoSol', 'NDeptoSol');
	 getDropDownValue( targetListItem.get_item('Puesto'),'ddlPuesto','PuestoSol', 'NPuestoSol'); 
	 getDropDownValue( targetListItem.get_item('TipoRequerimiento'),'ddlRequerimiento','TipoDeRequerimiento', 'NTipodeRequerimiento');
	 getDropDownValue( targetListItem.get_item('Sistemas'),'ddlSistemas','SYP_Sistemas', 'NSistemas');
	 getDropDownValue( targetListItem.get_item('TipoRequerimientoNotasAuditoria'),'ddlReqNotAudi','SYP_TipoReqNotasAuditoria','NTipoReq');
	 getDropDownValue( targetListItem.get_item('IdTipoProductividad'),'ddlTiProductiv','SYP_ProductividadTipo','NTipoProductividad');
	//oListItem.set_item('AdjuntarDocumento', $('#txtSupCorreo').val(targetListItem.get_item('PersonasEvaluar')));
	 if(targetListItem.get_item('TipoRequerimiento') == "2")
	 	getRepeaterValues(targetListItem.get_item('PersonasEvaluar'));
	  
	 setValueAndDisable('#txtSolicitante','NombreCompleto',targetListItem);
 	 setValueAndDisable('#txtCorreo','CorreoElectronico',targetListItem);
	 setValueAndDisable('#txtSupervisor','NombreSupervisor',targetListItem);
 	 setValueAndDisable('#txtSupCorreo','CorreoElectronicoSupervisor',targetListItem);
	 setValueAndDisable('#FechaVencim','FechaVencimiento',targetListItem);
	 setValueAndDisable('#txtNomObserv','NumeroObservacion',targetListItem);
	 setValueAndDisable('#txtTelefono','Telefono',targetListItem);
     setValueAndDisable('#txtCodigo','CodigoEmpleado',targetListItem);
	 setValueAndDisable('#txtDigCamp','CamposIncorrectos',targetListItem);
	 targetListItem.get_item('InformacionCorrecta') == "Si" ? 
	 setCheckedAndDisable('#infoCorrecSi','#infoCorrecNo') : setCheckedAndDisable('#infoCorrecNo','#infoCorrecSi');
	 setValueAndDisable('#txtFechaHora','FechayHora',targetListItem);
	 setValueAndDisable('#EstadoSolicitud','EstadoSolicitud',targetListItem);
	 targetListItem.get_item('CasoAsociadoOtro') == "Si" ? 
	 setCheckedAndDisable('#casoAsociSi','#casoAsociNo') : setCheckedAndDisable('#casoAsociNo','#casoAsociSi');
	 setValueAndDisable('#txtDescReq','DescripcionRequerimiento',targetListItem);
     console.log('Request succeeded.');

   }

   function onQueryFailed(sender, args) {
     alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
   }
	
	function setValueAndDisable(id,value,item){
		
		$(id).val(item.get_item(value) );
	 	$(id).attr('disabled','disabled');
		
	}
	
	function setCheckedAndDisable(id1,id2){
		$(id1).attr('checked','checked');
		$(id1).attr('disabled','disabled');
		$(id2).attr('disabled','disabled');
	}
	
	
	function getDropDownValue(itemVal,ddId,listToGet,desColunmName){
	   
	currentcontext = new SP.ClientContext.get_current();
	var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
	var web = hostcontext.get_web();
	 
	currentcontext.load(web);
	currentcontext.executeQueryAsync();
	
	var list = web.get_lists().getByTitle(listToGet);
	
	currentcontext.load(list);
	currentcontext.executeQueryAsync();
	
	var camlText = "<View>"  +
						"<Query>"  +
							"<Where>"+
								"<Eq>"+
									"<FieldRef Name='SCodigo'/>"+
	        						"<Value Type='Number'>"+itemVal+"</Value>"+
								"</Eq>"+
							"</Where>"+
						"</Query>"+
					"</View>";
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(camlText);
	
	var itemCollection = list.getItems(camlQuery);
	
	currentcontext.load(itemCollection);
	currentcontext.executeQueryAsync( function(){onGetWebSuccess4(itemCollection,ddId,desColunmName)} ,
												 function(){ alert('Query Failed'); });
	
	
	}
	
	function onGetWebSuccess4(itemCollection,ddId,desColunmName) {  
	 cleanSelect2(ddId);
	 var itemEnumerator = itemCollection.getEnumerator();
	  
	 while(itemEnumerator.moveNext()){
		 var currentItem = itemEnumerator.get_current(); 
		 $('select[id*="'+ ddId +'"]').append("<option value='"+currentItem.get_item('SCodigo')+"'>"+currentItem.get_item(desColunmName)+"</option ");	 
		 $('#'+ddId).attr('disabled','disabled'); 
	 }
	   
	   if(ddId="ddlRequerimiento"){
		    	 $('#ddlRequerimiento').trigger('change');
	   }
	}
	 
	 
	function cleanSelect2(id){
		while( $('#'+id+' option').length > 0){
			$('#'+id+' option').last().remove();
		}
	}
	
	function getRepeaterValues(PersonasEvaluar){
		 $('.Días > table > tbody > tr').each(function(){  
			 $(this).remove()   
		 });
		 
		 
		 var array = PersonasEvaluar.split('||');
		 
		 for(var i=0;i<array.length-1;i++ ){
			 
			var field = array[i].split(';'); 
			
	 		$('.table > tbody:nth-child(2)').append(
				'<tr>'+
					'<td>'+
						'<div class="input-control select" data-role="input-control">'+
							'<select id="ddlEvaDepartam" disabled>'+
								'<option value="'+field[0].split(':')[1]+'" selected="selected">algo1 </option>'+
							'</select>'+ 
						'</div>'+
					'</td>'+
					'<td>'+
						'<div class="input-control select" data-role="input-control">'+
							'<select id="ddlEvaPuesto" disabled>'+
								'<option value="'+field[1].split(':')[1]+'" selected="selected">algo2 </option>'+ 
							'</select>'+
						'</div>'+
					'</td>'+
					'<td>'+
						'<div class="input-control text" data-role="input-control">'+
							'<input id="txtNombComp" type="text" value="'+field[2].split(':')[1]+'" disabled>'+
							'<button class="btn-clear" tabindex="-1" type="button"></button>'+
						'</div>'+
					'</td>'+
					'<td>'+
						'<div class="input-control text" data-role="input-control">'+
							'<input id="txtEvaObs" type="text" value="'+field[3].split(':')[1]+'" disabled>'+
							'<button class="btn-clear" tabindex="-1" type="button"></button>'+
						'</div>'+
					'</td>'+
					'<td>'+
						'<div class="input-control text" data-role="input-control">'+
							'<input id="txtEvaEmail" type="text" value="'+field[4].split(':')[1]+'" disabled>'+
							'<button class="btn-clear" tabindex="-1" type="button"></button>'+
						'</div>'+
					'</td>'+
				'</tr>');
			}
	}
	
	
	
	function fillSPFormEmpty(SolMail)
	{
	var DclientContext = new SP.ClientContext(); 
    var Dhostcontext = new SP.AppContextSite(DclientContext, hostweburl);
    var Dweb = Dhostcontext.get_web();
     
    DclientContext.load(Dweb);
    DclientContext.executeQueryAsync();
    var DtargetList =  Dweb.get_lists().getByTitle('listSYP');
	
	DclientContext.load(DtargetList);
	DclientContext.executeQueryAsync();
	/*
	var DcamlText = "<View>"  +
						"<Query>"  +
							"<Where>"+
								"<And>"+
								"<Eq>"+
									"<FieldRef Name='CorreoElectronico'/>"+
	        						"<Value Type='Text'>"+SolMail+"</Value>"+
								"</Eq>"+
								"<Geq>" +
						        "<FieldRef Name='Created' />" +
						        "<Value Type='DateTime'>2016-01-25T12:00:00Z</Value>"+
						     	"</Geq>"+
								 "</And>"+
							"</Where>"+
							"<OrderBy><FieldRef Name='ID' Ascending='False'/></OrderBy>"+
						"</Query>"+
					"<RowLimit>1</RowLimit></View>";
	*/
	var DcamlText = "<View>"  +
						"<Query>"  +
							"<Where>"+
								"<Eq>"+
									"<FieldRef Name='CorreoElectronico'/>"+
	        						"<Value Type='Text'>"+SolMail+"</Value>"+
								"</Eq>"+
							"</Where>"+
							"<OrderBy><FieldRef Name='ID' Ascending='False'/></OrderBy>"+
						"</Query>"+
					"<RowLimit>1</RowLimit></View>";
	
	var DcamlQuery = new SP.CamlQuery();
	
	DcamlQuery.set_viewXml(DcamlText);
	
	var DitemCollection = DtargetList.getItems(DcamlQuery);
	DclientContext.load(DitemCollection);
	DclientContext.executeQueryAsync( function(){myWebSuccessData(DitemCollection) } ,
												 function(){ console.log('No Data'); });
}

function myWebSuccessData(DitemCollection)
{
	 var DitemEnumerator = DitemCollection.getEnumerator();
	 while(DitemEnumerator.moveNext())
	 {
		 var DcurrentItem = DitemEnumerator.get_current();
		 getItemToFilter( DcurrentItem.get_item('Empresa'),'SCodigo','Empresa','idEmpresa','AreaSol','IdEmpresa','ddlArea','NAreaSol','SCodigo');
         getItemToFilter( DcurrentItem.get_item('Area'),'SCodigo','AreaSol','idAreaSol','DireccionSol','IdAreaSol','ddlDireccion','NDireccionSol','SCodigo');		 
		 getItemToFilter(DcurrentItem.get_item('Direccion'),'SCodigo','DireccionSol','idDireccionSol','DeptoSol','IdDireccionSol','ddlDepartamento','NDeptoSol','SCodigo');
		 getItemToFilter(DcurrentItem.get_item('Departamento'),'SCodigo','DeptoSol','idDeptoSol','PuestoSol','IdDeptoSol','ddlPuesto','NPuestoSol','SCodigo');
		 
		  	setTimeout( function(){  
				 $('#ddlEmpresa').val(DcurrentItem.get_item('Empresa'));
				 $('#ddlArea').val(DcurrentItem.get_item('Area'));
				 $('#ddlDireccion').val(DcurrentItem.get_item('Direccion'));
				 $('#ddlDepartamento').val(DcurrentItem.get_item('Departamento'));
				 $('#ddlPuesto').val(DcurrentItem.get_item('Puesto'));
				 $('#txtTelefono').val(DcurrentItem.get_item('Telefono'));
				 $('#txtSupervisor').val(DcurrentItem.get_item('NombreSupervisor'));
				 $('#txtSupCorreo').val(DcurrentItem.get_item('CorreoElectronicoSupervisor'));
				 	PutDepRep('ddlEvaDepartam');
				 	PutPuestRep('ddlEvaPuesto');

			}, 3000);
	 
	 }
}