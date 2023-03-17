import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

interface ConfirmProps{
    title:string,
    message:string,
    okText:string,
    cancelText?:string,
  }

class NAlert{

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
const loadingAdapter = new NLoading()

export {
    confirmAdapter,
    loadingAdapter
}