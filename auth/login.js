// Generate Blockchain Background
        function createBlockchainBg() {
            const container = document.getElementById('blockchainBg');
            const cubeCount = 15;

            for (let i = 0; i < cubeCount; i++) {
                const cube = document.createElement('div');
                cube.className = 'blockchain-cube';
                
                cube.style.left = Math.random() * 100 + '%';
                cube.style.top = Math.random() * 100 + '%';
                cube.style.animationDelay = Math.random() * 8 + 's';
                cube.style.animationDuration = (8 + Math.random() * 4) + 's';
                
                container.appendChild(cube);
            }
        }

        createBlockchainBg();

        // Password Toggle
        const passwordInput = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');

        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePassword.textContent = isPassword ? '🙈' : '👁️';
            
            togglePassword.style.transform = 'translateY(-50%) scale(1.2)';
            setTimeout(() => {
                togglePassword.style.transform = 'translateY(-50%) scale(1)';
            }, 150);
        });

        // Login Form Handler
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('identifier').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            console.log('Login attempt:', { identifier, password, remember });
            alert('Fitur login akan diintegrasikan dengan backend!');
        });

        // Google Login
        document.getElementById('googleLogin').addEventListener('click', () => {
            console.log('Google login clicked');
            alert('Fitur Google OAuth akan diintegrasikan!');
        });

        // Apple Login
        document.getElementById('appleLogin').addEventListener('click', () => {
            console.log('Apple login clicked');
            alert('Fitur Apple Sign In akan diintegrasikan!');
        });

        // MetaMask Login
        document.getElementById('metamaskLogin').addEventListener('click', async () => {
            console.log('MetaMask login clicked');
            
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ 
                        method: 'eth_requestAccounts' 
                    });
                    console.log('Connected account:', accounts[0]);
                    alert(`Terhubung dengan MetaMask!\nAddress: ${accounts[0]}`);
                } catch (error) {
                    console.error('MetaMask connection error:', error);
                    alert('Gagal terhubung dengan MetaMask');
                }
            } else {
                alert('MetaMask tidak terdeteksi! Silakan install MetaMask extension.');
                window.open('https://metamask.io/download/', '_blank');
            }
        });