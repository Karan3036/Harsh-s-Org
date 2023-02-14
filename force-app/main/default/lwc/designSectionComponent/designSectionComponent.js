import { LightningElement,track,api } from 'lwc';
import GetStyles from '@salesforce/apex/FormBuilderController.GetStyles';
export default class DesignSectionComponent extends LightningElement {
    @track StylesProp ;

     //Design Drop Down Options Creation
     get optlabelalign(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.AlignmentProp);}
       }
       get optlabelfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
       }
       get optlabelfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
       }
       get optlabelfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontStyleProp);}
       }
       get optlabelineheight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontLineHeightProp);}
       }
       get optbackSize(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgsizeProp);}
       }
       get optbackpagePostion(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgPositionProp);}
       }
       get optbackpageRepeat(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgRepeatProp);}
       }
      
       get  optBackgroundPagefixposition(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FixPosProp);}
       }
       get optborderStyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get optFormdirection(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FormDirectionProp);}
       }
       get optformbackSize(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgsizeProp);}
       
       }
       get optformbackpagePostion(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgPositionProp);}
       
       }
       get optformbackpageRepeat(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgRepeatProp);}
      
       }
       get optformbackgroundPagefixposition(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FixPosProp);}
       }
       get optformborderStyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get inputfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }
       get optinputfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
      
       }
       get optinputfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get optinputlineheight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontLineHeightProp);}
       }
       get optbtnborderstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get optbtnJustify(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.AlignmentProp);}
       }
       get optbuttonfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }
       get optbuttonfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
      
       }
       get optbuttonfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       
       }
       get optinputfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }

       connectedCallback(){
       
          //get Styles Metadata
          GetStyles()
          .then(result=>{
            console.log('GetStyles called');
            this.StylesProp = result;
            console.log(this.StylesProp);
          }).catch(error=>{
            console.log(error);
          })
      }
     
    // Creation of Combobox for Design part
      optionsCreater(Props){
        let options=[];
        console.log('in optionsCreater');
         for(let i=0;i<Props.length;i++){
             options.push({value:Props[i].Label , label:Props[i].Label});
             console.log('in for loop'+Props[i].Label);
         }
         console.log(options);
         return options;
      }
    
}