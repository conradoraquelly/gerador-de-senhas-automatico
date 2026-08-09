// Seleção dos elementos do DOM
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const toast = document.getElementById('toast');

// Conjuntos de caracteres
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Atualiza o texto do tamanho da senha garantindo o limite máximo de 12
lengthInput.addEventListener('input', (e) => {
  let value = parseInt(e.target.value, 10);
  if (value > 12) value = 12;
  lengthValue.textContent = value;
});

// Função para gerar senha aleatória utilizando API Criptográfica
function generatePassword() {
  let allowedChars = '';
  
  if (uppercaseEl.checked) allowedChars += CHAR_SETS.uppercase;
  if (lowercaseEl.checked) allowedChars += CHAR_SETS.lowercase;
  if (numbersEl.checked) allowedChars += CHAR_SETS.numbers;
  if (symbolsEl.checked) allowedChars += CHAR_SETS.symbols;

  // Validação: caso o usuário desmarque todas as opções
  if (allowedChars === '') {
    alert('Por favor, selecione ao menos um tipo de caractere!');
    return;
  }

  // Garante estritamente no máximo 12 caracteres
  let length = parseInt(lengthInput.value, 10);
  if (length > 12) {
    length = 12;
    lengthInput.value = 12;
    lengthValue.textContent = 12;
  }

  let password = '';
  // Utiliza a API Web Crypto para aleatoriedade de alta segurança
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += allowedChars[randomValues[i] % allowedChars.length];
  }

  passwordInput.value = password;
}

// Função para copiar a senha para a área de transferência
async function copyPassword() {
  if (!passwordInput.value) return;

  try {
    await navigator.clipboard.writeText(passwordInput.value);
    showToast();
  } catch (err) {
    // Fallback de cópia caso a API Clipboard esteja bloqueada
    passwordInput.select();
    document.execCommand('copy');
    showToast();
  }
}

// Exibe mensagem visual temporária ao copiar
function showToast() {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Gerar uma senha automaticamente ao carregar a página
generatePassword();