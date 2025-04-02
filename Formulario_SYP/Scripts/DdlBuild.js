var addCount =0;

$(document).ready(function(){
	
		
		fillSPFormDropdown('ddlEmpresa','Empresa','NEmpresa','SCodigo');
		fillSPFormDropdown('ddlSistemas','SYP_Sistemas','NSistemas','SCodigo');
 		fillSPFormDropdown('ddlRequerimiento','TipoDeRequerimiento','NTipodeRequerimiento','SCodigo'); 
 		fillSPFormDropdown('ddlProcBiz','SYP_BaseDeDatos','Proceso','SCodigo');
		fillSPFormDropdown('ddlReqNotAudi','SYP_TipoReqNotasAuditoria','NTipoReq','SCodigo');
 		fillSPFormDropdown('ddlTiProductiv','SYP_ProductividadTipo','NTipoProductividad','SCodigo');
		 
		
		$('#ddlEmpresa').change(function(){
			getItemToFilter($('#ddlEmpresa option:selected').val(),'SCodigo','Empresa','idEmpresa','AreaSol','IdEmpresa','ddlArea','NAreaSol','SCodigo'); 	
		});
		
		$('#ddlArea').change(function(){
			getItemToFilter($('#ddlArea option:selected').val(),'SCodigo','AreaSol','idAreaSol','DireccionSol','IdAreaSol','ddlDireccion','NDireccionSol','SCodigo');			
		});
		
		$('#ddlDireccion').change(function(){
			getItemToFilter($('#ddlDireccion option:selected').val(),'SCodigo','DireccionSol','idDireccionSol','DeptoSol','IdDireccionSol','ddlDepartamento','NDeptoSol','SCodigo'); 
			PutDepRep('ddlEvaDepartam');
		});
		
		$('#ddlDepartamento').change(function(){
			getItemToFilter($('#ddlDepartamento option:selected').val(),'SCodigo','DeptoSol','idDeptoSol','PuestoSol','IdDeptoSol','ddlPuesto','NPuestoSol','SCodigo'); 
			PutPuestRep('ddlEvaPuesto');
		});
		 
		$('#AdjDoc').change(function(){   
			$('#fileCount').html( 'Total archivos: ' + $(this).prop('files').length ); 
				$('[id*="BtnElimArchivos"]').each(function(){    
					$(this).css('display',''); 
				});
			});	
		$('#add').click(function(){  
			$('.table > tbody:nth-child(2)').append(
				
				'<tr><td><div class="input-control select" data-role="input-control"><select id="ddlEvaDepartam'+addCount+'"> <option value="-1" selected="selected">Seleccionar... </option> </select> </div> </td><td><div class="input-control select" data-role="input-control"><select id="ddlEvaPuesto'+addCount+'"><option value="-1" selected="selected">Seleccionar... </option> </select></div></td> <td><div class="input-control text" data-role="input-control"><input id="txtNombComp" type="text"> <button class="btn-clear" tabindex="-1" type="button"></button></div></td><td><div class="input-control text" data-role="input-control"><input id="txtEvaObs" type="text"><button class="btn-clear" tabindex="-1" type="button"></button> </div></td><td><div class="input-control text" data-role="input-control"><input id="txtEvaEmail" type="text"><button class="btn-clear" tabindex="-1" type="button"></button></div></td></tr>'
			);
			PutDepRep('ddlEvaDepartam'+addCount);
			PutPuestRep('ddlEvaPuesto'+addCount);
			addCount++;
			//return false;
		 });
		
		
	});
	
function GetBase64()
{
	$("#HBase64").val('');
	var attachXml="";
	//Comprimirlo
	$("[id*='AdjDoc']").each(function () {
	
	if ($(this).val() !== '')
	{
		
	var file = $(this).prop('files')[0];
	var FileName = $(this).prop('files')[0].name;
	
	
	var getFileBuffer = function(file) {

	  var deferred = $.Deferred();
	  var reader = new FileReader();
	  reader.onload = function(e) {
	    deferred.resolve(e.target.result);
	  }
	  reader.onerror = function(e) {
	    deferred.reject(e.target.error);
	  }
	  reader.readAsArrayBuffer(file);
	  return deferred.promise();
	};
	
	getFileBuffer(file).then(function(buffer) {
	  var binary = "";
	  var bytes = new Uint8Array(buffer);
	  var i = bytes.byteLength;
	  while (i--) {
	    binary = String.fromCharCode(bytes[i]) + binary;
	  }
	
		attachXml+="<AdjuntarDocumento>"
		attachXml+= "<File fileName='" + cleanStringField(FileName) + "'>" + btoa(binary) + "</File>";
		attachXml+="</AdjuntarDocumento>";
	 	$("#HBase64").val(attachXml);
		 
	});
	}
	
	
	
	});
	//Comprimirlo
	 
}

function PutDepRep(id)
{
	getItemToFilter($('#ddlDireccion option:selected').val(),'SCodigo','DireccionSol','idDireccionSol','DeptoSol','IdDireccionSol',id,'NDeptoSol','SCodigo'); 
}
function PutPuestRep(id)
{
	getItemToFilter($('#ddlDepartamento option:selected').val(),'SCodigo','DeptoSol','idDeptoSol','PuestoSol','IdDeptoSol',id,'NPuestoSol','SCodigo'); 
}