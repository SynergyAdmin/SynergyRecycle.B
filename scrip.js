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