import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage';
import HomeIcon from '@salesforce/resourceUrl/leftbar_home';
import FieldIcon from '@salesforce/resourceUrl/leftbar_fieldmapping';
import DesignIcon from '@salesforce/resourceUrl/leftbar_design';
import notificationIcon from '@salesforce/resourceUrl/leftbar_notification';
import ThankyouIcon from '@salesforce/resourceUrl/leftbar_thankyou';
import object from '@salesforce/resourceUrl/leftbar_objectmapping';
import PreviewIcon from '@salesforce/resourceUrl/leftbar_preview';
import PublishIcon from '@salesforce/resourceUrl/leftbar_publish';
import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords';
import CreateFieldRecord from '@salesforce/apex/FormBuilderController.CreateFieldRecord';
import createPage from '@salesforce/apex/FormBuilderController.createPage';
import renameform from '@salesforce/apex/FormBuilderController.renameform';
import renameMainform from '@salesforce/apex/FormBuilderController.renameMainform'
import addPageBreak from '@salesforce/apex/FormBuilderController.addPageBreak';
import Add_icon from '@salesforce/resourceUrl/Add_icon';
import Edit_page_icon from '@salesforce/resourceUrl/Edit_page_icon';
import Edit_icon from '@salesforce/resourceUrl/Edit_icon';
import Delete_icon from '@salesforce/resourceUrl/Delete_icon';
import right from '@salesforce/resourceUrl/right';
import cross from '@salesforce/resourceUrl/cross';
import dropHere from '@salesforce/resourceUrl/dropHere'
import deletePage from '@salesforce/apex/FormBuilderController.deletePage';

// edit form part imports 
import Objects_Type from "@salesforce/apex/customMetadata.f_Get_Types";
import getCaptchatype from '@salesforce/apex/customMetadata.getCaptchatype'; //import get getCaptchatype method from custom Metadata apex class
import Objects_Type_2 from "@salesforce/apex/customMetadata.Get_Captcha_Types";
import getProgressindicator from '@salesforce/apex/customMetadata.getProgressindicator'; //import get getProgressindicator method from custom Metadata apex class
import formDetails from '@salesforce/apex/FormBuilderController.formDetails';
import editFormSubmit from '@salesforce/apex/FormBuilderController.editFormSubmit';


