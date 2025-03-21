import { useQueryState } from 'nuqs';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

export const Toolbar = () => {
  const [type, setType] = useQueryState('type', { defaultValue: '' });

  return (
    <div className='flex gap-4'>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Delivery format' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='CD'>IELTS on computer</SelectItem>
          <SelectItem value='PAPER'>IELTS on paper</SelectItem>
          {type && (
            <>
              <SelectSeparator />
              <Button
                className='w-full px-2'
                size='sm'
                variant='secondary'
                onClick={(e) => {
                  e.stopPropagation();
                  setType('');
                }}
              >
                Clear
              </Button>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
