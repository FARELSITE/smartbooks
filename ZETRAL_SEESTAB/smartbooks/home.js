 // ========================================
        // UTILITY FUNCTIONS
        // ========================================
        
        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
        }

        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            body.classList.toggle('light-theme');
            themeToggle.textContent = body.classList.contains('light-theme') ? '☀️' : '🌙';
        }

        // ========================================
        // ABOUT MODAL FUNCTIONS
        // ========================================
        
        function openAboutModal() {
            const modal = document.getElementById('aboutModal');
            modal.classList.add('active');
        }

        function closeAboutModal() {
            const modal = document.getElementById('aboutModal');
            modal.classList.remove('active');
        }

        // Close modal when clicking outside content
        document.addEventListener('click', function(event) {
            const modal = document.getElementById('aboutModal');
            if (event.target === modal) {
                closeAboutModal();
            }
        });

        // ========================================
        // NOTIFICATION FUNCTIONS
        // ========================================
        
        let notifications = [];

        function toggleNotifications() {
            const panel = document.getElementById('notificationPanel');
            panel.classList.toggle('active');
            
            if (panel.classList.contains('active')) {
                renderNotifications();
                // Close panel when clicking outside
                setTimeout(() => {
                    document.addEventListener('click', closeNotificationOnClickOutside);
                }, 0);
            } else {
                document.removeEventListener('click', closeNotificationOnClickOutside);
            }
        }

        function closeNotificationOnClickOutside(event) {
            const panel = document.getElementById('notificationPanel');
            const bell = document.querySelector('.notification-bell');
            
            if (!panel.contains(event.target) && !bell.contains(event.target)) {
                panel.classList.remove('active');
                document.removeEventListener('click', closeNotificationOnClickOutside);
            }
        }

        function renderNotifications() {
            const notificationList = document.getElementById('notificationList');
            const unreadCount = notifications.filter(n => n.unread).length;
            
            // Update badge
            const badge = document.getElementById('notificationBadge');
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
            
            if (notifications.length === 0) {
                notificationList.innerHTML = `
                    <div class="notification-empty">
                        <p>Tidak ada notifikasi</p>
                    </div>
                `;
                return;
            }
            
            notificationList.innerHTML = notifications.map(notif => `
                <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="markAsRead(${notif.id})">
                    <div class="notification-content">
                        <div class="notification-icon">${notif.icon}</div>
                        <div class="notification-text">
                            <div class="notification-title">${notif.title}</div>
                            <div class="notification-message">${notif.message}</div>
                            <div class="notification-time">${notif.time}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function markAsRead(notificationId) {
            const notification = notifications.find(n => n.id === notificationId);
            if (notification) {
                notification.unread = false;
                renderNotifications();
            }
        }

        function markAllAsRead() {
            notifications.forEach(n => n.unread = false);
            renderNotifications();
        }

        // Initialize notifications on page load
        window.addEventListener('load', () => {
            renderNotifications();
        });

        // ========================================
        // FEED FUNCTIONS
        // ========================================
        
        function viewFeed(feedType) {
            const targetFeed = document.querySelector(`[data-type="${feedType}"]`);
            if (targetFeed) {
                targetFeed.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                const feedBoxes = document.querySelectorAll('.feed-box');
                feedBoxes.forEach(box => {
                    box.style.display = (box.dataset.type === feedType || feedType === 'media' && box.dataset.type === 'media') ? 'block' : 'none';
                });
            }
        }

        function filterFeed(filter) {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const feedBoxes = document.querySelectorAll('.feed-box');
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            feedBoxes.forEach(box => {
                if (filter === 'all') {
                    box.style.display = 'block';
                } else if (filter === 'media') {
                    box.style.display = box.dataset.type === 'media' ? 'block' : 'none';
                } else {
                    box.style.display = box.dataset.type === filter ? 'block' : 'none';
                }
            });
        }

        // ========================================
        // POST INTERACTION FUNCTIONS
        // ========================================
        
        function toggleLike(postId) {
            const post = document.getElementById(postId);
            const btn = post.querySelector('.action-btn');
            const icon = btn.querySelector('.like-icon');
            const countSpan = btn.querySelector('.like-count');
            let count = parseInt(countSpan.textContent);

            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                icon.textContent = '🤍';
                count--;
            } else {
                btn.classList.add('liked');
                icon.textContent = '❤️';
                count++;
            }
            countSpan.textContent = count;
        }

        function toggleComment(postId) {
            const commentSection = document.getElementById(`comment-${postId}`);
            commentSection.classList.toggle('active');
        }

        function submitComment(postId) {
            const commentSection = document.getElementById(`comment-${postId}`);
            const textarea = commentSection.querySelector('.comment-input');
            const commentText = textarea.value.trim();

            if (commentText) {
                alert(`Komentar pada post ${postId}: ${commentText}`);
                textarea.value = '';
            } else {
                alert('Silakan tulis komentar terlebih dahulu!');
            }
        }

        function sharePost(postId) {
            alert(`Sharing post ${postId}`);
        }

        function repost(postId) {
            alert(`Reposting ${postId}`);
        }

        function showInsight(postId) {
            alert(`Insight untuk post ${postId}:\n\nViews: 0\nLikes: 0\nComments: 0\nShares: 0`);
        }

        function deletePost(postId) {
            const post = document.getElementById(postId);
            if (post.dataset.owner === 'current-user') {
                if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
                    post.remove();
                }
            }
        }

        function hidePost(postId) {
            const post = document.getElementById(postId);
            if (confirm('Sembunyikan postingan ini dari feed Anda?')) {
                post.style.display = 'none';
            }
        }

        // ========================================
        // SEARCH FUNCTION
        // ========================================
        
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Mencari:', searchTerm);
        });

        // ========================================
        // BLOCKCHAIN BACKGROUND ANIMATION
        // ========================================
        
        function createBlockchainBg() {
            const bg = document.getElementById('blockchainBg');
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            bg.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            const particles = [];
            const particleCount = 60;
            
            // Create particles with golden theme
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 2 + 1,
                    color: `hsla(${45 + Math.random() * 15}, 100%, ${50 + Math.random() * 20}%, ${0.6 + Math.random() * 0.4})`
                });
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach((p, i) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    
                    // Bounce off edges
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    
                    // Draw connections
                    particles.forEach((p2, j) => {
                        if (i !== j) {
                            const dx = p.x - p2.x;
                            const dy = p.y - p2.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            if (dist < 150) {
                                const opacity = (1 - dist / 150) * 0.5;
                                const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                                gradient.addColorStop(0, `rgba(255, 215, 0, ${opacity})`);
                                gradient.addColorStop(0.5, `rgba(255, 237, 78, ${opacity * 0.8})`);
                                gradient.addColorStop(1, `rgba(255, 165, 0, ${opacity})`);
                                
                                ctx.strokeStyle = gradient;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.stroke();
                            }
                        }
                    });
                    
                    // Draw particle with glow
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(0.5, `hsla(45, 100%, 60%, 0.3)`);
                    gradient.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw core
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Sparkle effect
                    if (Math.random() > 0.98) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }
        
        createBlockchainBg();

        // Resize handler
        window.addEventListener('resize', () => {
            const canvas = document.querySelector('#blockchainBg canvas');
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });