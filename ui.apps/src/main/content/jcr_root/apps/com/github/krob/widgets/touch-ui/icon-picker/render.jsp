<%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="org.apache.commons.lang.StringUtils,
				  com.adobe.granite.ui.components.AttrBuilder,
                  com.adobe.granite.ui.components.Config,
                  com.adobe.granite.ui.components.Field,
                  com.adobe.granite.ui.components.Tag" %>
<%
    Config cfg = cmp.getConfig();
    ValueMap vm = (ValueMap) request.getAttribute(Field.class.getName());
    Field field = new Field(cfg);

	String name = cfg.get("name", String.class);
	String value = vm.get("value", String.class);
	boolean required = cfg.get("required", false);
	
	String icons[] = { "glyphicon glyphicon-step-backward",
		"glyphicon glyphicon-fast-backward",
		"glyphicon glyphicon-backward",
		"glyphicon glyphicon-play",
		"glyphicon glyphicon-pause",
		"glyphicon glyphicon-stop",
		"glyphicon glyphicon-forward",
		"glyphicon glyphicon-fast-forward",
		"glyphicon glyphicon-step-forward",
		"glyphicon glyphicon-eject",
		"glyphicon glyphicon-chevron-left",
		"glyphicon glyphicon-chevron-right",
		"glyphicon glyphicon-plus-sign",
		"glyphicon glyphicon-minus-sign",
		"glyphicon glyphicon-remove-sign",
		"glyphicon glyphicon-ok-sign",
		"glyphicon glyphicon-question-sign",
		"glyphicon glyphicon-info-sign" };
	String clearLink = "";
	
	if (!required) {
		clearLink="<a href=\"#\" class=\"null\" style=\"color:red;\">Clear Icon</a>";
	}
	
%>
<div class="touch-dialog-custom-icon-picker">
<input type="hidden" name="<%= name %>" value="<%= value %>" />
<%
int i = 0;
for(i=0;i<icons.length;i++)
{
%>
<a href="#" class="<%= icons[i] %>" hidefocus="on"></a>
<%} %>
<div class="clear-link"><%= clearLink %></div>
</div>