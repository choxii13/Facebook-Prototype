const postModal = document.getElementById("post-modal");
const openPostModal = document.querySelector(".main-div-first-layer-profile p");
const closePostModal = document.getElementById("close-post");
// posting modal
closePostModal.addEventListener("click", () => {
  postModal.close();
});
openPostModal.addEventListener("click", () => {
  postModal.showModal();
});

// changeProfile Modal
const changeProfile = document.getElementById("change-profile");
const openChangeProfile = document.getElementById("open-change-dp");
const closeChangeProfile = document.getElementById("close-change-dp");
openChangeProfile.addEventListener("click", () => {
  changeProfile.showModal();
});

closeChangeProfile.addEventListener("click", () => {
  changeProfile.close();
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

const openOptionElement = document.querySelector(
  ".right-section-container:last-child img"
);
const optionElement = document.querySelector(
  ".right-section-container:last-child div"
);

let open = false;
function openOption() {
  open = !open;
  if (open) {
    optionElement.style.display = "block";
  } else {
    optionElement.style.display = "none";
  }
}
openOptionElement.addEventListener("click", openOption);
