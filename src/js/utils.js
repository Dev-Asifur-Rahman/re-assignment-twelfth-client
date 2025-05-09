import toast from "react-hot-toast";
import Swal from "sweetalert2";

// react hot toast function
const toastError = (message) => {
  return toast.error(message);
};

const toastSuccess = (message) => {
  return toast.success(message);
};

// sweet alert function

const swalSuccess = (message = "success") => {
  Swal.fire({
    title: message,
    icon: "success",
    draggable: true,
  });
};

const swalError = (title="Error Occured",message = "Something Went Wrong") => {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
  });
};

const swalConfirm = (message="Are you sure?") => {
  return Swal.fire({
    title: message,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm !"
  });
};

export { toastError, toastSuccess, swalSuccess, swalError, swalConfirm };
