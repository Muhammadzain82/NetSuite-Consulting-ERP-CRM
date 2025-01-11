import React from 'react'

const Heroimage = () => {
  return (
    <div className='relative mt-5'>
      {/* Line Image */}
      <img 
        src="./images/line.png" 
        alt="Line"
        className="absolute left-0 -rotate-12 "
        style={{ top: 0 }} 
      />
      
      {/* Frame Image */}
      <img 
        src="./images/Frame.png" 
        alt="Frame"
        className="absolute right-0 rotate-17 "
        style={{ top: 0 }} 
      />

      {/* Hero Image */}
      <img 
        src="./images/hero.png" 
        alt="Hero"
        className="relative mx-auto"
      />
    </div>
  )
}

export default Heroimage;
