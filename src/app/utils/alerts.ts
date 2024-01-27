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



