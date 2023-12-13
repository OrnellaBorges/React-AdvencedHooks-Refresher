import React from "react";
import { useState, useEffect } from "react"; // permet de manipuler de variables =>

/* useEffect : permet de déclancher ou executer certaines actions
soit lors du rendu du composant ou quand 
on le souhaite a chaque fois que qqch se produit 
c'est un effete de bord */
const Test = () => {
    const [number, setNumber] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // fonction qui est excuté via le onClick sur le bouton pour maj le nombre
    function increment() {
        setNumber(number + 1);
    }
    function decrement() {
        setNumber(number - 1);
    }
    function decrement() {
        setNumber(0);
    }
    function switchText() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        console.log("le useEffect est déclanché");
    }, []);
    // [] tableau de dependance en gros si ya rien le useEffect est executer lors du rendu

    useEffect(() => {
        console.log("useEffect executé lors du changement du state number");
    }, [number]);

    // [number] lorsqu'il est rempli le useEffect est executé et depend du state number

    useEffect(() => {
        // fonction de retour facultative s'execute lors du démontage du composant
        // permet de faire du NETOYAGE, eviter le fuites de memoir et les comportements indérisables
        // suppression de données temporaires comme lorsque je change de page
        return () => {
            console.log("le composant est démonté");
        };
    }, []);

    return (
        <>
            <h3> Number : {number}</h3>

            <p>Hooks : useState / useEffect</p>

            {isActive ? <p>On</p> : <p>Off</p>}

            {/* la fonction est passé en callback au onClick 
            permet de garder une reference et d'appeler la fonction uniquement à l'evenement au click sur le bouton */}
            <button onClick={() => increment()}>Increment</button>

            {/* Attention : si je passe directement la fonction avec les parenthèse 
            ça va executé la fontion lors du rendu du composant
            et possible d'avoir une boucle infinie, peutbentrainer des comportements inatendu et appeler des fonctions non désirées*/}
            {/* <button onClick={increment()}>Bouton</button> */}

            <button onClick={() => decrement()}>Decrement</button>

            <button onClick={() => decrement()}>Reset</button>

            <button disabled>Desabled button</button>

            <button onClick={() => switchText()}>Switch text</button>
        </>
    );
};

export default Test;