import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class FormBuilder extends NavigationMixin(LightningElement)  {
    
    
    @track spinnerDataTable = true;
    //     icons        // 
    @track homeIcon = HomeIcon;
    designIcon = DesignIcon;
    DeleteIcon = Delete_icon;
    thankyouicon = ThankyouIcon;
    publishIcon = PublishIcon;
    editpageIcon = Edit_page_icon;
    addIcon = Add_icon;
    EditIcon = Edit_icon;
    object =object;
    fieldicon = FieldIcon;
    notificationicon = notificationIcon;
    previewIcon = PreviewIcon;
    cross = cross;
    right = right;
    outsideClick;
   dropHere  = dropHere;
   @track  newFormName = '';

    isModalOpen = false;

    @api ParentMessage = '';
    @api FormName = 'Test Form_1';
    @track MainList = [];
    WieredResult;
    imageSpinner = false;
    pageImageSpinner = false;
    notShowField = true;
    showField = false;
    @track activeDropZone = true;
    @track FormId = this.ParentMessage;
    //dropzone variables
     count=0;
    @track activeDesignsidebar = false;
    @track activesidebar = false;
    @track activeNotification = false;
    @track activethankyou = false;
    @track PageList = [];
    @track FieldList = [];
   // Id = this.ParentMessage;// Change When LMS Service Starts
    Id='a0B1y00000013pXEAQ';
    EditButtonName = "Edit"//"{!'form:::'+v.FormId}"
    nextButton = 'NextButton';
    previousButton = 'previousButton';
    @track index = 0;
    newPageId;
    @track newMainFormName='test form 1';
    fieldcount  = 0;
     removeObjFields = [];
    // get isIndexZero() {

    //     if (this.index == 0) {
    //         this.index += 1;
    //         return true;
    //     }
    //     return false;
    // }
    // get isIndexIsNotLast() {

    //     if (this.index != this.PageList.length - 1) {
    //         this.index += 1;
    //         return true;
    //     }
    //     return false;
    // }
    // get isIndexLast() {
    //     if (this.index == this.PageList.length - 1) {
    //         return true;
    //     }
    //     return false;
    // }

    connectedCallback() {

        GetFormPage({ Form_Id: this.Id })
            .then(result => {
                console.log('get form page called');
                this.PageList = result;
                console.log('this-->>');
                console.log(this.PageList[0].Name);
                console.log(this.PageList.length);

            }).catch(error => {
                console.log(error);
            });
            getFieldsRecords({id:this.Id})
            .then(result => {
                console.log('whyyyy');
                this.FieldList = result;
                this.setPageField(result);
                 
                console.log(this.FieldList.length);
            })
            .catch(error => {
                console.log(error);
            });
        this.spinnerDataTable = false;
    }
  
    handleActive(event) {
       
        console.log(event.currentTarget.dataset.title);
        console.log('inside onclick'); 
        
       
        var allDiv  = this.template.querySelectorAll('.sidebar');
        var temp111 = this.template.querySelectorAll('.pageButtonMenu');
        console.log(temp111.length);
        console.log(allDiv.length);
        for(var i=0;i<allDiv.length;i++){
            if( event.currentTarget.id==allDiv[i].id){
                console.log(allDiv[i].id);
             allDiv[i].style = 'background-color:#b3cce6';
            }
            else{
                allDiv[i].style  = 'background-color:none';
            }
        }
       
         console.log(event.currentTarget.title);
         console.log('check if condition-=->');
       if (event.currentTarget.dataset.title == 'tab-2' || event.currentTarget.dataset.title == 'tab-3') {
        console.log('in tab-2 or tab-3 code-->');
           if (event.currentTarget.dataset.title == 'tab-2') {
               this.activesidebar = true;
               this.activeDesignsidebar = false;
               this.activeNotification = false;
               this.activethankyou = false;
           }

           else if (event.currentTarget.dataset.title == 'tab-3') {
               this.activeDesignsidebar = true;
               this.activesidebar = false;
               this.activeNotification = false;
               this.activethankyou = false;
           }


           console.log('in the if condition');

           this.activeDropZone = true;
           console.log(this.activeDropZone);
       }

       else if (event.currentTarget.dataset.title == 'tab-4') {
           console.log('Tab-4');
           this.activeDesignsidebar = false;
           this.activesidebar = false;
           this.activeDropZone = false;
           this.activeNotification = true;
           this.activethankyou = false;
       }
       
       else if (event.currentTarget.dataset.title == 'tab-5') {
           this.activeDesignsidebar = false;
           this.activesidebar = false;
           this.activeDropZone = false;
           this.activeNotification = false;
           this.activethankyou = true;
       }
       else if (event.currentTarget.dataset.title == 'tab-6') {
        this.activeDesignsidebar = false;
        this.activesidebar = false;
        this.activeDropZone = false;
        this.activeNotification = false;
        this.activethankyou = false;
    }
    else if (event.currentTarget.dataset.title == 'tab-7') {
        this.activeDesignsidebar = false;
        this.activesidebar = false;
        this.activeDropZone = false;
        this.activeNotification = false;
        this.activethankyou = false;
    }
    else if (event.currentTarget.dataset.title == 'tab-8') {
        this.activeDesignsidebar = false;
        this.activesidebar = false;
        this.activeDropZone = false;
        this.activeNotification = false;
        this.activethankyou = false;
    }

       else {
           this.activesidebar = false;
           this.activeDropZone = false;
           this.activeDesignsidebar = false;

       }
    }

    dragLeave() {

    }
    onDragOver(event) {
        event.preventDefault();
    }

    onDragStart(event){
        try {
      
            var DraggedLabel = event.target.dataset.record;
            var classname = event.target.className;
            var pageId = event.target.dataset.pageRecord;
            var SenddataObj = {record:DraggedLabel , type:classname, PageId:pageId};
           console.log(DraggedLabel);
           
           console.log('On drag start-->');
            if (DraggedLabel == null) {
                
                onDragOver();
            } else {
                console.log('in else condition');
              //console.log(JSON.stringify(event.target.dataset));
                event.dataTransfer.setData('text/plain',JSON.stringify(SenddataObj));
                
               
            }
        } catch (e) {
            console.log(e)
           console.log("Error", "Error Occur", "Something went wrong to drag the field");
        }

    }
    async onDrop(event) {
        var dropzone = this.template.querySelectorAll('.example-dropzone');
        for(let i=0;i<dropzone.length;i++){
            let field = dropzone[i].querySelectorAll('.field');
            if(field.length==0)
           { dropzone[i].style = "opacity:1.0;background-image:none;height:auto";}
           else{
            dropzone[i].style = "opacity:1.0";
           }
        }
        
        console.log('ondrop start -->',dropzone);
        let Fieldid = event.dataTransfer.getData('text');
        let FieldLabel = JSON.parse(Fieldid);
        var classname = event.target.className;
        var pageIdOfField = '';
        var PageRecordId = event.target.dataset.pageRecord;
        var position = 0;
        var OldFieldSend = false;
        let fieldLabelOfRemovedFeild = FieldLabel.record;

//console.log('Dropzone length' + dropzone.length);
        console.log(classname);
        console.log({FieldLabel});
        console.log('ondrop start-->');
        console.log(Fieldid);
        console.log('parent class->'+event.target.parentElement.className);
        
        let isPageBreak=false;
        let oldfieldId = 'na';
        console.log('inside the fieldlalbe---->>>>'+FieldLabel.record);
        if(FieldLabel.record=='QFPAGEBREAK'){
            isPageBreak= true;
        }
        console.log(isPageBreak);
        if (classname == 'field') {
            if(FieldLabel.type == 'field')
            {   OldFieldSend = true;
                oldfieldId = event.target.dataset.record;
                pageIdOfField = FieldLabel.PageId;
                position = event.target.dataset.orderId-1;
                console.log(pageIdOfField);
            }
            else{
            position = event.target.dataset.orderId;
            }
            console.log('position :- ' + position);
        }

        if(classname==''){
            classname= event.target.parentElement.className;
            PageRecordId = event.target.parentElement.dataset.pageRecord;
            if(FieldLabel.type == 'field')
            {   OldFieldSend = true;
                pageIdOfField = FieldLabel.PageId;
                console.log(pageIdOfField);
                console.log(PageRecordId);
                position = event.target.parentElement.dataset.orderId-1;
                
            }
            else{
                position = event.target.parentElement.dataset.orderId;
            }
         
             console.log(classname);
        }

        console.log(event.target.dataset);
        console.log(PageRecordId);
        console.log(FieldLabel);
        console.log(FieldLabel.record);
        console.log(FieldLabel.type);
        var FieldName = FieldLabel.record;


        if (FieldLabel.type != 'Extra'&& FieldLabel.type!='field') {
            FieldName = FieldName + ',' + FieldLabel.type;
            
        }
        console.log('field label type------->'+FieldLabel.type);
        if(FieldLabel.type=='Extra'){
           
            this.checkCount(FieldName);
            console.log('get count successfully-->',this.count);
            FieldName = FieldName + ',' + FieldLabel.type+','+this.count;
             
              
            console.log('inside field extra');
             
        }

        var FieldElement = document.querySelectorAll('.field');
        if(isPageBreak){
            await this.makePageBreak(FieldName,PageRecordId,position,oldfieldId);
        }
        else{
        await this.SaveFields(FieldName, PageRecordId,position,OldFieldSend,pageIdOfField,fieldLabelOfRemovedFeild);
        
        console.log('both methods are called and finish');
        }
    }
        
  async  makePageBreak(FieldName,pageId,position,oldfieldId ){
    console.log('inside the page break---');
    console.log("field id -->"+FieldName);
    console.log("pageId-->"+pageId);
    console.log('postion-->'+position);
        addPageBreak({FormId: this.Id, Name:FieldName, Position:position, Form_Page_Id:pageId,TargetedFeild:oldfieldId})
        .then(result=>{
            this.FieldList = result.fieldList;
            console.log('inside the result in page break-->');
            console.log(result);
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
        })
        .catch(err=>{
            console.log('inside the error in page break');
            console.log({err});
        })
  }
  
    
    async SaveFields(FieldName, pageId,position,OldFieldSend,fieldPageId,fieldlabelname) {
        console.log('inside saveField');
        console.log(pageId);
        console.log(fieldPageId);

        CreateFieldRecord({
            Form_Id: this.Id,
            Name: FieldName,
            Form_Page_Id: pageId,
            Field_Page_Id:fieldPageId,
            Position: position,
            isold:OldFieldSend
        }).then(result => {
            this.FieldList = result;
            this.setPageField(result);
           
        }).catch(err => {
            console.log(err);
        });
        this.template.querySelector("c-fields-section-component").removeField(fieldlabelname);
        console.log('log---------------->'+this.template.querySelector("c-fields-section-component"));
    }
    passToParent(event) {
        if (event.detail == true) {

            console.log('in pass to parent');

            // var dropzone = document.querySelector('div');
            var dropzone = this.template.querySelectorAll('.example-dropzone');
            for(let i=0;i<dropzone.length;i++){
            var field = dropzone[i].querySelectorAll('.field');
           // console.log('important message --->>>>', field.length);
            // console.log({ dropzone });
            // console.log('drop zone length' + dropzone.length);
            // console.log(JSON.stringify(dropzone));
            if (field.length == 0) {
                dropzone[i].style ="background-image: url('/resource/dropHere');background-size: cover;background-repeat: no-repeat;height:120px;";
            //     dropzone[i].style = "background-size: cover";
            // dropzone[i].style = "background-repeat: no-repeat";
            
            }
            else {
                dropzone[i].style = "opacity:0.4";
            }
        }
          
        }
        else{
            console.log('else part executed successfully---->');
            var dropzone = this.template.querySelectorAll('.example-dropzone');
            for(let i=0;i<dropzone.length;i++){
            var field = dropzone[i].querySelectorAll('.field');
            //console.log('important message --->>>>', field.length);
            // console.log({ dropzone });
            // console.log('drop zone length' + dropzone.length);
            // console.log(JSON.stringify(dropzone));
            if (field.length == 0) {
                console.log('inside dropzone');
                dropzone[i].style='background-image:none;height:auto;opacity:1.0';
            }
            else {
                dropzone[i].style = "opacity:1.0";
            }
        }
        }
    }
    setPageField(fieldList) {
        console.log('in set PageField');
        let outerlist = [];
        let isIndexZero= false;
             let islast = false;
             let isnotlast = false;
        for (let i = 0; i < this.PageList.length; i++) {
            let innerlist = [];
            if(i==0){
                isIndexZero = true;
            }
            else if(i==this.PageList.length-1){
                islast= true;
            }
            else if(i!=this.PageList.length-1 ){
                  isnotlast = true;
            }
            for (let j = 0; j < fieldList.length; j++) {

                if (this.PageList[i].Id == fieldList[j].Form_Page__c) {
                    console.log('inside inner loop');
                   let fieldofObj =  fieldList[j].Name.split(',');
                   console.log('in setpage field----->'+fieldofObj);
                   if(fieldofObj.length==2){
                    console.log(fieldofObj.length);
                     if(fieldofObj[1]!='Extra' && fieldofObj[1]!=undefined && fieldofObj[1]!='undefined'){
                        console.log(fieldofObj[0]);
                        this.removeObjFields.push(fieldofObj[0]);
                     }
                 }
                    innerlist.push(fieldList[j]);
                }
            }
            
            let temp = { pageName: this.PageList[i].Name, pageId: this.PageList[i].Id,isIndexZero:isIndexZero,isIndexLast:islast,isIndexIsNotLast:isnotlast,FieldData: innerlist };
            isIndexZero=false;
            islast = false;
            isnotlast = false;
            outerlist.push(temp);
        }

        this.MainList = outerlist;
    }

    tempararyfun(){
        for(let i=0;i<this.removeObjFields.length;i++){
            console.log('log---------------->'+this.template.querySelector("c-fields-section-component"));
            this.template.querySelector("c-fields-section-component").removeField(this.removeObjFields[i]);
          
        }
    }
    checkCount(fieldname){
        console.log('fieldList--->'+this.FieldList.length);
        let fieldAttributeList=[];
        let count1=0;
      for(let i=0;i<this.FieldList.length;i++){
            var tmmp = this.FieldList[i].Name;
            fieldAttributeList  =tmmp.split(',');
           if(fieldAttributeList.length==3){
            console.log('in if condition ------>>>>');
            if(fieldAttributeList[0]== fieldname){
                count1 = count1+1;
            }
           }
      } 
      console.log('after for loop-->');
         this.count=count1 ;
    }
    editPageName(event){
        this.newFormName = event.currentTarget.dataset.record;
        console.log(event.target.dataset.record);
        console.log('inside the editpage-->');

        this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='none';   
        this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='flex';
        // document.addEventListener('click', this.outsideClick = this.cancleRenameForm.bind(this));
        event.stopPropagation();
        return false;
    }

    renameForm(event){
        // console.log(String.fromCharCode(event.keyCode));
        console.log('inside the rename Form--->>>');
        this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='block';   
        console.log('qury selectro one =>>>');
        this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='none';
       console.log('query selector executed suc=>>>');
        if(this.newFormName.length > 0 && this.newFormName.replaceAll(' ', '').length > 0){
        renameform({id : event.currentTarget.dataset.id, rename : this.newFormName,FormId:this.Id}).then(result => {
            this.FieldList = result.fieldList;
            console.log('inside the result in page rename-->');
            console.log(result);
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
            console.log('page  name changed');
          
        }).catch(err=>{
            console.log(err);
        })
      
      
    }
  }
  rename(event){
    console.log('inside on change-->');
    console.log(event.target.value);
    this.newFormName = event.target.value;
  }

  cancleRenameForm(event){

//this.pencheck = false;
    //document.removeEventListener('click', this.outsideClick);
    console.log('inside canleRenameForm');
    this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='block';   
    this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='none';

  }

    handleeditForm(event){
        // this.newFormName = event.currentTarget.dataset.record;
        // console.log(event.target.dataset.record);
        console.log('inside the editpage-->');
         this.isModalOpen = true;
         console.log('method calles');
         formDetails({id:this.Id}).then(result=>{
             console.log(result);
             this.FormDetails = result;
             console.log('formDetails called');
             if(this.FormDetails.Name!=null){
                this.formtitle = this.FormDetails.Name;
             }
             if(this.FormDetails.hasOwnProperty("Captcha_Type__c")){
                console.log(this.FormDetails.Captcha_Type__c);
               
                this.captchTypeparent = this.FormDetails.Captcha_Type__c;
             }
             else{
                console.log('in none');
                this.captchTypeparent = 'None';
             }
             if(this.FormDetails.hasOwnProperty("Progress_Indicator__c")){
                console.log('inside the hasownPorperty');
              this.Progressbarvalue =  this.FormDetails.Progress_Indicator__c;
             }
             else{
                this.Progressbarvalue = 'None';
             }
         }).catch(err=>{
            console.log(err);
         })
        // this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='none';   
        // this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='flex';
        // // document.addEventListener('click', this.outsideClick = this.cancleRenameForm.bind(this));
        // event.stopPropagation();
        // return false;
    }


//     renameMainForm(event){
//         // console.log(String.fromCharCode(event.keyCode));
//         console.log('inside the rename Form--->>>');
//         this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='block';   
//         console.log('qury selectro one =>>>');
//         this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='none';
//        console.log('query selector executed suc=>>>');
//         if(this.newFormName.length > 0 && this.newFormName.replaceAll(' ', '').length > 0){
//         renameMainform({rename : this.newMainFormName,FormId:this.Id}).then(result => {
//           this.newMainFormName = result;
//         }).catch(err=>{
//             console.log(err);
//         })
      
      
//     }
//   }
//   renamemain(event){
//     console.log('inside on change-->');
//     console.log(event.target.value);
//     this.newMainFormName = event.target.value;
//   }

//   cancleRenameMainForm(event){

// //this.pencheck = false;
//     //document.removeEventListener('click', this.outsideClick);
//     console.log('inside canleRenameForm');
//     this.template.querySelector("div[data-record-id ="+event.currentTarget.dataset.id+"]").style.display='block';   
//     this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='none';

//   }






    handleAddPage(){
        createPage({totalPages:this.PageList.length, formId:this.Id}).then(result=>{
            this.FieldList = result.fieldList;
            console.log('inside the result in page break-->');
            console.log(result);
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
            this.showToast('Form Page create Successfully','success');
        }).catch(err=>{
            console.log({err});
        })
    }
    deletePage(event){
      deletePage({FormId:this.Id,PageId:event.currentTarget.dataset.record}).then(result=>{
        this.FieldList = result.fieldList;
        console.log('inside the result in page break-->');
        console.log(result);
        var pagelength = result.pageList.length==this.PageList.length;
        this.PageList = result.pageList;
        this.setPageField(result.fieldList);
        if(pagelength){
            this.showToast('sorry page can not deleted','fail')
        }
        else{
         this.showToast('page Delete successfully');}
      })
    }
    showToast(title,variant){
        const event = new ShowToastEvent({
            title: title,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    renderedCallback() {
        console.log('inside the renderedcallBack--->>>');
        console.log(this.removeObjFields.length);
        this.tempararyfun();
   
    }

    //edit form component part
    @track formtitle ; 
    @track description;
    @track ispreview_show_msg_captcha = true;
    @track ispreview_show_msg = true;
    @track pi = false;
    @track ct = false;
    @track l_All_Types;
    @track TypeOptions;
    @track FormDetails;
    @wire(getProgressindicator) records;
    @wire(getCaptchatype) captcharecords;
    @track l_All_Types_2;
    @track TypeOptions_2;
    @track Progressbarvalue;
    @track captchTypeparent;
  
    @track global_options
    changeFormTitle(event){
        this.formtitle = event.target.value;
        console.log('Form Title :- '+this.formtitle);
        this.isModalOpen_2 = false;
        // alert('hiiii :- '+this.formtitle);
    }
    changeDescription(event){
        this.description = event.target.value;
        console.log('Form Title :- '+this.description);

    }
    
    changeProgressIndicator(event){
        try{
        this.Progressbarvalue = event.detail.value; 
        if (this.Progressbarvalue == 'None') {
            this.ispreview_show_msg = true;
            this.pi = false; 
            // console.log('test :- ',event.target.value);
        }
        else{   
            console.log('you are in Progressbar component');
            this.ispreview_show_msg = false;
            this.pi = true;
            // alert('hiii');
            // console.log('test :- ',event.target.value);
            this.template.querySelector('c-progress-indicator').tesmethod(this.Progressbarvalue);
        }
    
    } catch (error) {
            console.error('check error here', error);
            console.log({error});
        }
        
        
      
    }

    changeCaptchaType(event){
        try{
            this.captchTypeparent = event.detail.value; 
            console.log(this.captchTypeparent);
            if (this.captchTypeparent == 'None') {
                this.testtest = true;
                this.ct = false; 
                // console.log('test :- ',event.target.value);
                // this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            }
            else{   
                console.log('you are in Progressbar component');
                this.testtest = false;
                this.ct = true;
                // alert('hiii');
                // console.log('test :- ',event.target.value);
                console.log("loggggggggg of query---->"+this.template.querySelector('c-captcha-type'));
                this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            }
        
        } catch (error) {
                console.error('check error here', error);
                console.log({error});
            }
       
    } 

    @wire(Objects_Type, {})
    WiredObjects_Type_2({ error, data }) {
 
        if (data) {
            console.log('test :- ', data);
            try {
                this.l_All_Types = data; 
                let options = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ sr: data[key].sr__c, label: data[key].Label, value: data[key].DeveloperName  });
 
                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions = options;
                this.TypeOptions = options.sort(
                    (teamA, teamB) => teamA.sr - teamB.sr,
                  )

                console.log('sort > ',this.TypeOptions);
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }

    @wire(Objects_Type_2, {})
    WiredObjects_Type({ error, data }) {
 
        if (data) {
            
            console.log('ch test :- ', data);
            try {
                this.l_All_Types_2 = data; 
                 
                let options_2 = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options_2.push({ sr: data[key].sr__c, label: data[key].Label, value: data[key].DeveloperName  });
 
                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions_2 = options_2;
                console.log('before sort > ',this.TypeOptions_2);
                this.TypeOptions_2 = options_2.sort(
                    (teamA, teamB) => teamA.sr - teamB.sr,
                  )
                console.log('sort > ',this.TypeOptions_2);
                // console.log('TypeOptions_2:- ',this.TypeOptions_2);
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        // this.isModalOpen = false;
        // alert('you in close Modal');
this.isModalOpen  = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        editFormSubmit({id:this.Id,name:this.formtitle,progressIn:this.Progressbarvalue,captcha :this.captchTypeparent}).then(result=>{
            console.log(result);
            const event = new ShowToastEvent({
                title: 'Form Changes Done Successfully',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);
        
        }).catch(err=>{
            console.log(err);
        });
       this.isModalOpen = false;        
    }
}