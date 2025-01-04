document.addEventListener('DOMContentLoaded', function() {
    // 首先定義當前語言
    let currentLang = localStorage.getItem('preferredLanguage') || 'zh-TW';
    
    // 確保 translations 存在
    if (typeof window.translations === 'undefined') {
        console.error('Translations not loaded!');
        return;
    }

    // 初始化 AOS 動畫
    AOS.init({
        duration: 1000,
        once: true
    });

    // 打字效果相關變量
    let texts = window.translations[currentLang].hero.titles;
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    // 打字效果函數
    function type() {
        if (!texts || count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        if (currentText) {
            letter = currentText.slice(0, ++index);
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
                typingElement.textContent = letter;
            }
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

    // 語言切換功能
    function changeLang(lang) {
        console.log('Changing language to:', lang);
        
        if (!window.translations[lang]) {
            console.error('Translation not found for language:', lang);
            return;
        }

        try {
            // 更新當前語言
            currentLang = lang;
            texts = window.translations[lang].hero.titles;
            
            // 更新導航欄
            document.querySelector('.logo-subtitle').textContent = window.translations[lang].logo.subtitle;
            
            // 更新導航鏈接
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks[0].textContent = window.translations[lang].nav.home;
            navLinks[1].textContent = window.translations[lang].nav.projects;
            navLinks[2].textContent = window.translations[lang].nav.about;
            navLinks[3].textContent = window.translations[lang].nav.contact;

            // 更新英雄區塊
            document.querySelector('.greeting').textContent = window.translations[lang].hero.greeting;
            document.querySelector('.name').textContent = window.translations[lang].hero.name;
            
            // 重置打字效果
            count = 0;
            index = 0;
            
            // 更新描述
            const descriptions = document.querySelectorAll('.hero-description p');
            window.translations[lang].hero.description.forEach((text, i) => {
                if (descriptions[i]) descriptions[i].textContent = text;
            });
            
            // 更新滾動提示
            document.querySelector('.scroll-text').textContent = window.translations[lang].hero.scrollText;
            
            // 更新專長區
            document.querySelector('#projects .section-title').textContent = window.translations[lang].projects.title;
            const projectItems = document.querySelectorAll('.project-item');
            window.translations[lang].projects.items.forEach((item, i) => {
                if (projectItems[i]) {
                    projectItems[i].querySelector('h3').textContent = item.title;
                    projectItems[i].querySelector('p').textContent = item.desc;
                }
            });
            
            // 更新關於我區塊
            document.querySelector('#about .section-title').textContent = window.translations[lang].about.title;
            const aboutItems = document.querySelectorAll('.about-item');
            aboutItems[0].querySelector('h3').textContent = window.translations[lang].about.background.title;
            aboutItems[0].querySelector('p').textContent = window.translations[lang].about.background.content;
            aboutItems[1].querySelector('h3').textContent = window.translations[lang].about.personality.title;
            aboutItems[1].querySelector('p').textContent = window.translations[lang].about.personality.content;
            aboutItems[2].querySelector('h3').textContent = window.translations[lang].about.skills.title;
            
            // 更新技能標籤
            const skillTags = document.querySelectorAll('.skill-tag');
            window.translations[lang].about.skills.items.forEach((skill, i) => {
                if (skillTags[i]) skillTags[i].textContent = skill;
            });
            
            // 更新聯絡區塊
            document.querySelector('#contact .section-title').textContent = window.translations[lang].contact.title;
            const contactTexts = document.querySelectorAll('.contact-text h3');
            contactTexts[0].textContent = window.translations[lang].contact.email;
            contactTexts[1].textContent = window.translations[lang].contact.phone;
            
            // 更新頁尾版權信息
            document.querySelector('.copyright').textContent = window.translations[lang].footer.copyright;
            
            // 更新社交媒體工具提示
            if (window.translations[lang].social) {
                const socialTooltips = document.querySelectorAll('.social-tooltip');
                socialTooltips[0].textContent = window.translations[lang].social.instagram;
                socialTooltips[1].textContent = window.translations[lang].social.line;
                socialTooltips[2].textContent = window.translations[lang].social.wechat;
            }

            // 更新語言選擇器顯示
            const selectedLang = document.querySelector('.selected-lang');
            const langOption = document.querySelector(`[data-lang="${lang}"]`);
            if (langOption && selectedLang) {
                const imgSrc = langOption.querySelector('img').src;
                const langText = langOption.querySelector('span').textContent;
                selectedLang.querySelector('img').src = imgSrc;
                selectedLang.querySelector('span').textContent = langText;
            }

            // 更新 HTML 語言屬性
            document.documentElement.lang = lang;
            
            // 儲存語言偏好
            localStorage.setItem('preferredLanguage', lang);

            console.log('Language changed successfully');

        } catch (error) {
            console.error('Error updating language:', error);
        }
    }

    // 語言選擇器事件監聽
    const langSelector = document.querySelector('.language-selector');
    const selectedLang = document.querySelector('.selected-lang');
    const langOptions = document.querySelectorAll('.lang-dropdown li');

    // 點擊語言選擇器
    if (selectedLang) {
        selectedLang.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('active');
            console.log('Language selector clicked');
        });
    }

    // 點擊語言選項
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            console.log('Language option clicked:', lang);
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

    // WeChat 彈窗相關
    const wechatLink = document.getElementById('wechat-link');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.querySelector('.close-modal');

    // 阻止 WeChat 鏈接的默認行為並顯示彈窗
    wechatLink.addEventListener('click', function(e) {
        e.preventDefault();
        wechatModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // 關閉按鈕點擊事件
    closeModal.addEventListener('click', function() {
        wechatModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // 點擊彈窗背景關閉
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
