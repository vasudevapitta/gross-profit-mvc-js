function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 
      && (charCode < 48 || charCode > 57))
    return false;
    return true;
}

(function () {

  //our data 
  const model = {
    cost: null,
    margin: null,
    sellingPrice: null
  }

    const controller = {
    init(){
      view.init()
    },
    
    setCost(cost){
      model.cost = cost;
      return model.cost;
    },

    setMargin(cost){
      model.margin = cost;
      return model.margin;
    },
    
    calculate(cost, margin){
        const percent = (100-margin)/100;
        const sellingPrice = (cost/percent).toFixed(2);
        this.setOutput(sellingPrice);
        return sellingPrice;
    },

    setOutput(val){
      model.sellingPrice = val;
    }

  }
  
  const view = {
    init(){
      this.output = $('#output');
      this.calc = $('#calc');
      this.clear = $('#clear');
      this.cost = $('#cost');
      this.margin = $('#margin');
      this.render();
    },
    
    render(){
      this.setUpEventListeners();
    },
    
    setUpEventListeners(){

      $(this.calc).click((e)=>{
        e.preventDefault();
        const cost = controller.setCost($(this.cost).val());
        const margin = controller.setMargin($(this.margin).val());
        const output = controller.calculate(cost, margin);
        this.reRender(cost, margin, output)
      });

      $(this.clear).click(()=>{
        const cost = controller.setCost(null);
        const margin = controller.setMargin(null);
        const output = controller.setOutput(null);
        this.reRender(cost, margin, output)

        //const result = controller.calculate(cost, margin)
        //this.reRender(cost, margin, output, result)
      })

    },

    reRender(cost, margin, output){
      this.output.val(output);
      this.cost.val(cost);
      this.margin.val(margin);
    }
  }

controller.init();

})();