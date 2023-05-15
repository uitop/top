import { atom, selector } from "recoil"

const itemDatas = atom({
  key: 'itemDatas',
  default: [{
    id:'001',
    name:'버크셔 헤서웨이',
    code:'BRK/B',
    logo:'item001.png',
    isBookmark:false,
  },{
    id:'002',
    name:'세일즈포스',
    code:'CRM',
    logo:'item002.png',
    isBookmark:false,
  },{
    id:'003',
    name:'에스티 로더',
    code:'EL',
    logo:'item003.png',
    isBookmark:false,
  },{
    id:'004',
    name:'골드만삭스',
    code:'GS',
    logo:'item004.png',
    isBookmark:false,
  },{
    id:'005',
    name:'홈디포',
    code:'HD',
    logo:'item005.png',
    isBookmark:false,
  },{
    id:'006',
    name:'제이피모간체이스',
    code:'JPM',
    logo:'item006.png',
    isBookmark:false,
  },{
    id:'007',
    name:'오라클',
    code:'ORCL',
    logo:'item007.png',
    isBookmark:false,
  },{
    id:'008',
    name:'화이자',
    code:'PFE',
    logo:'item008.png',
    isBookmark:false,
  },{
    id:'009',
    name:'AT&T',
    code:'T',
    logo:'item009.png',
    isBookmark:false,
  },{
    id:'010',
    name:'UPS',
    code:'UPS',
    logo:'item010.png',
    isBookmark:false,
  },{
    id:'011',
    name:'월마트',
    code:'WMT',
    logo:'item011.png',
    isBookmark:false,
  },{
    id:'012',
    name:'AMD',
    code:'AMD',
    logo:'item012.png',
    isBookmark:false,
  },{
    id:'013',
    name:'ASML',
    code:'ASML',
    logo:'item013.png',
    isBookmark:false,
  },{
    id:'014',
    name:'모더나',
    code:'MRNA',
    logo:'item014.png',
    isBookmark:false,
  },{
    id:'015',
    name:'엔비디아',
    code:'NVDA',
    logo:'item015.png',
    isBookmark:false,
  },],
});
const itemOrder = atom({
  key:'itemOrder',
  default:0,
})
export const itemList = selector({
  key:'itemList',
  get:({get}) => {
    return get(itemDatas)
  }
})

export const markedList = selector({
  key:'markedList',
  get:({get}) => {
    const list = get(itemDatas).filter((item) => item.isBookmark).sort((a,b) => a.order - b.order);
    return list? list:[]
  },
  set: ({ set,get }, setId) => {
    const newList = get(itemDatas).map((item) => {
      if (item.id === setId) {
        if(item.isBookmark) return { ...item, isBookmark: false,order:0 };
        else {
          const order = get(itemOrder) + 1;
          set(itemOrder,order);
          return { ...item, isBookmark: true,order:order };
        }
      }
      else return item;
    });
    set(itemDatas, newList);
  }
})