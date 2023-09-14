import { GithubLogo, MagicWand } from '@phosphor-icons/react';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Slider } from './components/ui/slider';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';

export function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <header className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <ModeToggle />

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Button className="flex items-center gap-2 text-neutral-100">
              GitHub
              <GithubLogo size={16} weight="regular" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 flex gap-6">
          <section className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder={t('textAreaIncludePrompt')}
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder={t('textAreaResultPrompt')}
                readOnly
              />
            </div>

            <p className="text-sm text-emerald-700">{t('ReminderMessage')}</p>
          </section>

          <aside className="w-80 space-y-6">
            <VideoInputForm />

            <Separator />

            <form className="space-y-6">
              <div className="space-y-2">
                <Label>{t('Prompt')}</Label>
                <PromptSelect />
                <span className="block text-xs text-muted-foreground">
                  {t('CustomizeOption')}
                </span>
              </div>

              <div className="space-y-2">
                <Label>{t('Model')}</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground">
                  {t('CustomizeOption')}
                </span>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>{t('Temperature')}</Label>
                <Slider min={0} max={1} step={0.1} />

                <span className="block text-xs text-muted-foreground leading-relaxed">
                  {t('HigherValuesCreative')}
                </span>
              </div>

              <Separator />

              <Button
                type="submit"
                className="w-full text-neutral-100 flex items-center justify-center gap-1"
              >
                {t('Run')} <MagicWand size={16} weight="regular" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  );
}
