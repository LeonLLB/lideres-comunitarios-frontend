import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

interface ConfirmProps{
    title:string,
    message:string,
    okText:string,
    cancelText?:string,
  }

class NNotify{

  error(message:string){
    Notify.failure(message)
  }

  success(message:string){
    Notify.success(message)
  }

  constructor(){
    Notify.init({
      position:'center-top',
      fontSize:'16px',
      width:'20rem',
        failure:{
          background:'#ffffff',
          textColor:'#ff5549',
          notiflixIconColor:'#ff5549',
        },
        success:{
          background:'#ffffff',
          textColor:'#32c682',
          notiflixIconColor:'#32c682',
        }
    })
  }
}

class NConfirm{

    private defaultOptions = {
        width:'30rem',
        messageMaxLength:999,
        okButtonColor:"#fff",
      }

    async Warning({title,message,okText,cancelText="Cancelar"}:ConfirmProps){
        return new Promise((res)=>{
            Confirm.show(title,message,okText,cancelText,()=>res(true),()=>res(false),{      
              ...this.defaultOptions,
              titleColor:'#eebf31',
              okButtonBackground:'#eebf31',      
              backOverlayColor:'rgba(238,191,49,0.2)'
            })
          })
    }

}

class NLoading {

  display(message:string){
    Loading.circle(message,{
      svgColor:"#d1040e",
      messageColor:"#d1040e"
    })
  }

  hide(){
    Loading.remove()
  }

}

const confirmAdapter =  new NConfirm()
const notifyAdapter =  new NNotify()
const loadingAdapter = new NLoading()

export {
    confirmAdapter,
    loadingAdapter,
    notifyAdapter
}