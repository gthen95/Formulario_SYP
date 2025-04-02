<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
<script type="text/javascript" src="../Content/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.UserProfiles.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.ui.dialog.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
<!-- Librerias del formulario -->

<!--- METRO UI --->
<link rel="stylesheet" href="../Content/css/metro-bootstrap.css">
<!-- <script src="../Content/min/jquery-1.11.3.min.js"></script> -->
<script src="../Content/js/jquery-2.1.4.min.js" type="text/javascript"> </script>
<script src="../Content/min/jquery.widget.min.js"></script>
<script src="../Content/min/metro.min.js"></script>
<!--- METRO UI --->

<!--- Calendario --->
<script src="../Content/js/metro-calendar.js"></script>
<script src="../Content/js/metro-datepicker.js"></script>
<!--- Calendario --->

<!-- Add your CSS styles to the following file -->
<link rel="Stylesheet" type="text/css" href="../Content/App.css" />

<!-- Add your JavaScript to the following file -->
<script type="text/javascript" src="../Scripts/App.js"></script>
<script type="text/javascript" src="../Scripts/FormHelper.js"></script>
<script type="text/javascript" src="../Scripts/DdlBuild.js"></script>
<script type="text/javascript" src="../Scripts/HideFields.js"></script>
<script type="text/javascript" src="../Scripts/xmlBuilder.js"></script>
<script type="text/javascript" src="../Scripts/SendToList.js"></script>
<script type="text/javascript" src="../Scripts/FormLoader.js"></script>
<script type="text/javascript" src="../Content/min/MultiFile.js"></script>
<script type="text/javascript" src="../Scripts/TestSend.js"></script>
<!-- <script type="text/javascript" src="../Scripts/GetUserProfile.js"></script> -->

<script type="text/javascript">
    $(document).ready(function () {
        $(function () { // wait for page to load

            // this is your selector
            $('.multix').MultiFile({
                // your options go here
                max: 10
            });

        });
    });
</script>

<!-- <script type="text/javascript" src="../Scripts/GetUserProfile.js"></script> -->

<style type="text/css">
.MultiFile-remove {
	font-size: 24px;
}
div.MultiFile-label {
	display: block;
	clear: both;
}
.AdjuntoT {
	font-size: 14px;
}
div.FLeft {
    margin-right: 15px;
   /* float:left;*/
	display: inline-block;
}
div.metro2 .grid {
    margin-bottom:0;
}
div.metro2 .input-control.select {
    margin-bottom:0;
}
.caption {
    font-size: 14px;
}
legend.Head {
  background: #ccc;
  padding-left: 10px;
  border-bottom: solid 1px;
  font-weight: bold;
}
.input-control.text.SpDate{
    font-size: 16px;
}
.metro2 .form img {
    vertical-align: initial;
}
.metro2 .Titulo2 {
    margin-bottom: 15px;
}
.Titulo {
    float: right;
    line-height: 60px;
    color: #00237d;
    font-weight: bold;
}
.metro2 fieldset {
    margin: 0px;
    padding: 0px;
    border: 0px none;
    float: left;
    width: 100%;
}
.metro2 .hfRule {
	width: 460px;
	display: inline-block;
	margin-right: 20px;
}
.hfRule2 {
	width: 100%;
}
#s4-titlerow {
	display: none !important;
}
</style>
<!-- Librerias del formulario -->


</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            
        </p>
    </div>
	
	<div class="metro2">

	<input type="text" style="display:none;" id="GetCodigo">
    <div class="Titulo2">
        <img width="300" src="../Images/Universal_PP.png" alt="Logo" /> 
        <span class="Titulo"><b>SISTEMAS Y PROCESOS</b></span>
    </div>

<div class="form">

    
<!--- Solicitante --->
<fieldset>
    <legend class="Head">Solicitante</legend>
	
    <div class="grid row span6 FLeft">
    <label>Nombre completo:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtSolicitante" placeholder="Escribe aqui...">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Correo electrónico:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtCorreo"  placeholder="Escribe aqui...">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>


    <div class="grid row span6 FLeft">
    <label>Nombre supervisor:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtSupervisor"  placeholder="Escribe aqui...">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Correo electrónico supervisor:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtSupCorreo"  placeholder="Escribe aqui...">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Empresa:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlEmpresa">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Area:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlArea">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Dirección:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlDireccion">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
        </div>

    <div class="grid row span6 FLeft">
    <label>Departamento:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlDepartamento">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Puesto:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlPuesto">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Teléfono:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtTelefono"  placeholder="Escribe aqui...">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Código empleado:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
        <input required="true" type="text" id="txtCodigo">
        <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>¿Información correcta? </label>
        
    <input id="infoCorrecSi" type="radio" name="InfoCorrec" value="Si" checked>
    <span class="caption">Si</span>

    <input id="infoCorrecNo" type="radio" name="InfoCorrec" value="No">
    <span class="caption">No</span>

    </div>

	<div id="HDivInfoCorrecta" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Digitar los campos que están incorrectos:<span style="color:red;">*</span></label>
    <div class="input-control textarea">
    <textarea  id="txtDigCamp" required="true"></textarea>
    </div>
    </div>
	</div>


</fieldset>
<!--- Solicitante --->

