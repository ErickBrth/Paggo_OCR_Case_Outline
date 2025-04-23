import Swal from "sweetalert2";

export function alert(text: string) {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
