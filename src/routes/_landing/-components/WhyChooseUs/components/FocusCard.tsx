import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props {
  hovered: number | null;
  index: number;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  card: {
    title: string;
    description: string;
  };
}

export const FocusCard = React.memo(({ card, index, hovered, setHovered }: Props) => (
  <Card
    className={cn(
      'group h-full rounded-3xl transition-all duration-300 ease-out hover:bg-gradient-to-br hover:from-primary/10 hover:to-yellow-500/10 hover:shadow-xl hover:shadow-primary/20',
      hovered !== null && hovered !== index && 'md:scale-[0.98] md:blur-sm'
    )}
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
  >
    <CardHeader className={cn('px-4 py-8 transition-opacity duration-300')}>
      <CardTitle className='text-xl'>{card.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription
        className={cn('opacity- transition-opacity duration-300 group-hover:opacity-100')}
      >
        {card.description}
      </CardDescription>
    </CardContent>
  </Card>
));
FocusCard.displayName = 'FocusCard';
