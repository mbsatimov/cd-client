import { motion } from 'framer-motion';

import { BaseLayout } from '@/components/layout';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';

import { faqData } from './data';

export const Faq = () => {
  return (
    <BaseLayout className='py-10 md:py-20'>
      <h2 className='mb-10 text-center text-xl font-semibold md:mb-20 md:text-3xl'>
        <span className='md:hidden'>Frequently Asked Questions</span>
        <TextAnimate by='character' className='hidden md:block' animation='blurInUp' once>
          Frequently Asked Questions
        </TextAnimate>
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '0px 0px -30% 0px' }}
      >
        <Accordion className='mx-auto w-full max-w-3xl' type='single' collapsible>
          {faqData.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </BaseLayout>
  );
};
