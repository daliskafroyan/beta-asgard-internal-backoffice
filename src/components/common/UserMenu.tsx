import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Text, ActionIcon } from '@mantine/core';

export default function UserMenu({ onLogOut }: { onLogOut: () => void }) {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="outline" size={30}>
          <UserCircleIcon width={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={onLogOut}>Log Out</Menu.Item>
        <Menu.Item
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
