import { atom, selector } from "recoil"
export type Tdata = {
  id:string,
  name:string,
  code:string,
  path:string,
  isBookmark?:boolean,
  order?:number
}
export type Tmain= {
  id: number,
  type: 'ShowCase'|'About'|'RecentWork',
  path?: string,
  name: string,
  text: string,
  link?: string,
}
let itemOrder = 0
const itemDatas = atom<Tdata[]>({
  key: 'itemDatas',
  default: [{
    id:'001',
    name:'알파카',
    code:'APK',
    path:'item001.jpeg',
    isBookmark:false,
  },{
    id:'002',
    name:'곰',
    code:'BEAR',
    path:'item002.jpg',
    isBookmark:false,
  },{
    id:'003',
    name:'소',
    code:'COW',
    path:'item003.jpg',
    isBookmark:false,
  },{
    id:'004',
    name:'티라노사우르스',
    code:'TRNS',
    path:'item004.jpg',
    isBookmark:false,
  },{
    id:'005',
    name:'독수리',
    code:'EGL',
    path:'item005.jpg',
    isBookmark:false,
  },{
    id:'006',
    name:'기린',
    code:'GRF',
    path:'item006.jpg',
    isBookmark:false,
  },{
    id:'007',
    name:'기니피그',
    code:'GPIG',
    path:'item007.jpg',
    isBookmark:false,
  },{
    id:'008',
    name:'이구아나',
    code:'IGAN',
    path:'item008.jpg',
    isBookmark:false,
  },{
    id:'009',
    name:'고양이',
    code:'CAT',
    path:'item009.jpg',
    isBookmark:false,
  },{
    id:'010',
    name:'양',
    code:'SHP',
    path:'item010.jpg',
    isBookmark:false,
  },{
    id:'011',
    name:'사자',
    code:'LION',
    path:'item011.jpg',
    isBookmark:false,
  },{
    id:'012',
    name:'원숭이',
    code:'MNK',
    path:'item012.jpg',
    isBookmark:false,
  },{
    id:'013',
    name:'돼지',
    code:'PIG',
    path:'item013.jpg',
    isBookmark:false,
  },{
    id:'014',
    name:'개',
    code:'DOG',
    path:'item014.jpg',
    isBookmark:false,
  },{
    id:'015',
    name:'토끼',
    code:'RBT',
    path:'item015.jpg',
    isBookmark:false,
  },{
    id:'016',
    name:'너구리',
    code:'NGR',
    path:'item016.jpg',
    isBookmark:false,
  },{
    id:'017',
    name:'호랑이',
    code:'TGR',
    path:'item017.jpg',
    isBookmark:false,
  },{
    id:'018',
    name:'말',
    code:'HRS',
    path:'item018.jpg',
    isBookmark:false,
  },{
    id:'019',
    name:'악어',
    code:'CRD',
    path:'item019.jpg',
    isBookmark:false,
  },{
    id:'020',
    name:'쿼카',
    code:'QKK',
    path:'item020.jpg',
    isBookmark:false,
  },{
    id:'021',
    name:'고래',
    code:'WHL',
    path:'item021.jpg',
    isBookmark:false,
  },],
});


export const itemList = selector({
  key:'itemList',
  get:({get}) => {
    return get(itemDatas)
  }
})

export const markedList = selector<Tdata[]|string>({
  key:'markedList',
  get:({get}) => {
    const list = get(itemDatas).filter((item) => item.isBookmark).sort((a,b) => (a.order??0) - (b.order??0));
    return list? list:[]
  },
  set:({ set,get }, data)=> {
    const newList = get(itemDatas).map((item) => {
      if (item.id === data) {
        if(item.isBookmark) return { ...item, isBookmark: false,order:0 };
        else {
          itemOrder++
          const order = itemOrder;
          return { ...item, isBookmark: true,order:order };
        }
      }
      else return item;
    });
    set(itemDatas, newList);
  }
})