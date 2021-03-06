import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeDate = (result)=>({
    type:constants.CHANGE_HOME_DATA,
    slickList:result.slickList,
    articleList:result.articleList,
    recommendList:result.recommendList
})

const addHomeList = (list,nextPage)=>({
    type:constants.ADD_ARTICLE_LIST,
    list:fromJS(list),
    nextPage:nextPage


})

export const getHomeInfo = ()=>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const result = res.data.data;
            result.slickList.shift()
            result.articleList.map(j => {
              j.imgUrl = 'https://cubelet.cn/1556176941309.jpeg'
              return j
            });
            console.log(result)
            const action = changeHomeDate(result);
            dispatch(action);


        })
    }
}
export const getMoreList = (page)=>{
    return (dispatch)=>{
        axios.get(`/api/homeList.json?page=${page}`).then((res)=>{
            const result = res.data.data;

            dispatch(addHomeList(result,page+1))



        })
    }
}
export const toggleTopShow = (show)=>({
    type:constants.TOGGLE_SCROLL_TOP,
    show:show

})
