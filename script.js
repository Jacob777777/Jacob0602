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
});
