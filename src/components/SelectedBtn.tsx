
import CN from 'classnames';
import { useRecoilValue } from 'recoil';
import { markedList } from '../store/store';
import BaseIcon from '@/icons/BaseIcon';
import Link from 'next/link';
const SelectedBtn = () => {
  const itemList = useRecoilValue(markedList);
  const length = itemList.length;
  const max = 3;
  const markedIcons = () => {
    if(length > 0) {
      const many = length > 3 ? `+ ${length -3}`:'';
      const arrHtml = []
      for(let i=0; i < max ; i++){
        const logo = itemList[i] ? itemList[i].logo:'';
        arrHtml.push(
          <span className={CN({'dim':i===0 && many})} key={'marked'+i}>
            {logo && <span style={{backgroundImage:`url(/images/${logo})`}}>
              {i===0 && many &&<><i>{many}</i><BaseIcon/></>}
            </span>}
          </span>
        )
      }
      return arrHtml
    } else return<><span/><span/><span/></>
  }
  return (
    <Link href="/zzim/drawing">
      <button disabled={itemList.length < max}>
        <p>{markedIcons()}</p>
      </button>
    </Link>
  )
}

export default SelectedBtn