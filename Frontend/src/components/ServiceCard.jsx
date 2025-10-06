import React, { useState, useRef } from 'react'
import { motion } from "motion/react"


const ServiceCard = ({service, index}) => {

    const [position, setPosition] = useState({x: 0, y: 0})
    const [visible, setVisible] = useState(false);

    const divRef = useRef(null)

    const handleMouseMove = (e)=>{
        if (divRef.current) {
            const bounds = divRef.current.getBoundingClientRect();
            setPosition({x: e.clientX - bounds.left, y: e.clientY - bounds.top})
        }
    }

  return (
    <motion.div 
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.5, delay: index * 0.2}}
    viewport={{once: true}}

        className="relative m-2 max-w-lg overflow-hidden
            rounded-xl border border-gray-200 shadow-2xl
            shadow-gray-100 dark:border-gray-700 sm:m-4 dark:shadow-white/10"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        ref={divRef}
        onMouseMove={handleMouseMove}
    >
        <div
            className={`pointer-events-none absolute z-0 h-[300px]
                w-[300px] rounded-full bg-gradient-to-r
                from-blue-500 via-indigo-500 to-purple-500
                blur-2xl mix-blend-lighten transition-opacity
                duration-500 ${visible ? 'opacity-70' : 'opacity-0'}`}
            style={{ top: position.y - 150, left: position.x - 150 }}
        />

        <div
            className="relative z-10 flex items-center gap-10
                rounded-[10px] bg-white p-8 transition-all
                hover:m-0.5 hover:p-7.5 dark:bg-gray-900"
        >
            <div className='rounded-full bg-gray-100 dark:bg-gray-700'>
                <img
                    src={service.icon}
                    alt=""
                    className='m-2 max-w-24 rounded-full bg-white dark:bg-gray-900'
                />
            </div>
            <div className='flex-1'>
                <h3 className='break-words font-bold'>
                    {service.title}
                </h3>
                <p className='mt-2 break-words text-sm'>
                    {service.description}
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default ServiceCard