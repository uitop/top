import { useState } from 'react';
import { useSetRecoilState } from 'recoil'
import { markedList,Tdata } from '../store/zzimStore';
import styled from '@emotion/styled'
import useAnimation from '@/hooks/useAnimation';
import BookmarkIcon from '@/icons/BookmarkIcon';
import { FC } from 'react';

const IconLi = styled.li`
  position: relative;
  width:100px;
  text-align: center;
  .icon_btn{
    width:100px;
    height:100px;
    border:0;
    margin-bottom:6px;
    background:no-repeat 0 0;
    background-size: 100px 100px;
    border-radius: 15px 30px;
  }
  .icon_title{
    font-size:18px;
    white-space: nowrap;
    line-height: 20px;
    &::before{
      content: "";
      margin-left: -100%;
    }
    &::after{
      content: "";
      margin-right: -100%;
    }
  }
  .icon_text{
    color: var(--gray);
    font-size:12px;
    line-height: 12px;
  }

`
const Marked = styled.p`
 ${(props:{triggerAni:boolean}) => !props.triggerAni &&
  'opacity: 0;'}
  transition: 800ms ease;
  background-color: var(--alpha);
  border-radius: 15px 30px;
  height:100%;
  .bookmarkIcon{
    position: absolute;
    top:22px;
    left:22px;
    width:56px;
    height:56px;
  }
    
`
const SelectItem:FC<Tdata> = (item)=>{
  const {id,name,code,path,isBookmark} = item
  const [isMarked, setMarked] = useState(isBookmark);
  const [shouldRender, handleTransitionEnd, triggerAnimation] = useAnimation(!!isMarked);
  const setList = useSetRecoilState(markedList)
  const handleClick = ()=>{
    setMarked((prevState) => !prevState);
    setList(id)
  }
  return (
    <IconLi>
      <button type="button" className="icon_btn" style={{backgroundImage:`url(/images/${path})`}} onClick={handleClick}>
        {shouldRender && <Marked
          onTransitionEnd={handleTransitionEnd}
          triggerAni={triggerAnimation}>
          <BookmarkIcon/>
        </Marked>}
      </button>
      <p className="icon_title">{name}</p>
      <span className="icon_text">{code}</span>
    </IconLi>
  )
}

export default SelectItem