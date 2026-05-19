/* -------------------------------------------------
   Salão de Beleza Dona Flor – script principal
   ------------------------------------------------- */

/* ==== MENU HAMBURGUER ==== */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Fechar o menu ao clicar em um link
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

/* ==== CHATBOT ==== */
const chatToggle   = document.getElementById('chatbot-toggle');
const chatBox      = document.getElementById('chatbot');
const chatClose    = document.getElementById('chatbot-close');
const chatBody     = document.getElementById('chatbot-body');
const chatInput    = document.getElementById('chatbot-input');
const chatSendBtn  = document.getElementById('chatbot-send');

/* abrir/fechar chatbot */
chatToggle.addEventListener('click', () => chatBox.classList.add('active'));
chatClose.addEventListener('click', () => chatBox.classList.remove('active'));

/* enviar mensagem */
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Resposta automática (simples)
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot';
        botMsg.textContent = gerarRespostaAutomatica(text);
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

/* Eventos de envio */
chatSendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

/* Função de resposta automática (pode ser ampliada) */
function gerarRespostaAutomatica(entrada) {
    const lower = entrada.toLowerCase();

    if (lower.includes('horário') || lower.includes('aberto')) {
        return 'Nosso horário de funcionamento é de segunda a sábado, das 9h às 20h. Agende seu Atendimento! 😄';
    }
    if (lower.includes('agendar') || lower.includes('marcar')) {
        return 'Para agendar, clique em [Agende pelo WhatsApp] aqui no nosso Site. Você será direcionada direto para nosso Atendimento no WhatsApp. Aguardamos seu Contato! 😄';
    }
    if (lower.includes('preço') || lower.includes('valor')) {
        return 'Nossos preços variam conforme o serviço. Por favor, consulte a página de Serviços aqui no nosso Site. 😄';
    }
    if (lower.includes('endereço') || lower.includes('localização')) {
        return 'Estamos na Praça de Armação, em Salvador. Confira na Página Localização aqui no nosso Site, de lá você pode acessar a localização exata no seu celular, pelo Google Maps! 😄 .';
    }
    // fallback genérico
    return 'Obrigado pelo Contato! 😄';
}
