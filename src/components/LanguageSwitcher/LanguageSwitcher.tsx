import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const languageOptions = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Español',
    value: 'es',
  },
  {
    name: 'Português',
    value: 'ptBR',
  },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className=" flex items-center justify-center">
      {languageOptions.map((languageOption) => (
        <Button
          variant={'outline'}
          key={languageOption.value}
          onClick={() => {
            i18n.changeLanguage(languageOption.value);
          }}
          className="bg-none border-none px-2"
        >
          <span
            style={{
              fontWeight:
                i18n.language === languageOption.value ? 'bold' : 'normal',
              textDecoration:
                i18n.language === languageOption.value ? 'underline' : 'none',
            }}
            className="text-emerald-300 hover:opacity-70"
          >
            {languageOption.name}
          </span>
        </Button>
      ))}
    </div>
  );
}
