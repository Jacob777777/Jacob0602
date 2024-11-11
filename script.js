document.addEventListener('DOMContentLoaded', function() {
    // 首先定義當前語言
    let currentLang = localStorage.getItem('preferredLanguage') || 'zh-TW';
    
    // 初始化 AOS 動畫
    AOS.init({
        duration: 1000,
        once: true
    });

    // 打字效果
    let texts = translations[currentLang].hero.titles; // 使用當前語言的標題
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (!texts || count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        if (currentText) {
            letter = currentText.slice(0, ++index);
            document.querySelector('.typing-text').textContent = letter;
            if (letter.length === currentText.length) {
                setTimeout(() => {
                    index = 0;
                    count++;
                }, 2000);
            }
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
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function() {
        wechatModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            wechatModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && wechatModal.style.display === 'block') {
            wechatModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // 語言選擇器相關代碼
    const langSelector = document.querySelector('.language-selector');
    const selectedLang = document.querySelector('.selected-lang');
    const langOptions = document.querySelectorAll('.lang-dropdown li');

    // 語言切換功能
    function changeLang(lang) {
        if (!translations[lang]) {
            console.error('Translation not found for language:', lang);
            return;
        }

        try {
            currentLang = lang; // 更新當前語言
            
            // 更新導航欄
            document.querySelector('.logo-subtitle').textContent = translations[lang].logo.subtitle;
            document.querySelector('a[href="#home"]').textContent = translations[lang].nav.home;
            document.querySelector('a[href="#projects"]').textContent = translations[lang].nav.projects;
            document.querySelector('a[href="#about"]').textContent = translations[lang].nav.about;
            document.querySelector('a[href="#contact"]').textContent = translations[lang].nav.contact;

            // 更新英雄區塊
            document.querySelector('.greeting').textContent = translations[lang].hero.greeting;
            document.querySelector('.name').textContent = translations[lang].hero.name;
            
            // 更新打字效果的文字
            texts = translations[lang].hero.titles;
            count = 0;
            index = 0;
            
            // 更新描述
            const descriptions = document.querySelectorAll('.hero-description p');
            translations[lang].hero.description.forEach((text, i) => {
                if (descriptions[i]) descriptions[i].textContent = text;
            });
            
            // 更新滾動提示
            document.querySelector('.scroll-text').textContent = translations[lang].hero.scrollText;
            
            // 更新專長區標題和內容
            document.querySelector('#projects .section-title').textContent = translations[lang].projects.title;
            const projectItems = document.querySelectorAll('.project-item');
            translations[lang].projects.items.forEach((item, i) => {
                if (projectItems[i]) {
                    projectItems[i].querySelector('h3').textContent = item.title;
                    projectItems[i].querySelector('p').textContent = item.desc;
                }
            });
            
            // 更新關於我區塊
            document.querySelector('#about .section-title').textContent = translations[lang].about.title;
            const aboutItems = document.querySelectorAll('.about-item');
            aboutItems[0].querySelector('h3').textContent = translations[lang].about.background.title;
            aboutItems[0].querySelector('p').textContent = translations[lang].about.background.content;
            aboutItems[1].querySelector('h3').textContent = translations[lang].about.personality.title;
            aboutItems[1].querySelector('p').textContent = translations[lang].about.personality.content;
            aboutItems[2].querySelector('h3').textContent = translations[lang].about.skills.title;
            
            // 更新技能標籤
            const skillTags = document.querySelectorAll('.skill-tag');
            translations[lang].about.skills.items.forEach((skill, i) => {
                if (skillTags[i]) skillTags[i].textContent = skill;
            });
            
            // 更新聯絡區塊
            document.querySelector('#contact .section-title').textContent = translations[lang].contact.title;
            const contactTexts = document.querySelectorAll('.contact-text h3');
            contactTexts[0].textContent = translations[lang].contact.email;
            contactTexts[1].textContent = translations[lang].contact.phone;
            
            // 更新頁尾版權信息
            document.querySelector('.copyright').textContent = translations[lang].footer.copyright;
            
            // 更新 HTML 語言屬性
            document.documentElement.lang = lang;
            
            // 更新語言選擇器顯示
            const langOption = document.querySelector(`[data-lang="${lang}"]`);
            if (langOption) {
                const imgSrc = langOption.querySelector('img').src;
                const langText = langOption.querySelector('span').textContent;
                selectedLang.querySelector('img').src = imgSrc;
                selectedLang.querySelector('span').textContent = langText;
            }

            // 儲存語言偏好
            localStorage.setItem('preferredLanguage', lang);

        } catch (error) {
            console.error('Error updating language:', error);
        }
    }

    // 點擊語言選擇器
    selectedLang.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止事件冒泡
        langSelector.classList.toggle('active');
    });

    // 點擊語言選項
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            const lang = option.getAttribute('data-lang');
            changeLang(lang);
            langSelector.classList.remove('active');
        });
    });

    // 點擊外部關閉下拉選單
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            langSelector.classList.remove('active');
        }
    });

    // 初始化語言
    changeLang(currentLang);
});
