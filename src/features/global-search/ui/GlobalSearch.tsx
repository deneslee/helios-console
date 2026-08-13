import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Combobox, Group, Kbd, Loader, Text, TextInput, useCombobox } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useGlobalSearch, type SearchResult } from '../model/use-global-search';

const kindLabel: Record<SearchResult['kind'], string> = {
  site: 'Site',
  'work-order': 'Work order',
  person: 'Person',
};

export interface GlobalSearchProps {
  placeholder?: string;
  maxWidth?: number;
}

export function GlobalSearch({
  placeholder = 'Search sites, work orders, people',
  maxWidth = 420,
}: GlobalSearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { term, setTerm, enabled, results, isPending } = useGlobalSearch();
  const combobox = useCombobox({ onDropdownClose: () => combobox.resetSelectedOption() });

  useHotkeys([['mod+K', () => inputRef.current?.focus()]]);

  const handleSubmit = (id: string) => {
    const hit = results.find((result) => result.id === id);
    if (!hit) return;
    navigate(hit.href);
    setTerm('');
    combobox.closeDropdown();
    inputRef.current?.blur();
  };

  return (
    <Combobox store={combobox} withinPortal onOptionSubmit={handleSubmit} shadow="md">
      <Combobox.Target>
        <TextInput
          ref={inputRef}
          value={term}
          placeholder={placeholder}
          aria-label="Search"
          leftSection={<IconSearch size={16} />}
          rightSection={isPending ? <Loader size={14} /> : <Kbd size="xs">⌘K</Kbd>}
          rightSectionWidth={46}
          style={{ flex: 1, maxWidth }}
          onChange={(event) => {
            setTerm(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!enabled}>
        <Combobox.Options mah={320} style={{ overflowY: 'auto' }}>
          {results.length === 0 && !isPending ? (
            <Combobox.Empty>No match. Try a site name or a work order.</Combobox.Empty>
          ) : (
            results.map((result) => (
              <Combobox.Option value={result.id} key={`${result.kind}-${result.id}`}>
                <Group justify="space-between" wrap="nowrap" gap="sm">
                  <div style={{ minWidth: 0 }}>
                    <Text size="sm" truncate>
                      {result.title}
                    </Text>
                    <Text size="xs" c="dimmed" truncate>
                      {result.subtitle}
                    </Text>
                  </div>
                  <Text size="xs" c="dimmed" className="u-mono" style={{ flex: 'none' }}>
                    {kindLabel[result.kind]}
                  </Text>
                </Group>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
