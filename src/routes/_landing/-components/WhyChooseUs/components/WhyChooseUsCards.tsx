import { motion } from 'framer-motion';
import React from 'react';

import { cardsData } from './cards-data';
import { FocusCard } from './FocusCard';

export const WhyChooseUsCards = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8'>
      {cardsData.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          <FocusCard card={card} index={index} hovered={hovered} setHovered={setHovered} />
        </motion.div>
      ))}
    </div>
  );
};
