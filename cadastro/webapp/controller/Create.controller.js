sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"../model/formatter"
    
], function(Controller, History) {
    'use strict';
    return Controller.extend("cfortini.cadastro.controller.Create",{

		onNavBack : function() {

      var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}      

		},
    
    onGravar : function(){
      var oModel = this.getView().getModel();
      var dados = {
        Nome:     this.byId("inpNome").getValue(),
        Telefone: this.byId("inpTelefone").getValue(),
        UF:       this.byId("inpUF").getValue(),
        Email:    this.byId("inpEmail").getValue(),
        Status:   "1"
      };
   
      oModel.create("/dadosSet", dados, {
        success:function(dados, resposta){
          var message = JSON.parse(resposta.headers["sap-message"]);
					//sap.m.MessageToast.show('Cliente Craido com Sucesso!');
          sap.m.MessageToast.show(message.message);
          this.getRouter().navTo("object", {
            objectId : dados.ID
          });
				}.bind(this),
				  error:function(oError){
					  console.error(oError);
				}.bind(this)
      });

    }

    });
    
}); 