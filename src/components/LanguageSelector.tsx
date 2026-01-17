import { useState, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);

  useEffect(() => {
    // Check if Google Translate script is loaded
    const addGoogleTranslateScript = () => {
      const existingScript = document.getElementById("google-translate-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate
        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "fr",
              includedLanguages: "fr,en,es,de,zh-CN,ja,pt,ar",
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        };
      }
    };

    addGoogleTranslateScript();
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    
    // Trigger Google Translate
    const translateElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (translateElement) {
      const langMap: Record<string, string> = {
        fr: "fr",
        en: "en",
        es: "es",
        de: "de",
        zh: "zh-CN",
        ja: "ja",
        pt: "pt",
        ar: "ar",
      };
      translateElement.value = langMap[lang.code] || lang.code;
      translateElement.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted/50 px-3 py-1.5 rounded-full transition-all hover:bg-muted"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
            <span className="sm:hidden">{currentLang.flag}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border border-border/50">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className="flex items-center justify-between cursor-pointer hover:bg-muted/50"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {currentLang.code === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LanguageSelector;
