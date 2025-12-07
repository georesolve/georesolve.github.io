import { Menu, ActionIcon, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useLanguageStore } from '@/store/languageStore';
import { Language, languageNames, languageFlags } from '@/i18n';

const languages: Language[] = ['en', 'vi'];

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguageStore();

  return (
    <Menu shadow="md" width={160}>
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg" aria-label={t.language.select}>
          <Text size="lg" style={{ lineHeight: 1 }}>{languageFlags[language]}</Text>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t.language.select}</Menu.Label>
        {languages.map((lang) => (
          <Menu.Item
            key={lang}
            onClick={() => setLanguage(lang)}
            leftSection={<Text size="md">{languageFlags[lang]}</Text>}
            rightSection={
              language === lang ? <IconCheck size={14} color="var(--mantine-color-cyan-6)" /> : null
            }
          >
            {languageNames[lang]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

