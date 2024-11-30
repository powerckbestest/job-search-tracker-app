import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ru',
    name: 'Русский',
  },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      localStorage.setItem('language', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid="language-selector">
          <Globe className="h-5 w-5" />
          <span>{LANGUAGES.find((l) => l.code === currentLanguage)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            className={`flex w-full items-center justify-between px-4 py-2 transition-colors duration-200 hover:bg-gray-100 ${
              currentLanguage === language.code
                ? 'bg-blue-50 text-blue-600'
                : ''
            } `}
            onClick={() => changeLanguage(language.code)}
            data-testid={`language-selector-${language.code}`}
          >
            <span>{language.name}</span>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 text-blue-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
