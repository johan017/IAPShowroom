const baseURL = 'https://iapshowroom.ece.uprm.edu';
const WebSocketURL = 'wss://iapshowroom.ece.uprm.edu/ws/'

//Web Socket Server event variables
const ws_announcement = "announcement";
const ws_progressbar = "progressbar";
const ws_upcomingevents = "upcomingevents";
const ws_die = "die";




module.exports = {
    baseURL: baseURL,
    WebSocketURL: WebSocketURL,
    ws_announcement: ws_announcement,
    ws_progressbar: ws_progressbar,
    ws_upcomingevents: ws_upcomingevents,
    ws_die: ws_die
}