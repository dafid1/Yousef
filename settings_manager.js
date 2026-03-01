// Global Settings Manager
class SettingsManager {
    constructor() {
        this.themes = {
            'blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'green': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'purple': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'dark': 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)'
        };
        this.init();
    }

    init() {
        this.loadSettings();
        this.applySettings();
    }

    loadSettings() {
        this.currentTheme = localStorage.getItem('theme') || 'blue';
        this.currentLanguage = localStorage.getItem('language') || 'ar';
        this.textDirection = localStorage.getItem('textDirection') || 'rtl';
        this.darkMode = localStorage.getItem('darkMode') === 'true';
    }

    applySettings() {
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Apply text direction
        document.body.dir = this.textDirection;
        
        // Apply dark mode
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Apply language
        this.applyLanguage(this.currentLanguage);
    }

    applyTheme(theme) {
        const elements = document.querySelectorAll('.theme-gradient, .gradient-bg');
        elements.forEach(el => {
            el.style.background = this.themes[theme] || this.themes['blue'];
        });
        
        // Apply to body if it has gradient class
        if (document.body.classList.contains('gradient-bg')) {
            document.body.style.background = this.themes[theme];
        }
        
        // Update theme-specific classes
        document.querySelectorAll('.theme-blue').forEach(el => {
            if(theme === 'blue') el.style.background = this.themes['blue'];
        });
        document.querySelectorAll('.theme-green').forEach(el => {
            if(theme === 'green') el.style.background = this.themes['green'];
        });
        document.querySelectorAll('.theme-purple').forEach(el => {
            if(theme === 'purple') el.style.background = this.themes['purple'];
        });
        document.querySelectorAll('.theme-dark').forEach(el => {
            if(theme === 'dark') el.style.background = this.themes['dark'];
        });
    }

    applyLanguage(lang) {
        // This would be extended to handle language switching
        // For now, just updates the language display if it exists
        const langDisplay = document.getElementById('languageDisplay');
        if (langDisplay) {
            langDisplay.innerHTML = lang === 'ar' ? 
                '<span class="material-symbols-outlined">language</span><span>العربية</span>' :
                '<span class="material-symbols-outlined">language</span><span>English</span>';
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
    }

    setTextDirection(direction) {
        this.textDirection = direction;
        localStorage.setItem('textDirection', direction);
        document.body.dir = direction;
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    // Get current settings
    getSettings() {
        return {
            theme: this.currentTheme,
            language: this.currentLanguage,
            textDirection: this.textDirection,
            darkMode: this.darkMode
        };
    }
}

// Initialize settings manager
const settingsManager = new SettingsManager();

// Make it globally available
window.settingsManager = settingsManager;