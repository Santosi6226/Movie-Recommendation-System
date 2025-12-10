import { Globe } from "lucide-react";
import { languages, LanguageCode } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const currentLang = languages.find((l) => l.code === currentLanguage);

  return (
    <Select value={currentLanguage} onValueChange={(val) => onLanguageChange(val as LanguageCode)}>
      <SelectTrigger className="w-auto gap-2 bg-muted border-border/50 hover:bg-muted/80">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <SelectValue>
          {currentLang?.nativeName || "English"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] bg-card border-border">
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="cursor-pointer hover:bg-muted"
          >
            <span className="font-medium">{lang.nativeName}</span>
            <span className="ml-2 text-muted-foreground text-sm">
              ({lang.name})
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
