import { MdKeyboardArrowLeft } from 'react-icons/md'

export default function SamplePrevArrow(props: any) {
 const { className, style, onClick, show } = props
 return (
  <MdKeyboardArrowLeft
   className={className}
   onClick={onClick}
   style={{
    ...style,
    height: '55px',
    width: '55px',
    display: 'block',
    background: 'white',
    color: 'blue',
   }}
  />
 )
}
