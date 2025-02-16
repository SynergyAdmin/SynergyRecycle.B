// Connetti Wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert(`Wallet connesso: ${accounts[0]}`);
        } catch (error) {
            alert("Errore nella connessione del wallet.");
        }
    } else {
        alert("Installa MetaMask per utilizzare questa funzionalità!");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("Caricamento navbar...");
    fetch("navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel caricamento della navbar");
            }
            return response.text();
        })
        .then(data => {
            console.log("Navbar caricata con successo");
            const navbarContainer = document.createElement("div");
            navbarContainer.innerHTML = data;
            document.body.insertBefore(navbarContainer, document.body.firstChild);
        })
        .catch(error => console.error("Errore nel caricamento della navbar:", error));
});

});

// Configurazione multilingua
const translations = {
    it: {
        heroTitle: "La nuova piattaforma per aiutarci, ad aiutare il Mondo.",
        startNow: "Inizia ora"
    },
    en: {
        heroTitle: "The new platform to help us, help the World.",
        startNow: "Start now"
    }
    
};

// Gestione cambio lingua
function updateContent(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(el => {
        const key = el.dataset.translate;
        if(translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Validazione form avanzata
function validateForm(formData) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,}$/;

    if(!formData.get('name')) errors.push('Il nome è obbligatorio');
    if(!phoneRegex.test(formData.get('phone'))) errors.push('Telefono non valido');
    if(!emailRegex.test(formData.get('email'))) errors.push('Email non valida');
    
    return errors;
}

// Animazione progress bar
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Gestione invio form
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const errors = validateForm(formData);

    if(errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    try {
        // Simulazione chiamata API
        const response = await fetch('https://api.example.com/contact', {
            method: 'POST',
            body: formData
        });

        if(response.ok) {
            alert('Messaggio inviato con successo!');
            form.reset();
            animateProgressBars(); // Rianima le progress bar
        } else {
            throw new Error('Errore nel server');
        }
    } catch (error) {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante l\'invio.');
    }
}

// Gestione interfaccia utente
function initUI() {
    // Tooltip per gli indirizzi crypto
    const cryptoAddresses = document.querySelectorAll('.crypto-addresses p');
    cryptoAddresses.forEach(address => {
        address.addEventListener('click', () => {
            navigator.clipboard.writeText(address.textContent)
                .then(() => alert('Indirizzo copiato!'))
                .catch(err => console.error('Errore nella copia:', err));
        });
    });

    // Gestione chiusura avvisi
    document.querySelectorAll('.security-notice').forEach(notice => {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'close-btn';
        closeBtn.onclick = () => notice.remove();
        notice.prepend(closeBtn);
    });
}

function initUI() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Rimuovi classe attiva
            document.querySelectorAll('.tab-button, .tab-content').forEach(element => {
                element.classList.remove('active');
            });
            
            // Aggiungi classe attiva
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Listener globali
document.addEventListener('DOMContentLoaded', () => {
    // Inizializzazione componenti
    animateProgressBars();
    initUI();

    // Gestione cambio lingua
    const langSelectors = document.querySelectorAll('.language-selector select');
    langSelectors.forEach(select => {
        select.value = 'it'; // Imposta lingua di default
        
        select.addEventListener('change', function() {
            const lang = this.value;
            updateContent(lang);
            localStorage.setItem('preferredLang', lang);
        });
    });

    // Carica lingua preferita
    const savedLang = localStorage.getItem('preferredLang') || 'it';
    updateContent(savedLang);
    langSelectors.forEach(select => select.value = savedLang);

    // Gestione form
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

// Gestione scroll per navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});
