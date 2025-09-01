document.addEventListener('DOMContentLoaded', function() {
    
    // === EDIT GALLERY IMAGES HERE ===
    const galleryImages = [
        { src: "http://mobiapi.dataupload.in/profile_pic/637546237400586309.jpg", alt: "Insurance Plan Details" },
        { src: "http://mobiapi.dataupload.in/profile_pic/637546236779916945.jpg", alt: "Family Health Guarantee" },
        { src: "http://mobiapi.dataupload.in/profile_pic/637546236622084553.jpg", alt: "Secure your family's future" },
        { src: "http://mobiapi.dataupload.in/profile_pic/637546236449765116.jpg", alt: "LIC Pension Plan Information" },
        { src: "http://dataupload.in/digitelcard/Files/637029430988275139WhatsApp%20Image%202019-09-01%20at%2012.19.27%20PM.jpeg", alt: "Investment Infographic" },
        { src: "http://dataupload.in/digitelcard/Files/637029430819056762WhatsApp%20Image%202019-09-01%20at%2012.19.26%20PM.jpeg", alt: "Financial Security Advice" },
        { src: "https://i.imgur.com/3lIijeU.jpeg", alt: "Your custom image"}
    ];
    // =================================

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

    // Populate Gallery
    galleryImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.addEventListener('click', () => openLightbox(image.src, image.alt));
        galleryGrid.appendChild(imgElement);
    });
    
    function openLightbox(src, alt) { lightboxImg.src = src; lightboxImg.alt = alt; lightbox.style.display = 'flex'; }
    function closeLightbox() { lightbox.style.display = 'none'; }
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // "Save Me" Button
    document.getElementById('saveContactBtn').addEventListener('click', () => {
        const vcfData = `BEGIN:VCARD\nVERSION:3.0\nFN:Vijaysinh D Sisodia\nORG:Insurance Advisor\nTEL;TYPE=CELL;TYPE=PREF:+919408703170\nEMAIL:sisodia.vijay@yahoo.com\nEND:VCARD`;
        const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Vijaysinh_Sisodia.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // "Enquire Now" Modal
    const enquiryModal = document.getElementById('enquiryModal');
    const enquireBtn = document.getElementById('enquireBtn');
    const enquiryCloseBtn = document.getElementById('enquiryCloseBtn');
    const enquiryForm = document.getElementById('enquiryForm');

    function openEnquiryModal() { enquiryModal.style.display = 'flex'; }
    function closeEnquiryModal() { enquiryModal.style.display = 'none'; }
    enquireBtn.addEventListener('click', openEnquiryModal);
    enquiryCloseBtn.addEventListener('click', closeEnquiryModal);
    enquiryModal.addEventListener('click', (e) => { if (e.target === enquiryModal) closeEnquiryModal(); });
    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const query = document.getElementById('query').value;
        let message = `*New Enquiry from Digital Card*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Query:* ${query}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=919408703170&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeEnquiryModal();
        enquiryForm.reset();
    });

    // === Translate Feature ===
    const translateContainer = document.getElementById('custom-translate-container');

    function createTranslateButton() {
        translateContainer.innerHTML = `
            <button id="translate-btn" class="custom-translate-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Translate to Gujarati
            </button>
        `;
        document.getElementById('translate-btn').addEventListener('click', () => triggerTranslate('gu'));
    }

    function createRevertButton() {
        translateContainer.innerHTML = `
            <button id="revert-btn" class="custom-translate-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Show Original
            </button>
        `;
        document.getElementById('revert-btn').addEventListener('click', () => triggerTranslate('en'));
    }

    function triggerTranslate(lang) {
        const googleCombo = document.querySelector('#google_translate_element .goog-te-combo');
        if (googleCombo) {
            googleCombo.value = lang;
            googleCombo.dispatchEvent(new Event('change'));
        }
    }
    
    // Check which language is active and show the correct button
    setInterval(() => {
        const isTranslated = document.querySelector('html').classList.contains('translated-ltr');
        const hasRevertButton = document.getElementById('revert-btn');
        
        if (isTranslated && !hasRevertButton) {
            createRevertButton();
        } else if (!isTranslated && !document.getElementById('translate-btn')) {
            createTranslateButton();
        }
    }, 500); // Check every half second

    // Initialize the first button
    createTranslateButton();
});
