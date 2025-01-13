import { MdKeyboardArrowRight } from 'react-icons/md'

export default function SampleNextArrow(props: any) {
 const { className, style, onClick, show } = props
 return (
  <MdKeyboardArrowRight
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
