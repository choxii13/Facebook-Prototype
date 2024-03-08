const postModal = document.getElementById("post-modal");
const openPostModal = document.querySelector(".main-div-first-layer-profile p");
const xButtonElement = document.getElementById("pos-ab");
console.log(xButtonElement);
xButtonElement.addEventListener("click", () => {
  postModal.close();
});
openPostModal.addEventListener("click", () => {
  postModal.showModal();
});

// file image preview
const filePickerElement = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");

function showPreview() {
  const files = filePickerElement.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedFile = files[0];
  imagePreview.style.display = "block";
  imagePreview.src = URL.createObjectURL(pickedFile);
}

filePickerElement.addEventListener("change", showPreview);
