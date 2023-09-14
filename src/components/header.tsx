import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { ModeToggle } from './mode-toggle';

export function Header() {
  return (
    <header className=" px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.ai</h1>
      <LanguageSwitcher />
      <ModeToggle />
    </header>
  );
}
