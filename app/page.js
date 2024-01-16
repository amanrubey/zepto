"use client";
import Card from '@/components/Card';

import React, { useState, useRef } from 'react';
export default function Home() {

  let [clicked, setClicked] = useState(false)
  let [selectedList, setSelectedList] = useState([""]);
  const cardRef = useRef(null);

  return (
    <main className='flex w-screen flex-col items-center p-4'>
      <div >
        <div className='flex justify-center'>
          <h1 className=' text-blue-500 mb-8'>
            Pick Users
          </h1>
        </div>
        <div className='' onClick={() => setClicked(true)}>
          <Card selectedList={selectedList} setSelectedList={setSelectedList} cardRef={cardRef} clicked={clicked} setClicked={setClicked} />
        </div>
      </div>
    </main>
  )
}
