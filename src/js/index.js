import "../styles/styles.css";
import "./DOM.js";
import "./API.js";
import "../icons";

function importAll(r){
    r.keys().forEach(r)
}
const images = importAll(require.context("../icons", false, /\.(png|jpe?g|svg)$/));