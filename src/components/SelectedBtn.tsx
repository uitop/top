
import CN from 'classnames';
import { useRecoilValue } from 'recoil';
import { markedList,Tdata } from '@/store/zzimStore';
import { useRouter } from 'next/router';
const SelectedBtn = () => {
  const itemList = useRecoilValue(markedList);
  const router = useRouter()
  const length = itemList.length;
  const max = 3;
  const markedIcons = () => {
    if(length > 0) {
      const many = length > 3 ? `+ ${length -3}`:'';
      const arrHtml = []
      for(let i=0; i < max ; i++){
        const {path} = itemList[i] ? itemList[i] as Tdata :{path:''}
        arrHtml.push(
          <span className={CN({'dim':i===0 && many})} key={'marked'+i}>
            {path && <img src={`/images/${path}`}/>}
            {i===0 && many &&<i>{many}</i>}
          </span>
        )
      }
      return arrHtml
    } else return<><span/><span/><span/></>
  }
  return (
    <button disabled={itemList.length < max} onClick={()=>router.push("/zzim/drawing")}>
      <p>{markedIcons()}</p>
    </button>
  )
}

export default SelectedBtn