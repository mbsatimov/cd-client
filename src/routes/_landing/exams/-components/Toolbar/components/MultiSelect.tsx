import { Check, ChevronsUpDownIcon } from 'lucide-react';

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components/ui';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  options: {
    label: string;
    value: string;
  }[];
}

export const MultiSelect = ({ title, options, value, onValueChange }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='outline'>
          {title}
          {value.length > 0 && (
            <>
              <Separator className='mx-2 h-4' orientation='vertical' />
              <Badge className='rounded-sm px-1 font-normal lg:hidden' variant='secondary'>
                {value.length}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {value.length > 2 ? (
                  <Badge className='rounded-sm px-1 font-normal' variant='secondary'>
                    {value.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => value.includes(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                        variant='secondary'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
          <ChevronsUpDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onValueChange(value.filter((val) => val !== option.value));
                      } else {
                        onValueChange([...value, option.value]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {value.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className='justify-center text-center'
                    onSelect={() => onValueChange([])}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
