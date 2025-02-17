function displayImage() {
  const input = document.getElementById("file-input");
  const selectedImage = document.getElementById("selected-image");

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
      selectedImage.classList.remove("hidden");
      selectedImage.classList.add("show");
    };

    reader.readAsDataURL(input.files[0]);
  }
}
