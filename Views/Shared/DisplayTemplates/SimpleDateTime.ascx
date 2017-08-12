<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<SFSdotNet.Framework.Web.Mvc.Models.SimpleDateTime>" %>
<%@ Import Namespace="SFSdotNet.Framework.Web.Mvc.Extensions" %>
<%: Model!=null? Model.Text : "" %>
