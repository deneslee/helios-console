import { Button, Group, Stack, Text, Textarea } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

/** Shift notes stay on the device — no network, no query cache. */
export function NotesPanel() {
  const [notes, setNotes] = useLocalStorage({ key: 'helios.shift-notes', defaultValue: '' });

  return (
    <Stack gap="xs" p="sm">
      <Text size="xs" c="dimmed">
        Handover notes for the next shift. Saved on this device only.
      </Text>
      <Textarea
        value={notes}
        onChange={(event) => setNotes(event.currentTarget.value)}
        placeholder="Kestrel Flats inverter still isolated — do not re-energise before the vendor call."
        autosize
        minRows={8}
        aria-label="Shift notes"
      />
      <Group justify="flex-end">
        <Button size="xs" variant="subtle" color="gray" onClick={() => setNotes('')}>
          Clear notes
        </Button>
      </Group>
    </Stack>
  );
}
