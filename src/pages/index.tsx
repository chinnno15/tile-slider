// import { Dialog } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';
 

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Tile Slider</title>
        <meta
          name='description'
          content={`
        `}
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='isolate bg-white'>
        <main>
        <Image src="/el-diente-is-the-favorite.webp" alt='' height={500} width={500}></Image>    
        </main>
      </div>
    </>
  );
}
