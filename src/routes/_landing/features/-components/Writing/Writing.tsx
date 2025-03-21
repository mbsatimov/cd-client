import { motion } from 'framer-motion';

export const Writing = () => {
  return (
    <div className='py-10 md:py-20'>
      <h1 className='mb-20 mt-4 text-left text-4xl font-extrabold tracking-tight md:text-6xl md:leading-none lg:text-7xl'>
        Writing
      </h1>
      <div className='relative grid grid-cols-1 gap-20 md:grid-cols-3'>
        <div>
          <p className='text-base font-normal md:text-xl lg:text-2xl lg:leading-normal'>
            Make it easy for your team to keep track of solicitation responses. No more digging
            through emails or shared drives.
          </p>
        </div>
        <motion.div
          className='relative md:col-span-2'
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 'some' }}
        >
          <img
            alt='Writing'
            className='mx-auto scale-100 rounded-2xl object-contain shadow-2xl blur-0 transition duration-500'
            src='/landing/features/writing.png'
          />
        </motion.div>
      </div>
    </div>
  );
};
