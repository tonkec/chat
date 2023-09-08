import { colors } from './generateFlag'
import './Logo.scss'
const Logo = () => {
  const item = colors[Math.floor(Math.random() * colors.length)]
  const fillInColors = item.split(',').reverse()
  return (
    <div className='logo'>
      <svg
        width='70'
        height='70'
        version='1.1'
        viewBox='0 0 1919.9999 1840.3073'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <clipPath id='a'>
            <path
              d='m694.21-1060.1c-34.8-0.082-65.909 2.3606-91.271 4.5807-281.47 24.638-448.4 314.01-448.4 525.64-1e-3 211.62 74.676 497.55 510.43 774.19 435.76 276.64 416.72 379.42 449.57 535.9 32.845-156.48 13.811-259.27 449.57-535.9 435.76-276.64 510.43-562.56 510.43-774.19 0-211.62-166.93-501-448.4-525.64-115.94-10.149-352-24.983-511.6 218.3-124.69-190.06-296.04-222.58-420.33-222.88z'
              color='#000000'
              colorRendering='auto'
              fill='#f00'
              imageRendering='auto'
              shapeRendering='auto'
              style={{ isolation: 'auto', mixBlendMode: 'normal' }}
            />
          </clipPath>
        </defs>
        <g transform='translate(-154.53 1060.1)'>
          <g clipPath='url(#a)'>
            <g transform='matrix(4.0693 -1.0904 1.0904 4.0693 -791.38 -796.41)'>
              <rect width='777' height='520' fill={fillInColors[0]} />
              <rect width='777' height='440' fill={fillInColors[1]} />
              <rect width='777' height='360' fill={fillInColors[2]} />
              <rect width='777' height='280' fill={fillInColors[3]} />
              <rect width='777' height='200' fill={fillInColors[4]} />
              <rect width='777' height='120' fill={fillInColors[5]} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Logo
