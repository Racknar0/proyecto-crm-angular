import swal from'sweetalert2';

export const simpleButtonAlert = (title : string, text : string, icon : any, confirmButtonText : string) =>
    swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
    })

export const confirmButtonAlert = (title : string, text : string, icon : any, confirmButtonText : string, cancelButtonText : string, showCancelButton : boolean = true) =>
    swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        cancelButtonText,
        showCancelButton,
    })

export const simpleAlert = (title : string, text : string, icon : any) =>
    swal.fire({
        title,
        text,
        icon,
    })

export const simpleAlertWithTimer = (title : string, text : string, icon : any, timer : number) =>
    swal.fire({
        title,
        text,
        icon,
        timer,
        showConfirmButton: false
    })
