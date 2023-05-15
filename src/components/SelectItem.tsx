import { useState } from 'react';
import { useSetRecoilState } from 'recoil'
import { markedList } from '../store/store';
import styled from '@emotion/styled'
import useAnimation from '@/hooks/useAnimation';
import BaseIcon from '@/icons/BaseIcon';
import BookmarkIcon from '@/icons/BookmarkIcon';
const Marked = styled.p`
 ${props => !props.triggerAnimation &&
  'opacity: 0;'}
  transition: 800ms ease; 
`
const SelectItem = ({data})=>{
  const {id,name,code,logo,isBookmark} = data
  const [isMarked, setMarked] = useState(isBookmark);
  const [shouldRender, handleTransitionEnd, triggerAnimation] = useAnimation(isMarked);
  const setList = useSetRecoilState(markedList)
  const handleClick = ()=>{
    setMarked((prevState) => !prevState);
    setList(id)
  }
  return (
    <li className="icon_box">
      <button type="button" className="icon_btn" style={{backgroundImage:`url(/images/${logo})`}} onClick={handleClick}>
        {shouldRender && <Marked className='marked'
          onTransitionEnd={handleTransitionEnd}
          triggerAnimation={triggerAnimation}>
          <BaseIcon/>
          <BookmarkIcon/>
        </Marked>}
      </button>
      <p className="icon_title">{name}</p>
      <span className="icon_text">{code}</span>
    </li>
  )
}

export default SelectItem