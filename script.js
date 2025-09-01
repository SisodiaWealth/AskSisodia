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
    if (galleryGrid) {
        galleryImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.addEventListener('click', () => openLightbox(image.src, image.alt));
            galleryGrid.appendChild(imgElement);
        });
    }
    
    function openLightbox(src, alt) {
        if(lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.style.display = 'flex';
        }
    }
    function closeLightbox() {
        if(lightbox) {
            lightbox.style.display = 'none';
        }
    }
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // "Save Me" Button
    const saveContactBtn = document.getElementById('saveContactBtn');
    if(saveContactBtn) {
        saveContactBtn.addEventListener('click', () => {
            const vcfData = `BEGIN:VCARD\nVERSION:3.0\nFN:Vijaysinh D Sisodia\nORG:Insurance Advisor\nTEL;TYPE=CELL;TYPE=PREF:+919408703170\nEMAIL:sisodia.vijay@yahoo.com\nEND:VCARD`;
            const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Vijaysinh_Sisodia.vcf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // "Enquire Now" Modal
    const enquiryModal = document.getElementById('enquiryModal');
    const enquireBtn = document.getElementById('enquireBtn');
    const enquiryCloseBtn = document.getElementById('enquiryCloseBtn');
    const enquiryForm = document.getElementById('enquiryForm');

    function openEnquiryModal() { if(enquiryModal) enquiryModal.style.display = 'flex'; }
    function closeEnquiryModal() { if(enquiryModal) enquiryModal.style.display = 'none'; }
    if(enquireBtn) enquireBtn.addEventListener('click', openEnquiryModal);
    if(enquiryCloseBtn) enquiryCloseBtn.addEventListener('click', closeEnquiryModal);
    if(enquiryModal) enquiryModal.addEventListener('click', (e) => { if (e.target === enquiryModal) closeEnquiryModal(); });
    
    if(enquiryForm) {
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
    }

    // === Translate Feature (Robust Version) ===
    const translateContainer = document.getElementById('custom-translate-container');
    let currentLang = 'en'; // Start with English

    function setLanguage(lang) {
        const googleCombo = document.querySelector('.goog-te-combo');
        if (googleCombo) {
            googleCombo.value = lang;
            googleCombo.dispatchEvent(new Event('change'));
        } else {
            console.error("Google Translate dropdown not found.");
        }
    }

    function updateButton() {
        if (!translateContainer) return;
        if (currentLang === 'gu') {
            translateContainer.innerHTML = `
                <button class="custom-translate-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Show Original
                </button>
            `;
            translateContainer.firstElementChild.addEventListener('click', () => {
                currentLang = 'en';
                setLanguage('en');
                // The check interval will handle reverting the button text
            });
        } else {
            translateContainer.innerHTML = `
                <button class="custom-translate-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Translate to Gujarati
                </button>
            `;
            translateContainer.firstElementChild.addEventListener('click', () => {
                currentLang = 'gu';
                setLanguage('gu');
                 // The check interval will handle updating the button text
            });
        }
    }

    // This function waits for the Google Translate widget to be fully loaded
    function initializeTranslate() {
        if (!document.getElementById('google_translate_element')) return;
      
        const checkInterval = setInterval(() => {
            const googleCombo = document.querySelector('.goog-te-combo');
            if (googleCombo && googleCombo.options.length > 1) {
                clearInterval(checkInterval); // Stop checking once loaded
                
                // Set up a mutation observer to watch for language change
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.attributeName === 'class' && document.documentElement.classList.contains('translated-ltr')) {
                           currentLang = 'gu';
                           updateButton();
                        } else {
                           currentLang = 'en';
                           updateButton();
                        }
                    });
                });
                observer.observe(document.documentElement, { attributes: true });

                updateButton(); // Initialize our custom button
            }
        }, 200); // Check every 200ms
    }

    initializeTranslate();
});
