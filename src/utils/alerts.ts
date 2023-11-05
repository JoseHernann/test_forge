import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
        container: 'swal-container'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    width: '25rem'
})
