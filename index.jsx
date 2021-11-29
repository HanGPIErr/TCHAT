// 1 : Global_Tchat id app
// 2 : Menu
// 3 : OnlineMembers
// 4 : EntreeTexte
// 5 : SortieTexte
// 6 : Footer
let ws = new WebSocket('ws://localhost:8124/')
ws.onopen = () => {
  console.log("connect ok");
}

ws.onerror = (err) => {
  console.log(err);
}
    

function Menu(props) {
    let con
    if(props.isconnected==false) {
        con=<React.Fragment><input type="text" id="name" name="name" value={props.login} onChange={props.changelogin}></input>
        <button className="login" type="button" onClick={props.chgConnexion}>Log in</button></React.Fragment>

        
        
    }
    else {
        con=<React.Fragment><p>{props.login}</p><button className="logout" type="button" onClick={props.chgConnexion}>Logout</button></React.Fragment>
    }
    return (
        <div className="menu">
            <div className="titre"><h1>MimiChat</h1></div>
            <div className="connexion">
            <label htmlFor="name"></label>
            {con}
            </div>
        </div>
    )
}
function OnlineMembers(props) {
    let afficheUser
    if(props.isconnected==false) {
        afficheUser=<React.Fragment></React.Fragment>
    }
    else {
        afficheUser=<React.Fragment>{props.tabuser.map((elem, key)=><div className="ligneuser" key={key}>{elem}</div>)}</React.Fragment>
    }
    return (
        <div className="onlinemembers">
            <h3>Qui est là ?</h3>
            <div className="users">{afficheUser}</div>
        </div>
    )
}
function SortieTexte(props) {
    let GrabTexte
    if(props.isconnected==false) {
        GrabTexte=<React.Fragment></React.Fragment>
    }
    else {
        GrabTexte=<React.Fragment>{props.tabmessage.map((elem, key)=><div className="lignetexte">{elem}</div>)}</React.Fragment>
    }
    return (
        <div className="sortietexte">{props.tabmessage.map((elem, key) => <TurfuTexte key={key} obj={elem} />)}</div>
    )
}
function TurfuTexte(props) {
    return(
        <div className="messageall">
            <div className="flexspace">
            <div className="colorusurname">{props.obj.user}</div>
            <div className="colordate">{props.obj.date.toLocaleTimeString()}</div>
            </div>
            <div className="colormessage">{props.obj.message}</div>
        </div>
    )
}
function EntreeTexte(props) {
    let affiche
    if(props.isconnected==false) {
        affiche=<React.Fragment></React.Fragment>
        
    }
    else {
        affiche=<React.Fragment><textarea id="tchater" value={props.texte} onChange={props.changetexte} name="tchater" rows="6" cols="150">Taper votre message pour commencer à discuter...</textarea>
        <button className="boutonenvoyer" onClick={props.envoiemessage}>ENVOYER</button></React.Fragment>
    }
    return (
        <div className="bloc1">
        <div className="entreetexte">
            {affiche}
        </div>
        </div>
    )
}
function Footer(props) {
    return (
        <div className="footer">
            <div className="copyright"><p>HanGPIErr 2021©</p></div>
            <div className="auteur"><p>HGP</p></div>
        </div>
    )
}
class Global_Tchat extends React.Component {
    constructor(props){
        super(props)
        this.state = {login:"HGP", connexion:false, texte:"", tabmessage:[], tabuser:[]}
    }
    chgLogin(event){
        this.setState({login:event.target.value})
       // console.log(this.filtre());
    }
    chgConnexion(event){
        this.setState({connexion: !this.state.connexion})
        if (this.state.connexion==false) {
            this.setState({tabuser: [...this.state.tabuser, this.state.login]})
        }
        else {
            this.setState({tabuser:[], tabmessage:[]})
        }
    }
    chgTexte(event){
        this.setState({texte: event.target.value})
    }
    envoiemessage(event){
        this.setState({tabmessage: [...this.state.tabmessage,{user:this.state.login, date:new Date(), message:this.state.texte}]})
        this.setState({texte: ""})
    }
    render() {
    return (
        <div className="container">
            <Menu login={this.state.login} changelogin={this.chgLogin.bind(this)} isconnected={this.state.connexion} chgConnexion={this.chgConnexion.bind(this)}/>
            <Milieudepage isconnected={this.state.connexion} texte={this.state.texte} changetexte={this.chgTexte.bind(this)} envoiemessage={this.envoiemessage.bind(this)} tabmessage={this.state.tabmessage} tabuser={this.state.tabuser}/>
            <Footer/>
        </div>
    )
}
}
function Milieudepage(props) {
    return (
        <div className="flexmilieudepage">
            <OnlineMembers tabuser={props.tabuser}/>
            <Entreesortie isconnected = {props.isconnected} texte={props.texte} changetexte={props.changetexte} envoiemessage={props.envoiemessage} tabmessage={props.tabmessage}/>
        </div>
    )
}
function Entreesortie(props) {

    return (
        
        <div className="entreesortie">
            <SortieTexte tabmessage={props.tabmessage} isconnected = {props.isconnected}/>
            <EntreeTexte isconnected = {props.isconnected} envoiemessage={props.envoiemessage} texte={props.texte} changetexte={props.changetexte} />
        </div>
    )
}

ReactDOM.render(<Global_Tchat />, document.getElementById("app"))