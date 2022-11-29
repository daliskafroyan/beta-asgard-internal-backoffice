import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ActionIcon, Menu } from '@mantine/core';

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
      </Menu.Dropdown>
    </Menu>
  );
}
