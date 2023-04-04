import React, { useRef } from 'react'

const Hamburger = ({ openMenu, setOpenMenu }) => {

    const menuRef = useRef()

    const clickMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <div ref={menuRef} onClick={clickMenu} className='cursor-pointer relative w-6 h-6'>
                <div className={`absolute  w-6 h-1 bg-gray-800 rounded-sm ${!openMenu ? 'top-0' : 'top-2 rotate-45  '} transition-transform`}></div>
                <div className={`absolute top-2 w-6 h-1 bg-gray-800 rounded-sm ${!openMenu ? '' : 'hidden  '} transition-transform`}></div>
                <div className={`absolute  w-6 h-1 bg-gray-800 rounded-sm ${!openMenu ? 'top-4' : 'top-2 -rotate-45  '} transition-transform`}></div>
            </div>
        </>
    )
}

export default Hamburger