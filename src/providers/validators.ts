import { FormGroup } from '@angular/forms';

export class TherapieValidator {
    
    static isValid(group: FormGroup): any {
        var therapiesForm = group.controls.therapiesForm.value;
        var phytoForm = group.controls.phytoForm.value;
        var homeoForm = group.controls.homeoForm.value;
        var aromaForm = group.controls.aromaForm.value;
        var autres = group.controls.autres.value;
        var autresForm = group.controls.autresForm.value;
        
        if(therapiesForm =="oui"){
            if (autres && autresForm==''){
                group.controls.autresForm.setErrors({"autres_empty": true});
            }
            if (!phytoForm && !homeoForm && !aromaForm && !autres){
                return {
                    "empty": true
                };
            }else{
                return null;
            }
        }
    }
}