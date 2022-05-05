const baseURL = 'https://iapshowroom.ece.uprm.edu';
const WebSocketURL = 'wss://iapshowroom.ece.uprm.edu/ws/'

const captchaKey = '6Lfnv_geAAAAABsSPS0UKVKIFkeZWly0yiA_-Wxi'

//Web Socket Server event variables
const ws_announcement = "announcement";
const ws_progressbar = "progressbar";
const ws_upcomingevents = "upcomingevents";
const ws_stageUpdate = "stageupdate";
const ws_getStageLive = "stagelive";
const ws_die = "die";


function safariPolyfill(date){
    let unformatted = date;
    let formatted;
    try{
        if(unformatted && unformatted.lastIndexOf(':') > 0){
            unformatted = unformatted.substring(0, unformatted.lastIndexOf(':'));
            formatted = unformatted.replaceAll("-", "/");
            return formatted;
        }
        else {
            return date;
        }
    }
    catch{
        console.log("polyfill was not completed");
        return date;
    }
}


module.exports = {
    baseURL: baseURL,
    WebSocketURL: WebSocketURL,
    ws_announcement: ws_announcement,
    ws_progressbar: ws_progressbar,
    ws_upcomingevents: ws_upcomingevents,
    ws_stageUpdate: ws_stageUpdate,
    ws_getStageLive: ws_getStageLive,
    safariPolyfill: safariPolyfill,
    ws_die: ws_die,
    captchaKey: captchaKey
}
