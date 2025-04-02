  function bizagyDate(){
		
		var date = new Date();
		
		return date.getUTCFullYear()+'-'+ ( ( date.getUTCMonth()+1) <= 9 ? '0'+(date.getUTCMonth()+1) : (date.getUTCMonth()+1)) + '-'+
				( date.getUTCDate() <= 9 ? '0'+date.getUTCDate() : date.getUTCDate()) + 'T'+
				( date.getHours() <= 9 ? '0'+date.getHours() : date.getHours()) + ':'+
				( date.getUTCMinutes()<= 9 ? '0'+date.getUTCMinutes() : date.getUTCMinutes()) + ':'+
				( date.getUTCSeconds() <= 9 ? '0'+date.getUTCSeconds() : date.getUTCSeconds())
				
	 }
	 
	 function getAttachments(files){
	 
	 	var resultado = $('#HBase64').val();
		 
		var attachXml ="<AdjuntarDocumento>";
		var i =0;
		while(i<files.length){
			
			attachXml+= "<File fileName='" + files[i].name + "'>" + resultado + "</File>";
			i++;
		}
		
		attachXml+="</AdjuntarDocumento>";
		
		return attachXml;
	 }
	 
	 function getProductivity(){
	 
	 
	 var xml = "";
	  $('.table > tbody:nth-child(2) tr').each(function(){
		xml +="<ColProductividad>"
				+"<TablaProductividad>"
					+"<NombreProd>"+$(this).first('td').find('#txtNombComp').val()+"</NombreProd>"
			//		+"<IdAreaProd></IdAreaProd>"
			//		+"<IdDireccionProd></IdDireccionProd>"
			//		+"<IdDeptoProd businessKey=\"Scodigo='"+$(this).first('td').find('#ddlEvaDepartam option:selected').val()+"'\"></IdDeptoProd>"
			//		+"<IdPuestoProd businessKey=\"Scodigo='"+ $(this).first('td').find('#ddlEvaPuesto option:selected').val()+"'\"></IdPuestoProd>"
					+"<CorreoProd>"+ $(this).first('td').find('#txtEvaEmail').val() +"</CorreoProd>"
					+"<Observaciones>"+   $(this).first('td').find('#txtEvaObs').val() +"</Observaciones>"
				+"</TablaProductividad>"
			+"</ColProductividad>";
	        
	  
	  });
	  
	  return xml;
	  
	 }
	
	 function constructXML(IdEmpresa,IdBasesDeDatos,NombreCompleto,Correo,Supervisor,CorreoSupervisor,CodigoUsuario,
	 			IdAreaSol,IdDireccionSol,IdDeptoSol,IdPuestoSol,Telefono,InformacionCorrecta,ObsInfoCorrecta,Adjuntos,
				 IdEstadoSolicitud,IdTipoDeRequerimiento,DiasVencimiento,IdSistemas,IdProductividadTipo,IdTipoReq,NumObservacion,
				 DescripcionRequerimiento,ProdCasoAsociado,ProdNumCasoAsociado){//25 parameters
	 
			var  sXml = "<BizAgiWSParam>";
            sXml += "<domain>domain</domain>";
            sXml += "<userName>admon</userName>";
            sXml += "<Cases>";
            sXml += "<Case>";
            sXml += "<Process>RegistroSolicitud</Process>";
            sXml += "<Entities>";
            sXml += "<RegistroSolicitud>";
            sXml += "<FechaCreacion>" + bizagyDate() + "</FechaCreacion>";
            sXml += "<IdEmpresa businessKey=\"Scodigo='" + IdEmpresa + "'\"></IdEmpresa>";
            sXml += "<IdInfoAdicionalTwo>";
            if (IdBasesDeDatos !== '-1')
            {
                sXml += "<IdBasesDeDatos businessKey=\"Scodigo='" + IdBasesDeDatos + "'\"></IdBasesDeDatos>";
            }
            sXml += "</IdInfoAdicionalTwo>";
            sXml += "<IdSolicitante>";
            sXml += "<NombreCompleto>" + NombreCompleto + "</NombreCompleto>";
            sXml += "<Correo>" + Correo + "</Correo>";
            sXml += "<Supervisor>" + Supervisor + "</Supervisor>";
            sXml += "<CorreoSupervisor>" + CorreoSupervisor + "</CorreoSupervisor>";
            sXml += "<CodigoUsuario>" + CodigoUsuario + "</CodigoUsuario>";
            sXml += "<IdAreaSol businessKey=\"Scodigo='" + IdAreaSol + "'\"></IdAreaSol >";
            sXml += "<IdDireccionSol businessKey=\"Scodigo='" + IdDireccionSol + "'\"></IdDireccionSol>";
            sXml += "<IdDeptoSol businessKey=\"Scodigo='" + IdDeptoSol + "'\"></IdDeptoSol>";
            sXml += "<IdPuestoSol businessKey=\"Scodigo='" + IdPuestoSol + "'\"></IdPuestoSol>";
            sXml += "<Telefono>" + Telefono + "</Telefono>";
            sXml += "<InformacionCorrecta>" + ( InformacionCorrecta == "Si" ? true : false ) + "</InformacionCorrecta>";
            sXml += "<ObsInfoCorrecta >" +ObsInfoCorrecta + "</ObsInfoCorrecta >";
            sXml += "</IdSolicitante>"; 
			sXml += $('#HBase64').val(); 
			
			 sXml += "<IdEstadoSolicitud businessKey=\"Scodigo='1'\"></IdEstadoSolicitud>";
			
		//	sXml += "<IdEstadoSolicitud>" //+ (IdEstadoSolicitud != "-1"? " businessKey=\"Scodigo='" + IdEstadoSolicitud + "'\">":">") We don't have this feel at the form
		//	     + "</IdEstadoSolicitud>";
            sXml += "<IdTipoDeRequerimiento businessKey=\"Scodigo='" + IdTipoDeRequerimiento + "'\"></IdTipoDeRequerimiento>";
            sXml += "<DiasVencimiento>" + DiasVencimiento + "</DiasVencimiento>";
            if (IdSistemas !== '-1')
            {
                sXml += "<IdSistemas businessKey=\"Scodigo='" + IdSistemas + "'\"></IdSistemas>";
            }
            if (IdProductividadTipo !== '-1')
            {
                sXml += "<IdProductividadTipo businessKey=\"Scodigo='" + IdProductividadTipo + "'\"></IdProductividadTipo>";
            }
            sXml += "<IdAuditoria>";
            if (IdTipoReq !== '-1')
            {
                sXml += "<IdTipoReq businessKey=\"Scodigo='" + IdTipoReq + "'\"></IdTipoReq>";
            }
            sXml += "<NumObservacion>" + NumObservacion + "</NumObservacion>";
            sXml += "</IdAuditoria>";
            sXml += "<DescripcionRequerimiento>" + DescripcionRequerimiento + "</DescripcionRequerimiento>";
            sXml += "<IdInfoAdicionalSolicitud>";
            sXml += "<ProdCasoAsociado>" + ProdCasoAsociado + "</ProdCasoAsociado>";
            sXml += "<ProdNumCasoAsociado>" + ProdNumCasoAsociado + "</ProdNumCasoAsociado>";
            sXml += "</IdInfoAdicionalSolicitud>"; 
			sXml += getProductivity();
            sXml += "</RegistroSolicitud>";
            sXml += "</Entities>";
            sXml += "</Case>";
            sXml += "</Cases>";
            sXml += "</BizAgiWSParam>";
		
			return sXml;
	}