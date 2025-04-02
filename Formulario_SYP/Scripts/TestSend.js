 var hostUrl ="https://segurosuniversal.sharepoint.com/misolicitudes";
 var indexCod;

 
 function GetCodigoEMP(email){
	 
	var currentcontx = new SP.ClientContext.get_current();
	var hostcontext = new SP.AppContextSite(currentcontx, hostUrl);
	var web = hostcontext.get_web();
	 
	currentcontx.load(web);
	currentcontx.executeQueryAsync();
	
	var list = web.get_lists().getByTitle("CodigosUsers");
	
	currentcontx.load(list);
	currentcontx.executeQueryAsync();
	
	var camlText = "<View>"  +
						"<Query>"  +
							"<Where>"+
								"<Eq>"+
									"<FieldRef Name='Title'/>"+
	        						"<Value Type='Text'>"+email+"</Value>"+
								"</Eq>"+
							"</Where>"+
						"</Query>"+
					"</View>";
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(camlText);
	
	var itemCollection = list.getItems(camlQuery);
	
	currentcontx.load(itemCollection);
	currentcontx.executeQueryAsync( function(){  onGetCodigoWebSuccess(itemCollection); },function(){ alert('Query failed'); });

	}
	
function onGetCodigoWebSuccess(itemCollection)
{
	var itemEnumerator = itemCollection.getEnumerator();
	
	if (itemCollection.get_count() > 0)
	{
		var valueCollection = new Array( itemCollection.get_count() );
		indexCod=0;
		 
		 while(itemEnumerator.moveNext()){
			 var currentItem = itemEnumerator.get_current(); 
			 valueCollection[indexCod] = new DdValue( " ",currentItem.get_item('Codigo'));
			 $('#txtSupCorreo').val(currentItem.get_item('CorreoSupervisor'));
			 $('#txtSupervisor').val(currentItem.get_item('NombreSupervisor'));
			 indexCod++;
	 }
	 
	 $('#txtCodigo').val(valueCollection[0].value);
	 $('#GetCodigo').val(valueCollection[0].value);
	 
	}
	
}

function DdValue(text,value){
		this.text = text;
		this.value = value;
	}