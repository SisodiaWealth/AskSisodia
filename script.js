document.addEventListener("DOMContentLoaded", function () {
  // === EDIT GALLERY IMAGES HERE ===
  // Instructions:
  // 1. Upload your image to a hosting service (like imgur.com).
  // 2. Get the "Direct Link" (ending in .jpg, .png, etc.).
  // 3. Add a new line below with the src and a short description (alt).
  const galleryImages = [
    {
      src: "http://mobiapi.dataupload.in/profile_pic/637546237400586309.jpg",
      alt: "Insurance Plan Details",
    },
    {
      src: "http://mobiapi.dataupload.in/profile_pic/637546236779916945.jpg",
      alt: "Family Health Guarantee",
    },
    {
      src: "http://mobiapi.dataupload.in/profile_pic/637546236622084553.jpg",
      alt: "Secure your family's future",
    },
    {
      src: "http://mobiapi.dataupload.in/profile_pic/637546236449765116.jpg",
      alt: "LIC Pension Plan Information",
    },
    {
      src: "http://dataupload.in/digitelcard/Files/637029430988275139WhatsApp%20Image%202019-09-01%20at%2012.19.27%20PM.jpeg",
      alt: "Investment Infographic",
    },
    {
      src: "http://dataupload.in/digitelcard/Files/637029430819056762WhatsApp%20Image%202019-09-01%20at%2012.19.26%20PM.jpeg",
      alt: "Financial Security Advice",
    },
    {
      src: "https://imgur.com/a/3lIijeU",
    },
  ];
  // =================================

  const galleryGrid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

  // Populate Gallery
  galleryImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.addEventListener("click", () =>
      openLightbox(image.src, image.alt)
    );
    galleryGrid.appendChild(imgElement);
  });

  // Lightbox functionality
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.style.display = "flex";
  }
  function closeLightbox() {
    lightbox.style.display = "none";
  }
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // "Save Me" Button
  document.getElementById("saveContactBtn").addEventListener("click", () => {
    const vcfData = `BEGIN:VCARD\nVERSION:3.0\nFN:Vijaysinh D Sisodia\nORG:Insurance Advisor\nTEL;TYPE=CELL;TYPE=PREF:+919408703170\nEMAIL:sisodia.vijay@yahoo.com\nEND:VCARD`;
    const blob = new Blob([vcfData], {
      type: "text/vcard;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Vijaysinh_Sisodia.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // "Enquire Now" Modal
  const enquiryModal = document.getElementById("enquiryModal");
  const enquireBtn = document.getElementById("enquireBtn");
  const enquiryCloseBtn = document.getElementById("enquiryCloseBtn");
  const enquiryForm = document.getElementById("enquiryForm");

  function openEnquiryModal() {
    enquiryModal.style.display = "flex";
  }
  function closeEnquiryModal() {
    enquiryModal.style.display = "none";
  }

  enquireBtn.addEventListener("click", openEnquiryModal);
  enquiryCloseBtn.addEventListener("click", closeEnquiryModal);
  enquiryModal.addEventListener("click", (e) => {
    if (e.target === enquiryModal) closeEnquiryModal();
  });

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const query = document.getElementById("query").value;
    let message = `*New Enquiry from Digital Card*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Query:* ${query}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919408703170&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    closeEnquiryModal();
    enquiryForm.reset();
  });
});


