import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}
export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className="bg-white max-w-xs p-4 pt-5 z-[98] shadow-lg rounded-lg border mt-2"
          align="end"
        >
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}
