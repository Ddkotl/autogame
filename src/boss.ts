import {ByeGrene} from './modules/bye_grene'
import {atackZombie} from './modules/atack_zombie'
async function Boss(){
    const session_id = "e19d2cf65a7d011b788b70301d6179930916e9a3aa50c8e63af8ba1a8150bb7d"
    await ByeGrene(session_id)
    await atackZombie(session_id)
}

(async()=>{
    await Boss()
})()