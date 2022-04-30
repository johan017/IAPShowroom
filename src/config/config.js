const baseURL = 'http://localhost:8080';
const WebSocketURL = 'ws://localhost:8081'

//Web Socket Server event variables
const ws_announcement = "announcement";
const ws_progressbar = "progressbar";
const ws_upcomingevents = "upcomingevents";




module.exports = {
    baseURL: baseURL,
    WebSocketURL: WebSocketURL,
    ws_announcement: ws_announcement,
    ws_progressbar: ws_progressbar,
    ws_upcomingevents: ws_upcomingevents,
}