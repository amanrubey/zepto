"use client";
import React, { useEffect, useState, useRef } from 'react';
import people from '@/lib/people';
import Image from 'next/image';

export default function Card4({ selectedList, setSelectedList, cardRef, clicked, setClicked }) {
    let mails = selectedList;
    const [newList, setNewList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    let newpeople = people.filter((p) => mails.includes(p.email))
    let [txt, settxt] = useState("");
    useEffect(() => {
        setNewList(
            people.filter(
                (p) =>
                    p.name.toLowerCase().includes(txt.toLowerCase()) &&
                    !selectedList.includes(p.email)
            )
        );
    }, [txt, selectedList]);

    useEffect(() => {
        if (selectedIndex !== null && cardRef.current) {
            cardRef.current.scrollTo(0, selectedIndex * 38);
        }
    }, [selectedIndex]);

    function handleSelect(key) {
        setSelectedList((prevArray) => [...prevArray, key]);
        setNewList((prev) => prev.filter((p) => p.email !== key));
        setSelectedIndex(-1);
    }

    function handleKeyDown(e, key) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev === -1 ? newList.length - 1 : (prev - 1 + newList.length) % newList.length
            );
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % newList.length);
        } else if (e.key === 'Enter' && selectedIndex !== -1) {
            handleSelect(newList[selectedIndex]?.email);
        }
    }

    function handle(e) {
        let handletxt = e.target.value;
        settxt(handletxt);
        setClicked(true);
    }

    return (
        <>
            <div className='flex gap-2 w-[40rem] duration-100 flex-wrap p-2 '>
                {newpeople.map((prs) => {
                    return <div key={prs.email} onKeyDown={() => setSelectedList(pre => pre.filter((p) => !p.includes(prs.email)))} className='w-max hover:border-[0.1px] duration-100  hover:border-blue-600 bg-gray-50 flex items-center gap-2 p-2 rounded-full'>
                        <Image
                            className='rounded-full'
                            width={36}
                            height={36}
                            src={prs.photoUrl}
                            alt="img" />
                        <p >{prs.name}</p>
                        <p onClick={() => setSelectedList(pre => pre.filter((p) => p && !p.includes(prs.email)))} className='text-sm duration-200 mr-2 font-bold hover:cursor-pointer'>X</p>
                    </div>
                })
                }
                <input
                onChange={handle}
                className='p-2 flex-grow outline-none caret-blue-300'
                type="text"
                placeholder="Add new user"
                onKeyDown={(e) => handleKeyDown(e)}
            />
            </div>

            <div className='border-b-4 border-b-blue-600'></div>
            
            {clicked && (
                <div
                    className={`shadow-lg focus:outline-none h-48 overflow-scroll flex flex-col gap-2 p-2 `}
                    ref={cardRef}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    {newList.map((prs, ind) => (
                        <div
                            key={prs.email}
                            onClick={() => handleSelect(prs.email)}
                            className={`flex rounded-md hover:cursor-pointer outline-none gap-2 p-2 items-center focus:outline-none focus:border-none  ${selectedIndex === ind ? 'bg-gray-200' : ''
                                }`}
                            onKeyDown={(e) => handleKeyDown(e)}
                        >
                            <Image
                                className='rounded-full'
                                height={30}
                                width={30}
                                src={prs.photoUrl}
                                alt='img'
                            />
                            <p className='text-sm'>{prs.name}</p>
                            <p className='text-sm text-gray-500'>{prs.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
