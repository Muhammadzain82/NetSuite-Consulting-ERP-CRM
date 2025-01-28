import React from 'react'

const Heroimage = () => {
  return (
    <div className='relative mt-5'>
      {/* Line Image */}
      <img
        src="./images/line.png"
        alt="Line"
        className="absolute left-0 -rotate-12 h-6 lg:h-auto md:h-10 " data-aos="fade-down"
        data-aos-duration="10000"
        style={{ top: 0 }}
      />

      {/* Frame Image */}
      <img
        src="./images/Frame.png"
        alt="Frame"
        className="absolute right-0 rotate-17 h-10 lg:h-auto md:h-10" data-aos="fade-down"
        data-aos-duration="10000"
        style={{ top: 0 }}
      />

      {/* Hero Image */}
      <img
        src="./images/hero.png"
        alt="Hero"
        className="relative mx-auto" data-aos="flip-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      />
    </div>
  )
}

export default Heroimage;
