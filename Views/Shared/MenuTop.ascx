<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<!-- Panel -->

    <div class=" logo">
<%       string logofile = "logo_sfsapps.png";
       if (SFSdotNet.Framework.My.Context.  CurrentContext.User != null)
       {
           if (SFSdotNet.Framework.My.Context.CurrentContext.Company == null)
           {
               var results = SFSdotNet.Framework.Security.BR.secCompaniesBR.Instance.GetBy(p => p.secUsers.Any(x => x.GuidUser == SFSdotNet.Framework.My.Context.CurrentContext.User.GuidUser ));

               foreach (var result in results)
               {
                   SFSdotNet.Framework.My.Context.CurrentContext.User.secCompanies.Add(result);
               }
               if (results.Count > 0)
               {
                   SFSdotNet.Framework.My.Context.CurrentContext.Company = results[0];
                   var extraData = SFSdotNet.Framework.Security.BR.secCompanyExtraDatasBR.Instance.GetBy(p => p.GuidCompany  == SFSdotNet.Framework.My.Context.CurrentContext.Company.GuidCompany).FirstOrDefault();
                   if (extraData != null) {
                       if (!string.IsNullOrEmpty(extraData.LogoFileName))
                        SFSdotNet.Framework.My.Context.CurrentContext.Company.LogoFileName = extraData.LogoFileName;
                   }
               }
           }
           if (SFSdotNet.Framework.My.Context.CurrentContext.Company != null )
           {
               SFSdotNet.Framework.My.Context.CurrentContext.User.GuidCompany  = SFSdotNet.Framework.My.Context.CurrentContext.Company.GuidCompany;
               if (!string.IsNullOrEmpty(SFSdotNet.Framework.My.Context.CurrentContext.Company.LogoFileName))
                   logofile = SFSdotNet.Framework.My.Context.CurrentContext.Company.LogoFileName;
           }
       }
       if (!string.IsNullOrEmpty(logofile)){ %>
         
       <img src="<%: ResolveUrl("~/") %>Content/<%: logofile %>" border="0" />
  
    <%      } %>
    </div>

    

        <div class="grid_6 push_4">
        <% Html.RenderPartial("LoginStatus"); %>    
        </div>

