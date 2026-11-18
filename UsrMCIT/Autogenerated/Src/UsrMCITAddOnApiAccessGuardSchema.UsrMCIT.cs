namespace Terrasoft.Configuration
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;

	#region Class: UsrMCITAddOnApiAccessGuardSchema

	/// <exclude/>
	public class UsrMCITAddOnApiAccessGuardSchema : Terrasoft.Core.SourceCodeSchema
	{

		#region Constructors: Public

		public UsrMCITAddOnApiAccessGuardSchema(SourceCodeSchemaManager sourceCodeSchemaManager)
			: base(sourceCodeSchemaManager) {
		}

		public UsrMCITAddOnApiAccessGuardSchema(UsrMCITAddOnApiAccessGuardSchema source)
			: base( source) {
		}

		#endregion

		#region Methods: Protected

		protected override void InitializeProperties() {
			base.InitializeProperties();
			UId = new Guid("47546de4-8e5e-485a-a2a1-0e3eb801e177");
			Name = "UsrMCITAddOnApiAccessGuard";
			ParentSchemaUId = new Guid("50e3acc0-26fc-4237-a095-849a1d534bd3");
			CreatedInPackageId = new Guid("0a07faf7-f6e2-439e-ab7c-961d7c56566e");
			ZipBody = new byte[] { 31,139,8,0,0,0,0,0,4,0,213,147,77,107,219,64,16,134,239,6,255,135,193,39,27,92,41,190,38,180,160,200,78,16,180,118,136,228,83,41,97,189,59,118,182,216,187,102,102,101,48,165,255,189,163,15,39,114,146,226,75,47,93,132,36,180,243,62,51,243,238,8,226,24,82,66,21,172,7,246,37,105,252,164,189,65,96,253,140,59,117,13,75,166,111,105,86,36,198,44,92,178,183,137,214,200,124,95,42,50,253,158,72,51,23,208,25,52,176,246,4,169,119,107,187,41,169,130,57,248,114,210,202,155,200,229,158,215,124,168,248,81,173,46,158,45,131,92,6,183,118,133,162,195,237,17,20,76,179,188,200,230,105,1,122,171,152,97,77,126,119,86,71,174,9,209,61,32,237,44,179,164,250,106,89,170,64,170,153,214,193,157,221,34,199,76,58,214,28,183,194,215,232,199,210,5,187,195,72,243,24,130,7,117,240,214,64,154,95,77,174,38,113,245,152,76,154,226,166,30,156,15,176,87,2,23,170,132,182,168,38,125,227,68,142,116,176,210,147,116,255,62,67,191,87,178,117,27,40,144,72,177,95,135,40,245,132,209,76,118,131,69,190,185,176,31,205,14,232,66,21,214,239,57,181,67,222,43,201,212,13,238,216,29,181,197,85,106,58,62,120,41,152,27,210,177,198,156,60,226,126,239,87,191,7,178,190,127,176,59,204,235,99,159,75,54,248,12,131,174,233,131,209,143,70,183,47,87,91,171,219,179,249,251,120,192,53,220,42,198,15,146,52,152,182,138,14,209,31,164,53,43,179,87,159,200,194,101,142,145,130,24,52,244,171,159,168,3,112,53,106,52,134,134,121,139,50,115,88,147,19,218,48,224,232,149,216,129,87,107,37,133,68,93,224,137,132,163,155,243,200,131,34,192,26,47,253,15,155,68,163,38,250,77,228,133,115,232,14,73,52,21,79,157,25,158,3,170,213,164,18,13,146,80,156,52,41,136,49,12,146,233,116,49,127,74,23,243,187,236,126,249,152,20,217,98,62,144,207,245,143,138,131,110,209,191,171,233,184,96,228,114,111,212,191,244,241,133,247,159,218,56,51,54,188,53,177,125,200,245,7,92,212,46,41,18,5,0,0 };
		}

		#endregion

		#region Methods: Public

		public override void GetParentRealUIds(Collection<Guid> realUIds) {
			base.GetParentRealUIds(realUIds);
			realUIds.Add(new Guid("47546de4-8e5e-485a-a2a1-0e3eb801e177"));
		}

		#endregion

	}

	#endregion

}

