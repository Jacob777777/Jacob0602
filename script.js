document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS 動畫
    AOS.init({
        duration: 1000,
        once: true
    });

    // 打字效果
    const texts = ['高中生', '程式愛好者', '系統維護者'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.querySelector('.typing-text').textContent = letter;
        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
            }, 2000);
        }
        setTimeout(type, 200);
    }

    // 啟動打字效果
    type();

    // 漢堡選單
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // WeChat 彈窗控制
    const wechatLink = document.getElementById('wechat-link');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.querySelector('.close-modal');

    wechatLink.addEventListener('click', function(e) {
        e.preventDefault();
        wechatModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    });

    closeModal.addEventListener('click', function() {
        wechatModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢復背景滾動
    });

    // 點擊彈窗外部關閉
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            wechatModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // ESC 鍵關閉彈窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wechatModal.style.display === 'block') {
            wechatModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