<!--- Solicitud --->
<fieldset>
    <legend class="Head">Solicitud</legend>

    <div class="grid row span6 FLeft">
    <label>Fecha y hora:</label>
    <div class="input-control text">
    <input id="txtFechaHora"  type="text" disabled>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Estado de la solicitud:</label>
    <div id="EstadoSolicitud" class="input-control text">
    <input type="text" value="Abierta" disabled>
    </div>
    </div>

    <div class="grid row span6 FLeft">
    <label>Tipo de requerimiento:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select required="true" id="ddlRequerimiento">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>
	
	<div id="HDivSistema" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Sistemas:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
		<select id="ddlSistemas" required="true">
			<option value="-1" selected="selected">Seleccionar... </option>
		</select>
    </div>
    </div>
	</div>
	
	<div id="HDivProceso" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Proceso Bizagi:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
	<select id="ddlProcBiz" required="true">
		<option value="-1" selected="selected">Seleccionar... </option>
	</select>
    </div>
    </div>
	</div>
	
    <div id="HDivNotasAudi" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Fecha de vencimiento: <span style="color:red;">*</span></label>
        <div class="input-control text" id="datepicker">
        <input type="text" id="FechaVencim" placeholder="Escribe aqui..." required="true">
        <button class="btn-date"></button>
        </div>
    </div>
	</div>

	<div id="HDivNotasAudi" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Tipo requerimiento Notas de Auditoría:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
	<select id="ddlReqNotAudi" required="true">
		<option value="-1" selected="selected">Seleccionar... </option>
	</select>
    </div>
    </div>
	</div>
	
	<div id="HDivNotasAudi" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Número de observación:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
    <input type="text" id="txtNomObserv"  placeholder="Escribe aqui..." required="true" >
    <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>
	</div>
	
	<div id="HDivProductiv" class="hfRule" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Tipo de productividad:<span style="color:red;">*</span></label>
    <div class="input-control select" data-role="input-control">
	<select id="ddlTiProductiv" required="true" >
		<option value="-1" selected="selected">Seleccionar... </option>
	</select>
    </div>
    </div>
	</div>
	
	
    <div class="grid row span6 FLeft">
    <label>¿Este caso está asociado a otro? </label>
    
	<input id="casoAsociSi" type="radio" name="CasoAsoci" value="Si">
    <span class="caption">Si</span>

    <input id="casoAsociNo" type="radio" name="CasoAsoci" value="No" checked>
    <span class="caption">No</span>
    </div>
	
	<div id="HDivCasoAsoc" style="display:none;">
    <div class="grid row span6 FLeft">
    <label>Número de caso asociado:<span style="color:red;">*</span></label>
    <div class="input-control text" data-role="input-control">
    <input type="text" id="txtNumCasoAsoc" required="true" placeholder="Escribe aqui...">
    <button class="btn-clear" tabindex="-1" type="button"></button>
    </div>
    </div>
	</div>
	
	<div class="grid row span6 FLeft">
    <label>Descripción del requerimiento: <span style="color:red;">*</span></label>
    <div class="input-control textarea">
    <textarea maxlength="200" id="txtDescReq" required="true" ></textarea>
     </div>
    </div>
	
	<div class="grid row span6 FLeft">
    <label>Adjuntar documentos:</label>
	<div class="AdjuntoT">
    <input id="AdjDoc" onchange="GetBase64()" class="multix" maxlength="10" type="file" />
	</div>
	<input type="hidden" id="HBase64" name="Base64" value="">
    </div>

</fieldset>
<!--- Solicitud --->

<!--- Personas a evaluar --->
<fieldset>
<div id="HDivProductiv" class="hfRule2" style="display:none;">
<legend class="Head">Persona(s) a evaluar</legend>

        <div class="Días">
        <table class="table striped3n">
	<thead>
	<tr>
		<th class="text-left">Departamento</th>
		<th class="text-left">Puesto</th>
		<th class="text-left">Nombre completo"</th>
		<th class="text-left">Observaciones</th>
		<th class="text-left">Correo persona</th>
	</tr>
	</thead>

	<tbody>
	<tr>
	
		<td>
			<div class="input-control select" data-role="input-control">
			<select id="ddlEvaDepartam">
				<option value="-1" selected="selected">Seleccionar... </option>
			</select>
			</div>
		</td>
		
		<td>
			<div class="input-control select" data-role="input-control">
			<select id="ddlEvaPuesto">
				<option value="-1" selected="selected">Seleccionar... </option>
			</select>
			</div>
		</td>
		
		<td>
			<div class="input-control text" data-role="input-control">
			<input id="txtNombComp" type="text" />
			<button class="btn-clear" tabindex="-1" type="button"></button>
			</div>
		</td>
		
		<td>
			<div class="input-control text" data-role="input-control">
			<input id="txtEvaObs" type="text" />
			<button class="btn-clear" tabindex="-1" type="button"></button>
			</div>
		</td>
		
		<td>
			<div class="input-control text" data-role="input-control">
			<input id="txtEvaEmail" type="text" />
			<button class="btn-clear" tabindex="-1" type="button"></button>
			</div>
		</td>
		
	</tr>
	</tbody>

	<tfoot></tfoot>
</table>
<br/>
<button id="add">Agregar</button>
</div>

</div>			
</fieldset>

<!--- Personas a evaluar --->

</div>

    <div style="text-align:center">
    <input id="btnEnviar" type="button" class="button large primary" onclick="validateFields();" value="Enviar" />
	<a class="button large primary" href="/misolicitudes/Paginas/sistemasyprocesos.aspx">Cerrar</a>
    </div>

</div>

</asp:Content>
