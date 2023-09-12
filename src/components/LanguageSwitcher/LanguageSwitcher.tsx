import { useTranslation } from "react-i18next"

const languageOptions = [
  {
    name: 'English',
    value: 'en'
  },
  {
    name: 'Español',
    value: 'es'
  },
  {
    name: 'Português',
    value: 'ptBR'
  }
]

export function LanguageSwitcher() {
  
  const { i18n } = useTranslation()
  
  return (
    <div className="flex items-center justify-center gap-2">
      {languageOptions.map((languageOption) => (
        <button
          key={languageOption.value}
          onClick={() => {
            i18n.changeLanguage(languageOption.value)
          }}
          className="bg-none border-none px-2"
        >

          <span
            style={{
              fontWeight:
                i18n.language === languageOption.value ? 'bold' : 'normal',
              textDecoration:
                i18n.language === languageOption.value ? 'underline' : 'none'
            }}
            className="text-emerald-200 hover:opacity-70"
          >
            {languageOption.name}
          </span>

        </button>
      ))}
    </div>
  )
}