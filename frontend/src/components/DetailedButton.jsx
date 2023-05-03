import React from 'react';

const DetailedButton = ({title, handleClick, styles}) => {
  return (
    <button className={`bg-gradient-to-r from-green-700 to-green-900 font-semibold rounded-md min-h-[38px] px-2 drop-shadow-md text-[16px] outline outline-1 hover:from-green-600 hover:to-green-800 active:from-green-800 active:to-green-950 outline-black ${styles}`} onClick={handleClick}>
      {title}
    </button>
  )
}

export default DetailedButton;