	

	
	
	var hostUrl ="https://segurosuniversal.sharepoint.com/misolicitudes";
	var currentcontext;

	//Fill a specific dropdown with the values
	function fillSPFormDropdown(selectID,listTitle,listColumnName,listColumnNameValue){
	 
	currentcontext = new SP.ClientContext.get_current();
	var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
	var web = hostcontext.get_web();
	 
	currentcontext.load(web);
	currentcontext.executeQueryAsync();
	
	var list = web.get_lists().getByTitle(listTitle);
	
	currentcontext.load(list);
	currentcontext.executeQueryAsync();
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml('<View>'+
								'<Query>'+
									'<OrderBy>'+
										'<FieldRef Name=\''+listColumnName+'\'/>'+
									 '</OrderBy>'+
								 '</Query>'+
							 '</View>');
	
	var itemCollection = list.getItems(camlQuery);
	
	currentcontext.load(itemCollection);
	currentcontext.executeQueryAsync( function(){  onGetWebSuccess(itemCollection,listColumnName,listColumnNameValue,selectID); },  onGetWebFail);
	
	
	}
	
	
	function onGetWebSuccess(itemCollection,_listColumnName,_listColumnNameValue,_selectID){ 
		
	 var itemEnumerator = itemCollection.getEnumerator();
	 var valueCollection = new Array( itemCollection.get_count() );
	 
	 var index=0;
	 
	 while(itemEnumerator.moveNext()){
		   
		 var currentItem = itemEnumerator.get_current(); 
		 valueCollection[index] = new DdValue( currentItem.get_item(_listColumnName),currentItem.get_item(_listColumnNameValue)  );
		 index++;
	 }
	 
	 for(var i=0;i<valueCollection.length;i++){
		$('#'+_selectID).append("<option value='"+valueCollection[i].value+"'>"+valueCollection[i].text+"</option ");
	 }
	  
	 
	}
	
	function onGetWebFail(sender, args){
	alert('Failed to get lists. Error:' + args.get_message());
	}
	


	function DdValue(text,value){
		this.text = text;
		this.value = value;
	}
	
	//Function to get the listItem selected at the dropdown
	/*
	itemval: Value of the item that have been selected and that we are going to use to search for that item ID;
	ItemColumnName: name of the column we are going to use to search in the camlQuery for the specific item;
	listToGet: Name of the list from where we are going to search the itemVal;
	columnNameFilter: Name of the column from where we are going to extract the item filter value;
	listFilteredName: the list we are going to extract the values filtered;
	columnNameForFilteredList: the name of the column we are going to use to filter in the camlQuery;
	selectToFill: id of the html select that we are going to fill with the values;
	ColumnNameDescription: name of the column we are going to use to search for the text in the SPListItem;
	ColumnNameValue: Name of the column we are going to use to search for the value in the SPListItem;
	*/
	function getItemToFilter(itemVal,ItemColumnName,listToGet,columnNameFilter,listFilteredName,columNameForFilteredList,selectToFill,
	ColumnNameDescription,ColumnNameValue){
	  
	
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
									"<FieldRef Name='"+ItemColumnName+"'/>"+
	        						"<Value Type='Number'>"+itemVal+"</Value>"+
								"</Eq>"+
							"</Where><OrderBy><FieldRef Name='" + ColumnNameDescription + "'/></OrderBy>"+
						"</Query>"+
					"</View>";
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(camlText);
	
	var itemCollection = list.getItems(camlQuery);
	
	currentcontext.load(itemCollection);
	currentcontext.executeQueryAsync( function(){onGetWebSuccess2(itemCollection,columnNameFilter,listFilteredName,
												columNameForFilteredList,selectToFill,ColumnNameDescription,ColumnNameValue) } ,
												 function(){ alert('Query Failed'); });
	
	
	}
	
	
	function onGetWebSuccess2(itemCollection,_columnNameFilter,_listFilteredName,
								_columNameForFilteredList,_selectToFill,_ColumnNameDescription,ColumnNameValue) {  
	 
	
	 var itemEnumerator = itemCollection.getEnumerator();
	 var valueCollection = new Array( itemCollection.get_count() );
	 index=0;
	 
	 while(itemEnumerator.moveNext()){
	 
		 var currentItem = itemEnumerator.get_current(); 
		 valueCollection[index] = new DdValue( " ",currentItem.get_item(_columnNameFilter));
		 index++;
	 }
	 //Id por el cual vamos a filtrar
	 var itemFilterID = valueCollection[0].value;
	 if(itemFilterID !== null){
		  loadFilterdDropdown(_listFilteredName,_columNameForFilteredList,_selectToFill,_ColumnNameDescription,itemFilterID,ColumnNameValue);
	 }
	 else{
		 alert('itemFilterID is null');
	 }
	
	 
	}
	
	
	function onGetWebFail2(sender, args){
	alert('Failed to get lists. Error:' + args.get_message());
	}
	
	
	
	function loadFilterdDropdown(listName,ColunmNameFilter,selectID, ColumnNameDescription,itemFilterID,ColumnNameValue){
	 
	cleanSelect(selectID);
	currentcontext = new SP.ClientContext.get_current();
	var hostcontext = new SP.AppContextSite(currentcontext, hostUrl);
	var web = hostcontext.get_web();
	 
	currentcontext.load(web);
	currentcontext.executeQueryAsync();
	
	
	var list = web.get_lists().getByTitle(listName);
	
	currentcontext.load(list);
	currentcontext.executeQueryAsync();
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\''+ColunmNameFilter+'\'/>' + 
	        '<Value Type=\'Number\'>'+itemFilterID+'</Value></Eq></Where><OrderBy><FieldRef Name=\''+ColumnNameDescription+'\' /></OrderBy></Query></View>');
	
	var itemCollection = list.getItems(camlQuery);
	
	currentcontext.load(itemCollection);
	currentcontext.executeQueryAsync( function(){ onGetWebSuccess3(selectID,itemCollection,ColumnNameDescription,ColumnNameValue) },
	function(){alert('Query Failed');} );	
		
	}
	
	
	function onGetWebSuccess3(_selectID,itemCollection,_ColumnNameDescription,_ColumnNameValue) {  
	 
	 var itemEnumerator = itemCollection.getEnumerator();
	 var valueCollection = new Array( itemCollection.get_count() );
	 index=0;
	 
	 while(itemEnumerator.moveNext()){
		 var currentItem = itemEnumerator.get_current(); 
		 valueCollection[index] = new DdValue( currentItem.get_item(_ColumnNameDescription), currentItem.get_item(_ColumnNameValue) );
		 index++;
	 }
	 
	 
	 for(var i=0;i<valueCollection.length;i++){
	 	
		 $('select[id*="'+ _selectID +'"]').append("<option value='"+valueCollection[i].value+"'>"+valueCollection[i].text+"</option ");
	 	 //$('#'+_selectID).append("<option value='"+valueCollection[i].value+"'>"+valueCollection[i].text+"</option ");
	 }
	  
	 
	}
	
	
	function onGetWebFail3(sender, args){
		alert('Failed to get lists filtered. Error:' + args.get_message());
	}
	 
	function cleanSelect(id){
		while( $('#'+id+' option').length > 1){
			$('#'+id+' option').last().remove();
		}
	}