const baseURL = 'https://iapshowroom.ece.uprm.edu';
const WebSocketURL = 'wss://iapshowroom.ece.uprm.edu/ws/'

const captchaKey = '6LeZSrUfAAAAACW7B4vSpseKslUZ-FzbLGKZpBla'

//Web Socket Server event variables
const ws_announcement = "announcement";
const ws_progressbar = "progressbar";
const ws_upcomingevents = "upcomingevents";
const ws_stageUpdate = "stageupdate";
const ws_getStageLive = "stagelive";
const ws_die = "die";





module.exports = {
    baseURL: baseURL,
    WebSocketURL: WebSocketURL,
    ws_announcement: ws_announcement,
    ws_progressbar: ws_progressbar,
    ws_upcomingevents: ws_upcomingevents,
    ws_stageUpdate: ws_stageUpdate,
    ws_getStageLive: ws_getStageLive,
    ws_die: ws_die,
    captchaKey: captchaKey
}
