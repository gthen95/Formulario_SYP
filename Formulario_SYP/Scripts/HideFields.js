$(document).ready(function(){ 
	
	
	$('#BtnElimArchivos').click(function() {
		$('[id*="file_wrapper"]').val('');
		$('[id*="AdjDoc"]').val('');
		$('#fileCount').html('');
		$('[id*="BtnElimArchivos"]').each(function(){    
				$(this).css('display','none'); 
		});
	});
	
	// Input Controls
	$("#datepicker").datepicker({
       
        format: "mm/dd/yyyy", // set output format
        effect: "slide", // none, slide, fade
        position: "top", // top or bottom,
        locale: 'en', // 'ru' or 'en', default is $.Metro.currentLocale
    });
	
	$('#ddlSistemas').change(function(){
		
		var DlSistema = $("#ddlSistemas").val();
		
		if (DlSistema == "4")
		{
			$('div[id*="HDivProceso"]').each(function(){    
				$(this).css('display','inline-block'); 
			});
		}
		else
		{
			$('div[id*="HDivProceso"]').each(function(){    
				$(this).css('display','none'); 
			});
			$("#ddlProcBiz").val('-1');
		}
		
	});
	
	$('#ddlRequerimiento').change(function(){
		
		var TipoReqS = $("#ddlRequerimiento").val();
		
		
		// (Perfiles) Sistemas
		if (TipoReqS == "3")
		{
			$('div[id*="HDivSistema"]').each(function(){    
				$(this).css('display','inline-block'); 
			});
		}
		else
		{
			$('div[id*="HDivSistema"]').each(function(){    
				$(this).css('display','none'); 
			});
			$("#ddlSistemas").val('-1');
		}
		
		// Productividad
		if (TipoReqS == "2")
		{
			$('div[id*="HDivProductiv"]').each(function(){    
				$(this).css('display','inline-block'); 
			});
		}
		else
		{
			$('div[id*="HDivProductiv"]').each(function(){    
				$(this).css('display','none'); 
			});
			
			$("#ddlTiProductiv").val('-1');
		}
		
		// Notas Auditoria
		if (TipoReqS == "6")
		{
			$('div[id*="HDivNotasAudi"]').each(function(){    
				$(this).css('display','inline-block');
				$("#FechaVencim").required = true;
			});
		}
		else
		{
			$('div[id*="HDivNotasAudi"]').each(function(){    
				$(this).css('display','none'); 
			});
			
			$("#FechaVencim").val('');
			$("#ddlReqNotAudi").val('-1');
			$("#txtNomObserv").val('');
		}
		
			// Si el tipo de requerimiento es igual a perfiles debe de mostrar el DDL Sistemas
			// Si el tipo de requerimiento es igual a Productividad debe de mostrar el DDL Tipo de productividad.
			// Si el tipo de requerimiento es igual a Notas Auditoria debe de mostrar los siguientes campos:
			// Fecha vencimiento
			// Tipo de requerimiento notas de auditoria
			// Numero de observacion
		});
		
		
		// Si hay algun caso asociado a esta nueva Solicitud
		$('input[name="CasoAsoci"]').change(function(){
			
		var CasoAsociado = $('input[name="CasoAsoci"]:checked').val();
		
		if (CasoAsociado == "Si")
		{
			$('div[id*="HDivCasoAsoc"]').each(function(){    
				$(this).css('display','inline-block'); 
			});
		}
		else
		{
			$('div[id*="HDivCasoAsoc"]').each(function(){    
				$(this).css('display','none'); 
			});
		}
		});
		//FIN
	
		// Si la informacion no esta correcta
		$('input[name="InfoCorrec"]').change(function(){
			
		var CasoAsociado = $('input[name="InfoCorrec"]:checked').val();
		
		if (CasoAsociado == "No")
		{
			$('div[id*="HDivInfoCorrecta"]').each(function(){    
				$(this).css('display','inline-block'); 
			});
		}
		else
		{
			$('div[id*="HDivInfoCorrecta"]').each(function(){    
				$(this).css('display','none'); 
			});
		}
		});
		//Fin 
	
});