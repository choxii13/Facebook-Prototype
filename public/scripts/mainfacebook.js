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

// file image preview
const changefilePickerElement = document.getElementById("change-image");
const changeImagePreview = document.getElementById("change-image-preview");

function showPreviewChange() {
  const files = changefilePickerElement.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedFile = files[0];
  changeImagePreview.style.display = "block";
  changeImagePreview.src = URL.createObjectURL(pickedFile);
}

changefilePickerElement.addEventListener("change", showPreviewChange);

const openOptionElement = document.querySelector(
  ".right-section-container:last-child img"
);
const optionElement = document.querySelector(
  ".right-section-container:last-child div"
);

// open option
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

// story
const imageStory = document.querySelectorAll(".story ul li");
const buttonLeftElement = document.querySelector(".btn-left");
const buttonRightElement = document.querySelector(".btn-right");
const buttonElement = document.querySelectorAll(".story button");

let move = 0;
let removeDisplay = 0;
let numberOfSlides = imageStory.length;

for (let i = 0; i < buttonElement.length; i++) {
  buttonElement[i].addEventListener("click", function () {
    const selectedButton = buttonElement[i].classList;

    // button left
    if (selectedButton[0] === "btn-left") {
      removeDisplay -= 1;
      move += 200;
      imageStory[0].style.marginLeft = `${move}` + "px";
    }
    //  button right
    if (selectedButton[0] === "btn-right") {
      removeDisplay += 1;
      move -= 200;
      imageStory[0].style.marginLeft = `${move}` + "px";
    }

    // button left
    if (removeDisplay <= 0) {
      buttonLeftElement.style.display = "none";
    } else {
      buttonLeftElement.style.display = "flex";
    }

    // button right
    if (removeDisplay >= numberOfSlides - 4) {
      console.log(removeDisplay);
      buttonRightElement.style.display = "none";
    } else {
      buttonRightElement.style.display = "flex";
    }
  });
}

// create story
const removeElement = document.querySelector(
  ".story ul li:nth-child(1) img:nth-child(1)"
);
removeElement.style.display = "none";

// seeMore
const seeMoreElement = document.querySelector(
  ".section-left-container:nth-child(7)"
);
const elements = document.querySelectorAll(
  ".section-left-container:nth-child(n + 8)"
);

seeMoreElement.addEventListener("click", () => {
  for (let i = 0; i < elements.length; i++) {
    console.log(i);
    elements[i].style.display = "flex";
  }
  seeMoreElement.style.display = "none";
});

elements[elements.length - 1].addEventListener("click", () => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  seeMoreElement.style.display = "flex";
  elements[elements.length - 1].style.display = "none";
});
